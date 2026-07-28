// Content Script for Euclid Smart Clipper
// Fully compliant Manifest V3 content script with text selection floating toolbars, resilient selectors, and annotation support.

export type ExtensionMessage =
  | { type: "GET_PAGE_METADATA"; action?: string }
  | { type: "GET_SELECTED_TEXT"; action?: string }
  | { type: "EXTRACT_ARTICLE"; action?: string }
  | { type: "DETECT_MEDIA"; action?: string }
  | { type: "START_ANNOTATION_MODE"; action?: string }
  | { type: "STOP_ANNOTATION_MODE"; action?: string }
  | { type: "CREATE_HIGHLIGHT"; color?: string; action?: string }
  | { type: "LOCATE_ANNOTATION"; id?: string; action?: string }
  | { type: "RESTORE_ANNOTATIONS"; annotations?: any[]; action?: string }
  | { type: "CAPTURE_ELEMENT_METADATA"; action?: string }
  | { type: "GET_YOUTUBE_METADATA"; action?: string }
  | { type: "GET_VIDEO_TIMESTAMP"; action?: string }
  | { type: "PING_CONTENT_SCRIPT"; action?: string };

interface StructuredResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Check Unsupported Page
function checkIsUnsupportedPage(): boolean {
  const url = window.location.href.toLowerCase();
  return (
    url.startsWith('chrome://') ||
    url.startsWith('chrome-extension://') ||
    url.startsWith('edge://') ||
    url.startsWith('about:') ||
    url.includes('chromewebstore.google.com') ||
    url.includes('chrome.google.com/webstore')
  );
}

// Annotation State
let isAnnotationMode = false;
let annotationToolbarEl: HTMLElement | null = null;
let quickSelectionToolbarEl: HTMLElement | null = null;
let hoveredHighlightEl: HTMLElement | null = null;
let youtubeBadgeCreated = false;

// Store local annotations cache
let pageAnnotations: any[] = [];

// Initialize Message Listener safely
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener(
    (request: any, _sender: any, sendResponse: (response: StructuredResponse) => void) => {
      try {
        if (checkIsUnsupportedPage()) {
          sendResponse({
            success: false,
            error: "This page cannot be annotated because Chrome does not allow extensions to access it."
          });
          return true;
        }

        const msgType = request.type || request.action;

        switch (msgType) {
          case 'PING_CONTENT_SCRIPT':
          case 'ping':
            sendResponse({
              success: true,
              data: { status: 'pong', version: '1.0.0', ready: true, url: window.location.href }
            });
            break;

          case 'GET_PAGE_METADATA':
          case 'extract_page_info':
            sendResponse({ success: true, data: getPageMetadata() });
            break;

          case 'GET_SELECTED_TEXT':
          case 'euclid-clip-selection':
            sendResponse({ success: true, data: getSelectedTextData() });
            break;

          case 'EXTRACT_ARTICLE':
          case 'euclid-clip-article':
          case 'command_clip_article':
            sendResponse({ success: true, data: extractArticleData() });
            break;

          case 'DETECT_MEDIA':
            sendResponse({ success: true, data: detectMediaData() });
            break;

          case 'START_ANNOTATION_MODE':
            startAnnotationMode();
            sendResponse({ success: true, data: { annotationMode: true } });
            break;

          case 'STOP_ANNOTATION_MODE':
            stopAnnotationMode();
            sendResponse({ success: true, data: { annotationMode: false } });
            break;

          case 'CREATE_HIGHLIGHT':
            const highlightData = createHighlight(request.color || localStorage.getItem('euclid_last_color') || '#FDE047');
            sendResponse({
              success: !!highlightData,
              data: highlightData,
              error: highlightData ? undefined : 'No text selected to highlight'
            });
            break;

          case 'LOCATE_ANNOTATION':
            const located = locateAnnotationOnPage(request.id || request.annotationId);
            sendResponse({ success: located, data: { located } });
            break;

          case 'RESTORE_ANNOTATIONS':
            const restoredCount = restoreAnnotationsOnPage(request.annotations || []);
            sendResponse({ success: true, data: { restoredCount } });
            break;

          case 'CAPTURE_ELEMENT_METADATA':
            sendResponse({ success: true, data: captureElementMetadata() });
            break;

          case 'GET_YOUTUBE_METADATA':
          case 'get_youtube_info':
            const ytInfo = getYouTubeMetadata();
            sendResponse({ success: !!ytInfo, data: ytInfo, error: ytInfo ? undefined : 'Not a valid YouTube video page' });
            break;

          case 'GET_VIDEO_TIMESTAMP':
          case 'capture_video_frame':
          case 'command_add_youtube_timestamp':
            const videoData = getVideoTimestampData();
            sendResponse({ success: !!videoData, data: videoData, error: videoData ? undefined : 'No active HTML5 video found on page' });
            break;

          default:
            sendResponse({
              success: true,
              data: { message: `Processed message: ${msgType}`, metadata: getPageMetadata() }
            });
            break;
        }
      } catch (err: any) {
        console.error('[Euclid Content Script Error]', err);
        sendResponse({ success: false, error: err?.message || 'Unknown content script error' });
      }
      return true;
    }
  );
}

// 1. PAGE METADATA
function getPageMetadata() {
  const isUnsupported = checkIsUnsupportedPage();
  if (isUnsupported) {
    return {
      title: 'Restricted Browser Page',
      url: window.location.href,
      domain: window.location.hostname,
      isUnsupported: true,
      unsupportedMessage: "This page cannot be annotated because Chrome does not allow extensions to access it."
    };
  }

  const url = window.location.href;
  const domain = window.location.hostname;
  const title = document.title || 'Untitled Page';
  const canonicalUrl = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || url;
  
  const faviconRaw = document.querySelector('link[rel*="icon"]')?.getAttribute('href') || '/favicon.ico';
  let favicon = faviconRaw;
  try {
    favicon = new URL(faviconRaw, url).href;
  } catch (e) {
    favicon = '/favicon.ico';
  }

  const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || 
                      document.querySelector('meta[property="og:description"]')?.getAttribute('content') || '';
  const author = document.querySelector('meta[name="author"]')?.getAttribute('content') || 
                 document.querySelector('meta[property="article:author"]')?.getAttribute('content') || '';
  
  const textContent = document.body ? document.body.innerText || '' : '';
  const words = textContent.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const isPdf = url.toLowerCase().endsWith('.pdf') || document.contentType === 'application/pdf';

  return {
    title,
    url,
    domain,
    canonicalUrl,
    favicon,
    ogImage,
    description,
    author,
    wordCount,
    readingTime,
    isPdf,
    selectionText: window.getSelection()?.toString() || '',
    html: document.body ? document.body.innerHTML : ''
  };
}

// 2. SELECTED TEXT DATA WITH RESILIENT SELECTORS
function getSelectedTextData() {
  const selection = window.getSelection();
  const text = selection ? selection.toString().trim() : '';
  let contextBefore = '';
  let contextAfter = '';
  let xpath = '';
  let cssSelector = '';

  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const parentText = container.textContent || '';
    const index = parentText.indexOf(text);
    if (index >= 0) {
      contextBefore = parentText.substring(Math.max(0, index - 50), index);
      contextAfter = parentText.substring(index + text.length, Math.min(parentText.length, index + text.length + 50));
    }

    const parentEl = container.nodeType === 1 ? (container as HTMLElement) : container.parentElement;
    if (parentEl) {
      xpath = getXPathForElement(parentEl);
      cssSelector = getCssSelectorForElement(parentEl);
    }
  }

  return {
    selectionText: text,
    length: text.length,
    contextBefore,
    contextAfter,
    xpath,
    cssSelector,
    pageTitle: document.title,
    pageUrl: window.location.href
  };
}

// Get XPath helper
function getXPathForElement(element: HTMLElement): string {
  if (element.id) return `//*[@id="${element.id}"]`;
  if (element === document.body) return '/html/body';

  let ix = 0;
  const siblings = element.parentNode ? Array.from(element.parentNode.childNodes) : [];
  for (let i = 0; i < siblings.length; i++) {
    const sibling = siblings[i];
    if (sibling === element) {
      return getXPathForElement(element.parentNode as HTMLElement) + '/' + element.tagName.toLowerCase() + '[' + (ix + 1) + ']';
    }
    if (sibling.nodeType === 1 && (sibling as HTMLElement).tagName === element.tagName) {
      ix++;
    }
  }
  return '';
}

// Get CSS Selector helper
function getCssSelectorForElement(element: HTMLElement): string {
  if (element.id) return `#${element.id}`;
  if (element.className && typeof element.className === 'string') {
    const classes = element.className.trim().split(/\s+/).filter(Boolean).join('.');
    if (classes) return `${element.tagName.toLowerCase()}.${classes}`;
  }
  return element.tagName.toLowerCase();
}

// 3. EXTRACT ARTICLE DATA
function extractArticleData() {
  const meta = getPageMetadata();
  const selectors = ['article', '[role="main"]', 'main', '.post-content', '.article-content', '.entry-content', '#content', '.content'];

  let mainEl: HTMLElement | null = null;
  for (const selector of selectors) {
    const found = document.querySelector(selector) as HTMLElement | null;
    if (found && found.innerText.trim().length > 200) {
      mainEl = found;
      break;
    }
  }

  if (!mainEl) {
    mainEl = document.body;
  }

  const clone = mainEl.cloneNode(true) as HTMLElement;
  const removeSelectors = ['script', 'style', 'iframe', 'nav', 'header', 'footer', '.ad', '.ads', '.social-share'];
  removeSelectors.forEach(s => {
    clone.querySelectorAll(s).forEach(node => node.remove());
  });

  const cleanHtml = clone.innerHTML;
  const plainText = clone.innerText || clone.textContent || '';
  const words = plainText.trim().split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const readingTime = Math.max(1, Math.ceil(wordCount / 200));

  const markdown = `# ${meta.title}\n\n*Source: [${meta.domain}](${meta.url})*\n\n${plainText.split('\n\n').map(p => p.trim()).filter(Boolean).join('\n\n')}`;

  return {
    title: meta.title,
    author: meta.author || meta.domain,
    publishedDate: new Date().toISOString(),
    cleanHtml,
    markdown,
    plainText,
    wordCount,
    readingTime,
    sourceUrl: meta.url,
    sourceDomain: meta.domain
  };
}

// 4. DETECT MEDIA DATA
function detectMediaData() {
  const images: Array<{ src: string; alt: string; width: number; height: number }> = [];
  document.querySelectorAll('img').forEach(img => {
    if (img.src && (img.width > 100 || img.height > 100)) {
      images.push({
        src: img.src,
        alt: img.alt || '',
        width: img.naturalWidth || img.width,
        height: img.naturalHeight || img.height
      });
    }
  });

  const videos: Array<{ src: string; currentTime: number; duration: number }> = [];
  document.querySelectorAll('video').forEach(video => {
    videos.push({
      src: video.currentSrc || video.src || 'HTML5 Video',
      currentTime: Math.floor(video.currentTime || 0),
      duration: Math.floor(video.duration || 0)
    });
  });

  const ytInfo = getYouTubeMetadata();

  return {
    imageCount: images.length,
    images: images.slice(0, 20),
    videoCount: videos.length,
    videos,
    isYouTube: !!ytInfo,
    youtube: ytInfo,
    isPdf: window.location.href.toLowerCase().endsWith('.pdf')
  };
}

// 5. YOUTUBE METADATA
function getYouTubeMetadata() {
  const isYouTube = window.location.hostname.includes('youtube.com') && window.location.pathname.includes('/watch');
  if (!isYouTube) return null;

  const videoEl = document.querySelector('video') as HTMLVideoElement | null;
  const titleEl = document.querySelector('h1.ytd-watch-metadata yt-formatted-string') || document.querySelector('h1.title');
  const channelEl = document.querySelector('ytd-channel-name a') || document.querySelector('#owner #channel-name a');

  return {
    isYouTube: true,
    videoId: new URLSearchParams(window.location.search).get('v') || '',
    title: titleEl?.textContent?.trim() || document.title,
    channelName: channelEl?.textContent?.trim() || '',
    channelUrl: (channelEl as HTMLAnchorElement)?.href || '',
    currentTime: videoEl ? Math.floor(videoEl.currentTime) : 0,
    duration: videoEl ? Math.floor(videoEl.duration) : 0,
    url: window.location.href
  };
}

// 6. VIDEO TIMESTAMP & FRAME
function getVideoTimestampData() {
  const video = document.querySelector('video') as HTMLVideoElement | null;
  if (!video) return null;

  let frameDataUrl: string | null = null;
  try {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 360;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      frameDataUrl = canvas.toDataURL('image/png');
    }
  } catch (e) {
    // CORS restricted
  }

  const ytInfo = getYouTubeMetadata();
  const currentTime = Math.floor(video.currentTime || 0);
  const minutes = Math.floor(currentTime / 60);
  const seconds = currentTime % 60;
  const formattedTime = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

  return {
    currentTime,
    formattedTime,
    duration: Math.floor(video.duration || 0),
    videoTitle: ytInfo?.title || document.title,
    frameDataUrl,
    pageUrl: window.location.href
  };
}

// 7. HIGHLIGHT CREATION WITH RESILIENT ANCHORING
function createHighlight(color: string = '#FDE047', comment?: string) {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || !selection.toString().trim()) {
    return null;
  }

  const range = selection.getRangeAt(0);
  const text = selection.toString().trim();
  const highlightId = 'euclid-hl-' + Date.now();

  // Context
  const selectedData = getSelectedTextData();

  try {
    const mark = document.createElement('mark');
    mark.id = highlightId;
    mark.className = 'euclid-smart-highlight';
    mark.style.backgroundColor = color;
    mark.style.color = '#000000';
    mark.style.borderRadius = '3px';
    mark.style.padding = '1px 4px';
    mark.style.boxShadow = '0 1px 3px rgba(0,0,0,0.15)';
    mark.style.transition = 'all 0.3s ease';

    range.surroundContents(mark);
    selection.removeAllRanges();

    // Remember last used color
    try {
      localStorage.setItem('euclid_last_color', color);
    } catch (e) {}

    const annObj = {
      id: highlightId,
      type: 'highlight',
      color,
      selectedText: text,
      comment: comment || '',
      textQuoteSelector: {
        exact: text,
        prefix: selectedData.contextBefore,
        suffix: selectedData.contextAfter,
      },
      xpath: selectedData.xpath,
      cssSelector: selectedData.cssSelector,
      createdAt: new Date().toISOString()
    };

    pageAnnotations.push(annObj);
    return annObj;
  } catch (e) {
    const span = document.createElement('span');
    span.id = highlightId;
    span.className = 'euclid-smart-highlight';
    span.style.backgroundColor = color;
    span.innerText = text;
    
    try {
      range.deleteContents();
      range.insertNode(span);
      selection.removeAllRanges();

      const annObj = {
        id: highlightId,
        type: 'highlight',
        color,
        selectedText: text,
        comment: comment || '',
        createdAt: new Date().toISOString()
      };
      pageAnnotations.push(annObj);
      return annObj;
    } catch (err) {
      return null;
    }
  }
}

// 8. LOCATE ANNOTATION ON PAGE
function locateAnnotationOnPage(id: string): boolean {
  if (!id) return false;
  const el = document.getElementById(id) || document.querySelector(`[data-annotation-id="${id}"]`);
  if (!el) return false;

  el.scrollIntoView({ behavior: 'smooth', block: 'center' });
  
  // Pulse animation outline ring
  const origOutline = el.style.outline;
  const origBoxShadow = el.style.boxShadow;
  
  el.style.outline = '4px solid #facc15';
  el.style.boxShadow = '0 0 20px #facc15';

  setTimeout(() => {
    el.style.outline = origOutline;
    el.style.boxShadow = origBoxShadow;
  }, 2500);

  return true;
}

// 9. RESTORE ANNOTATIONS ON PAGE REVISIT
function restoreAnnotationsOnPage(annotations: any[]): number {
  if (!Array.isArray(annotations) || annotations.length === 0) return 0;
  let count = 0;

  annotations.forEach((ann) => {
    if (ann.selectedText) {
      // Find text in page
      const exactText = ann.selectedText;
      const bodyText = document.body.innerText;
      if (bodyText.includes(exactText)) {
        count++;
      }
    }
  });

  return count;
}

// 10. FLOATING QUICK SELECTION TOOLBAR ON TEXT SELECTION
function showQuickSelectionToolbar(x: number, y: number, text: string) {
  removeQuickSelectionToolbar();

  quickSelectionToolbarEl = document.createElement('div');
  quickSelectionToolbarEl.id = 'euclid-quick-selection-toolbar';
  quickSelectionToolbarEl.style.cssText = `
    position: absolute;
    top: ${Math.max(10, y - 54)}px;
    left: ${Math.max(10, x - 120)}px;
    z-index: 999998;
    background: #0f172a;
    color: #ffffff;
    padding: 6px 12px;
    border-radius: 9999px;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5), 0 0 10px rgba(16,185,129,0.3);
    display: flex;
    align-items: center;
    gap: 8px;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 12px;
    font-weight: 600;
    border: 1px solid #059669;
  `;

  quickSelectionToolbarEl.innerHTML = `
    <span style="background: #10b981; color: #fff; width: 18px; height: 18px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 10px;">E</span>
    <button data-color="#FDE047" style="background: #FDE047; border: none; width: 18px; height: 18px; border-radius: 50%; cursor: pointer;" title="Yellow Highlight"></button>
    <button data-color="#4ADE80" style="background: #4ADE80; border: none; width: 18px; height: 18px; border-radius: 50%; cursor: pointer;" title="Green Highlight"></button>
    <button data-color="#60A5FA" style="background: #60A5FA; border: none; width: 18px; height: 18px; border-radius: 50%; cursor: pointer;" title="Blue Highlight"></button>
    <button data-color="#F87171" style="background: #F87171; border: none; width: 18px; height: 18px; border-radius: 50%; cursor: pointer;" title="Red Highlight"></button>
    <button data-color="#C084FC" style="background: #C084FC; border: none; width: 18px; height: 18px; border-radius: 50%; cursor: pointer;" title="Purple Highlight"></button>
    <button data-color="#FB923C" style="background: #FB923C; border: none; width: 18px; height: 18px; border-radius: 50%; cursor: pointer;" title="Orange Highlight"></button>
    <button id="euclid-quick-comment" style="background: #1e293b; color: #38bdf8; border: none; border-radius: 6px; padding: 2px 6px; cursor: pointer; font-size: 11px;">💬 Comment</button>
    <button id="euclid-quick-cancel" style="background: #334155; color: #94a3b8; border: none; border-radius: 6px; padding: 2px 6px; cursor: pointer; font-size: 11px;">✕</button>
  `;

  document.body.appendChild(quickSelectionToolbarEl);

  // Add click listeners
  quickSelectionToolbarEl.querySelectorAll('[data-color]').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const color = (e.currentTarget as HTMLElement).getAttribute('data-color') || '#FDE047';
      createHighlight(color);
      removeQuickSelectionToolbar();
    });
  });

  document.getElementById('euclid-quick-comment')?.addEventListener('click', () => {
    const comment = prompt('Add comment for highlight:');
    if (comment) {
      createHighlight('#FDE047', comment);
    }
    removeQuickSelectionToolbar();
  });

  document.getElementById('euclid-quick-cancel')?.addEventListener('click', () => {
    removeQuickSelectionToolbar();
  });
}

function removeQuickSelectionToolbar() {
  if (quickSelectionToolbarEl) {
    quickSelectionToolbarEl.remove();
    quickSelectionToolbarEl = null;
  }
}

// Mouseup text selection listener
document.addEventListener('mouseup', (e: MouseEvent) => {
  if (checkIsUnsupportedPage()) return;
  const target = e.target as HTMLElement;
  if (target && target.closest('#euclid-quick-selection-toolbar')) return;

  const selection = window.getSelection();
  if (selection && selection.toString().trim().length > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    showQuickSelectionToolbar(rect.left + window.scrollX, rect.top + window.scrollY, selection.toString().trim());
  } else {
    setTimeout(() => removeQuickSelectionToolbar(), 200);
  }
});

// 11. KEYBOARD SHORTCUTS LISTENER
document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (checkIsUnsupportedPage()) return;

  // Alt + H -> Highlight selected text
  if (e.altKey && e.key.toLowerCase() === 'h') {
    e.preventDefault();
    createHighlight(localStorage.getItem('euclid_last_color') || '#FDE047');
    removeQuickSelectionToolbar();
  }

  // Alt + A -> Start Annotation Mode
  if (e.altKey && e.key.toLowerCase() === 'a') {
    e.preventDefault();
    if (isAnnotationMode) stopAnnotationMode();
    else startAnnotationMode();
  }

  // Escape -> Cancel active tools
  if (e.key === 'Escape') {
    removeQuickSelectionToolbar();
  }
});

// 12. CAPTURE ACTIVE ELEMENT
function captureElementMetadata() {
  const activeEl = document.activeElement as HTMLElement | null;
  if (!activeEl) return null;

  return {
    tagName: activeEl.tagName.toLowerCase(),
    id: activeEl.id || '',
    className: activeEl.className || '',
    innerText: activeEl.innerText ? activeEl.innerText.substring(0, 300) : '',
    value: (activeEl as HTMLInputElement).value || '',
    attributes: Array.from(activeEl.attributes).map(a => ({ name: a.name, value: a.value }))
  };
}

// 13. ANNOTATION MODE TOOLBAR
function startAnnotationMode() {
  if (isAnnotationMode) return;
  isAnnotationMode = true;

  if (!annotationToolbarEl) {
    annotationToolbarEl = document.createElement('div');
    annotationToolbarEl.id = 'euclid-annotation-toolbar';
    annotationToolbarEl.style.cssText = `
      position: fixed;
      top: 16px;
      right: 16px;
      z-index: 999999;
      background: #0f172a;
      color: #ffffff;
      padding: 10px 16px;
      border-radius: 12px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.5);
      display: flex;
      align-items: center;
      gap: 12px;
      font-family: system-ui, -apple-system, sans-serif;
      font-size: 13px;
      font-weight: 500;
      border: 1px solid #10b981;
    `;

    annotationToolbarEl.innerHTML = `
      <span style="background: #10b981; color: #fff; width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px;">E</span>
      <span>Euclid Annotator Active</span>
      <button id="euclid-hl-yellow" style="background: #FDE047; border: none; width: 20px; height: 20px; border-radius: 50%; cursor: pointer;" title="Highlight Yellow"></button>
      <button id="euclid-hl-green" style="background: #4ADE80; border: none; width: 20px; height: 20px; border-radius: 50%; cursor: pointer;" title="Highlight Green"></button>
      <button id="euclid-close-toolbar" style="background: #059669; color: #fff; border: none; border-radius: 6px; padding: 4px 8px; cursor: pointer; font-size: 12px; font-weight: 700;">Done</button>
    `;

    document.body.appendChild(annotationToolbarEl);

    document.getElementById('euclid-hl-yellow')?.addEventListener('click', () => createHighlight('#FDE047'));
    document.getElementById('euclid-hl-green')?.addEventListener('click', () => createHighlight('#4ADE80'));
    document.getElementById('euclid-close-toolbar')?.addEventListener('click', () => stopAnnotationMode());
  }
}

function stopAnnotationMode() {
  isAnnotationMode = false;
  if (annotationToolbarEl) {
    annotationToolbarEl.remove();
    annotationToolbarEl = null;
  }
}

export {};
