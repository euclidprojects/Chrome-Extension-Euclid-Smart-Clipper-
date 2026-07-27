// Content Script for Euclid Smart Clipper

let youtubeOverlayCreated = false;

// Listen for background messages
if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.action === 'extract_page_info') {
      const pageInfo = extractPageInfo();
      sendResponse(pageInfo);
      return true;
    }

    if (request.action === 'capture_video_frame') {
      const frameData = captureVideoFrame();
      sendResponse(frameData);
      return true;
    }

    if (request.action === 'get_youtube_info') {
      const ytInfo = getYouTubeInfo();
      sendResponse(ytInfo);
      return true;
    }

    if (request.action === 'euclid-clip-selection') {
      const sel = window.getSelection()?.toString();
      sendResponse({ selectionText: sel });
      return true;
    }
  });
}

function extractPageInfo() {
  const title = document.title || 'Untitled Page';
  const url = window.location.href;
  const canonicalUrl = document.querySelector('link[rel="canonical"]')?.getAttribute('href') || url;
  const favicon = document.querySelector('link[rel*="icon"]')?.getAttribute('href') || '/favicon.ico';
  const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute('content') || '';
  const description = document.querySelector('meta[name="description"]')?.getAttribute('content') || '';
  const author = document.querySelector('meta[name="author"]')?.getAttribute('content') || '';
  const html = document.body.innerHTML;

  return {
    title,
    url,
    canonicalUrl,
    favicon: favicon.startsWith('http') ? favicon : new URL(favicon, url).href,
    ogImage,
    description,
    author,
    html,
    selectionText: window.getSelection()?.toString() || '',
  };
}

function getYouTubeInfo() {
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
    url: window.location.href,
  };
}

function captureVideoFrame() {
  const video = document.querySelector('video') as HTMLVideoElement | null;
  if (!video) return null;

  try {
    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth || 1280;
    canvas.height = video.videoHeight || 720;
    const ctx = canvas.getContext('2d');
    if (ctx) {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
      return canvas.toDataURL('image/png');
    }
  } catch (e) {
    console.warn('Video frame capture restricted by CORS/Canvas origin', e);
  }
  return null;
}

// Optional floating badge for YouTube pages
function injectYouTubeHelperBadge() {
  if (youtubeOverlayCreated || !window.location.hostname.includes('youtube.com')) return;
  if (!window.location.pathname.includes('/watch')) return;

  const video = document.querySelector('video');
  if (!video) return;

  youtubeOverlayCreated = true;

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
    alert(`Timestamp ${Math.floor(video.currentTime)}s ready for Euclid Smart Notes!`);
  });

  document.body.appendChild(badge);
}

// Observe URL changes for single-page applications
setInterval(() => {
  if (window.location.hostname.includes('youtube.com') && window.location.pathname.includes('/watch')) {
    if (!document.getElementById('euclid-yt-badge')) {
      injectYouTubeHelperBadge();
    }
  }
}, 3000);

export {};
