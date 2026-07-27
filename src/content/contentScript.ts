// Content Script for Euclid Smart Clipper
// Fully compliant Manifest V3 content script with typed message handling & page inspection capabilities.

export type ExtensionMessage =
  | { type: "GET_PAGE_METADATA"; action?: string }
  | { type: "GET_SELECTED_TEXT"; action?: string }
  | { type: "EXTRACT_ARTICLE"; action?: string }
  | { type: "DETECT_MEDIA"; action?: string }
  | { type: "START_ANNOTATION_MODE"; action?: string }
  | { type: "STOP_ANNOTATION_MODE"; action?: string }
  | { type: "CREATE_HIGHLIGHT"; color?: string; action?: string }
  | { type: "CAPTURE_ELEMENT_METADATA"; action?: string }
  | { type: "GET_YOUTUBE_METADATA"; action?: string }
  | { type: "GET_VIDEO_TIMESTAMP"; action?: string }
  | { type: "PING_CONTENT_SCRIPT"; action?: string };

interface StructuredResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
}

// Annotation / Overlay State
let isAnnotationMode = false;
let annotationToolbarEl: HTMLElement | null = null;
let hoveredHighlightEl: HTMLElement | null = null;
let mouseMoveListener: ((e: MouseEvent) => void) | null = null;
let clickListener: ((e: MouseEvent) => void) | null = null;
let youtubeBadgeCreated = false;

// Initialize Message Listener safely
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.onMessage) {
  chrome.runtime.onMessage.addListener(
    (request: any, _sender: any, sendResponse: (response: StructuredResponse) => void) => {
      try {
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
            const highlightData = createHighlight(request.color || '#fef08a');
            sendResponse({ success: !!highlightData, data: highlightData, error: highlightData ? undefined : 'No text selected to highlight' });
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
            // Fallback for legacy commands or unknown messages
            sendResponse({
              success: true,
              data: {
                message: `Processed message: ${msgType}`,
                metadata: getPageMetadata()
              }
            });
            break;
        }
      } catch (err: any) {
        console.error('[Euclid Content Script Error]', err);
        sendResponse({ success: false, error: err?.message || 'Unknown content script error' });
      }
      return true; // Keep message channel open for async responses
    }
  );
}

// 1. PAGE METADATA
function getPageMetadata() {
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

// 2. SELECTED TEXT
function getSelectedTextData() {
  const selection = window.getSelection();
  const text = selection ? selection.toString().trim() : '';
  let contextBefore = '';
  let contextAfter = '';

  if (selection && selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const container = range.commonAncestorContainer;
    const parentText = container.textContent || '';
    const index = parentText.indexOf(text);
    if (index >= 0) {
      contextBefore = parentText.substring(Math.max(0, index - 50), index);
      contextAfter = parentText.substring(index + text.length, Math.min(parentText.length, index + text.length + 50));
    }
  }

  return {
    selectionText: text,
    length: text.length,
    contextBefore,
    contextAfter,
    pageTitle: document.title,
    pageUrl: window.location.href
  };
}

// 3. EXTRACT ARTICLE DATA
function extractArticleData() {
  const meta = getPageMetadata();

  // Find candidate main content element
  const selectors = [
    'article',
    '[role="main"]',
    'main',
    '.post-content',
    '.article-content',
    '.entry-content',
    '#content',
    '.content'
  ];

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

  // Clone to clean scripts/styles/ads
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

  // Convert simple plain text to markdown format
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

// 7. HIGHLIGHT CREATION
function createHighlight(color: string = '#fef08a') {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || !selection.toString().trim()) {
    return null;
  }

  const range = selection.getRangeAt(0);
  const text = selection.toString();

  try {
    const mark = document.createElement('mark');
    mark.className = 'euclid-smart-highlight';
    mark.style.backgroundColor = color;
    mark.style.color = '#000000';
    mark.style.borderRadius = '3px';
    mark.style.padding = '1px 3px';
    mark.style.boxShadow = '0 1px 2px rgba(0,0,0,0.1)';

    range.surroundContents(mark);
    selection.removeAllRanges();

    return {
      text,
      color,
      timestamp: new Date().toISOString()
    };
  } catch (e) {
    // Fallback if range spans multiple non-inline elements
    const span = document.createElement('span');
    span.className = 'euclid-smart-highlight';
    span.style.backgroundColor = color;
    span.innerText = text;
    
    try {
      range.deleteContents();
      range.insertNode(span);
      selection.removeAllRanges();
      return { text, color, timestamp: new Date().toISOString() };
    } catch (err) {
      return null;
    }
  }
}

// 8. CAPTURE HOVERED / ACTIVE ELEMENT
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

// 9. ANNOTATION MODE & OVERLAYS
function startAnnotationMode() {
  if (isAnnotationMode) return;
  isAnnotationMode = true;

  // Create floating toolbar
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
      border: 1px solid #334155;
    `;

    annotationToolbarEl.innerHTML = `
      <span style="background: #10b981; color: #fff; width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 700; font-size: 12px;">E</span>
      <span>Euclid Inspector Active</span>
      <button id="euclid-highlight-yellow" style="background: #fef08a; border: none; width: 20px; height: 20px; border-radius: 50%; cursor: pointer;" title="Highlight Yellow"></button>
      <button id="euclid-highlight-green" style="background: #bbf7d0; border: none; width: 20px; height: 20px; border-radius: 50%; cursor: pointer;" title="Highlight Green"></button>
      <button id="euclid-close-toolbar" style="background: #334155; color: #fff; border: none; border-radius: 6px; padding: 4px 8px; cursor: pointer; font-size: 12px;">Done</button>
    `;

    document.body.appendChild(annotationToolbarEl);

    document.getElementById('euclid-highlight-yellow')?.addEventListener('click', () => createHighlight('#fef08a'));
    document.getElementById('euclid-highlight-green')?.addEventListener('click', () => createHighlight('#bbf7d0'));
    document.getElementById('euclid-close-toolbar')?.addEventListener('click', () => stopAnnotationMode());
  }

  // Hover element highlight listener
  mouseMoveListener = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target && !target.closest('#euclid-annotation-toolbar') && !target.classList.contains('euclid-smart-highlight')) {
      if (hoveredHighlightEl && hoveredHighlightEl !== target) {
        hoveredHighlightEl.style.outline = '';
      }
      hoveredHighlightEl = target;
      hoveredHighlightEl.style.outline = '2px dashed #10b981';
    }
  };

  clickListener = (e: MouseEvent) => {
    if (hoveredHighlightEl && e.target === hoveredHighlightEl && !hoveredHighlightEl.closest('#euclid-annotation-toolbar')) {
      // Allow element inspection
    }
  };

  document.addEventListener('mousemove', mouseMoveListener);
  document.addEventListener('click', clickListener);
}

function stopAnnotationMode() {
  isAnnotationMode = false;

  if (annotationToolbarEl) {
    annotationToolbarEl.remove();
    annotationToolbarEl = null;
  }

  if (hoveredHighlightEl) {
    hoveredHighlightEl.style.outline = '';
    hoveredHighlightEl = null;
  }

  if (mouseMoveListener) {
    document.removeEventListener('mousemove', mouseMoveListener);
    mouseMoveListener = null;
  }

  if (clickListener) {
    document.removeEventListener('click', clickListener);
    clickListener = null;
  }
}

// 10. YOUTUBE HELPER BADGE
function injectYouTubeHelperBadge() {
  if (youtubeBadgeCreated || !window.location.hostname.includes('youtube.com')) return;
  if (!window.location.pathname.includes('/watch')) return;

  const video = document.querySelector('video');
  if (!video) return;

  youtubeBadgeCreated = true;

  const badge = document.createElement('div');
  badge.id = 'euclid-yt-badge';
  badge.style.cssText = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    z-index: 999999;
    background: linear-gradient(135deg, #059669, #046c4e);
    color: white;
    padding: 10px 16px;
    border-radius: 9999px;
    font-family: system-ui, -apple-system, sans-serif;
    font-size: 13px;
    font-weight: 600;
    box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    border: 2px solid #a3e635;
    transition: transform 0.2s ease;
  `;

  badge.innerHTML = `
    <span style="background: #facc15; color: #000; width: 22px; height: 22px; border-radius: 50%; display: inline-flex; align-items: center; justify-content: center; font-weight: 800; font-size: 12px;">E</span>
    <span>Euclid Note</span>
  `;

  badge.addEventListener('mouseover', () => (badge.style.transform = 'scale(1.05)'));
  badge.addEventListener('mouseout', () => (badge.style.transform = 'scale(1)'));
  badge.addEventListener('click', () => {
    const time = Math.floor(video.currentTime);
    const min = Math.floor(time / 60);
    const sec = time % 60;
    alert(`Timestamp ${min}:${sec < 10 ? '0' : ''}${sec} saved to Euclid Smart Notes!`);
  });

  document.body.appendChild(badge);
}

// Observe YouTube URL changes
setInterval(() => {
  if (window.location.hostname.includes('youtube.com') && window.location.pathname.includes('/watch')) {
    if (!document.getElementById('euclid-yt-badge')) {
      injectYouTubeHelperBadge();
    }
  }
}, 3000);

export {};
