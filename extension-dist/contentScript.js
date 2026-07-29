(() => {
  // src/utils/pageUtils.ts
  function isSupportedPage(url) {
    if (!url) return false;
    const lowercaseUrl = url.toLowerCase().trim();
    if (!lowercaseUrl.startsWith("http://") && !lowercaseUrl.startsWith("https://")) {
      return false;
    }
    if (lowercaseUrl.startsWith("https://chromewebstore.google.com/") || lowercaseUrl.startsWith("https://chrome.google.com/webstore/") || lowercaseUrl.startsWith("chrome://") || lowercaseUrl.startsWith("chrome-extension://") || lowercaseUrl.startsWith("edge://") || lowercaseUrl.startsWith("about:")) {
      return false;
    }
    return true;
  }

  // src/content/contentScript.ts
  var activeOverlayMode = "none";
  var overlayAbortController = null;
  var currentRect = null;
  var elementHoverEl = null;
  var pageAnnotations = [];
  var quickSelectionToolbarEl = null;
  function cleanupEuclidClipperOverlays() {
    document.querySelectorAll(
      [
        "#euclid-smart-clipper-root",
        "#euclid-region-selection-overlay",
        "#euclid-element-selection-overlay",
        "#euclid-annotation-toolbar",
        "#euclid-capture-toolbar",
        "#euclid-quick-selection-toolbar",
        "[data-euclid-clipper-overlay]"
      ].join(",")
    ).forEach((element) => element.remove());
    document.documentElement.classList.remove(
      "euclid-annotation-active",
      "euclid-region-selection-active",
      "euclid-element-selection-active"
    );
    document.body.style.cursor = "";
    document.body.style.userSelect = "";
    if (elementHoverEl) {
      elementHoverEl.style.outline = "";
      elementHoverEl = null;
    }
    if (quickSelectionToolbarEl) {
      quickSelectionToolbarEl.remove();
      quickSelectionToolbarEl = null;
    }
    activeOverlayMode = "none";
    stopOverlayListeners();
  }
  function startOverlayListeners() {
    stopOverlayListeners();
    overlayAbortController = new AbortController();
    const signal = overlayAbortController.signal;
    window.addEventListener(
      "keydown",
      (e) => {
        if (e.key === "Escape") {
          cleanupEuclidClipperOverlays();
          chrome.runtime.sendMessage({
            type: "OVERLAY_CANCELLED",
            action: "CANCEL_ACTIVE_OVERLAY",
            data: { status: "cancelled_by_escape" }
          }).catch(() => {
          });
        }
      },
      { signal }
    );
    return signal;
  }
  function stopOverlayListeners() {
    overlayAbortController?.abort();
    overlayAbortController = null;
  }
  function createOverlayHost(fullScreen = false) {
    cleanupEuclidClipperOverlays();
    const host = document.createElement("div");
    host.id = "euclid-smart-clipper-root";
    host.dataset.euclidClipperOverlay = "true";
    if (fullScreen) {
      host.style.cssText = `
      position: fixed !important;
      inset: 0 !important;
      z-index: 2147483647 !important;
      width: 100vw !important;
      height: 100vh !important;
      pointer-events: auto !important;
      overflow: hidden !important;
      margin: 0 !important;
      padding: 0 !important;
      border: none !important;
      background: transparent !important;
    `;
    } else {
      host.style.cssText = `
      position: fixed !important;
      top: 12px !important;
      right: 12px !important;
      z-index: 2147483647 !important;
      width: min(320px, calc(100vw - 24px)) !important;
      max-height: calc(100vh - 24px) !important;
      overflow: visible !important;
      box-sizing: border-box !important;
      margin: 0 !important;
      padding: 0 !important;
      border: none !important;
      background: transparent !important;
      pointer-events: auto !important;
    `;
    }
    const shadowRoot = host.attachShadow({ mode: "open" });
    document.documentElement.appendChild(host);
    return { host, shadowRoot };
  }
  function getShadowStyles() {
    return `
    :host {
      all: initial;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      box-sizing: border-box;
    }
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    .euclid-toolbar {
      background: #0f172a;
      color: #f8fafc;
      border: 1px solid #10b981;
      border-radius: 12px;
      padding: 10px 14px;
      box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(16, 185, 129, 0.25);
      display: flex;
      align-items: center;
      justify-content: space-between;
      gap: 10px;
      font-size: 12px;
      font-weight: 600;
      width: 100%;
    }
    .euclid-brand {
      display: flex;
      align-items: center;
      gap: 8px;
      min-width: 0;
    }
    .euclid-logo {
      width: 20px;
      height: 20px;
      background: linear-gradient(135deg, #10b981, #047857);
      color: #ffffff;
      border-radius: 50%;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 11px;
      flex-shrink: 0;
      border: 1px solid rgba(251, 191, 36, 0.6);
    }
    .euclid-text {
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #fbbf24;
      font-weight: 700;
      font-size: 12px;
    }
    .euclid-actions {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-shrink: 0;
    }
    .btn-primary {
      background: #10b981;
      color: #ffffff;
      border: none;
      border-radius: 6px;
      padding: 5px 10px;
      font-weight: 700;
      font-size: 11px;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    .btn-primary:hover {
      background: #059669;
    }
    .btn-secondary {
      background: #334155;
      color: #f1f5f9;
      border: none;
      border-radius: 6px;
      padding: 5px 8px;
      font-weight: 600;
      font-size: 11px;
      cursor: pointer;
      transition: background 0.15s ease;
    }
    .btn-secondary:hover {
      background: #475569;
    }
    .btn-close {
      background: transparent;
      color: #94a3b8;
      border: none;
      border-radius: 6px;
      width: 22px;
      height: 22px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      font-size: 13px;
      font-weight: 700;
    }
    .btn-close:hover {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.15);
    }
  `;
  }
  cleanupEuclidClipperOverlays();
  if (typeof chrome !== "undefined" && chrome.runtime && chrome.runtime.onMessage) {
    chrome.runtime.onMessage.addListener(
      (request, _sender, sendResponse) => {
        try {
          if (!isSupportedPage(window.location.href)) {
            cleanupEuclidClipperOverlays();
            sendResponse({
              success: false,
              error: "This page cannot be captured or annotated because Chrome does not allow extensions to access it."
            });
            return true;
          }
          const msgType = request.type || request.action;
          switch (msgType) {
            case "PING_CONTENT_SCRIPT":
            case "ping":
              sendResponse({
                success: true,
                data: { status: "pong", version: "1.0.0", ready: true, url: window.location.href }
              });
              break;
            case "START_REGION_SELECTION":
            case "start_region_selection":
              startRegionSelection();
              sendResponse({ success: true, data: { status: "selecting" } });
              break;
            case "CANCEL_REGION_SELECTION":
            case "cancel_region_selection":
            case "CANCEL_ACTIVE_OVERLAY":
            case "CLEANUP_ACTIVE_OVERLAY":
              cleanupEuclidClipperOverlays();
              sendResponse({ success: true, data: { status: "cancelled" } });
              break;
            case "START_ELEMENT_SELECTION":
            case "start_element_selection":
              startElementSelection();
              sendResponse({ success: true, data: { status: "selecting_element" } });
              break;
            case "START_ANNOTATION_MODE":
              startAnnotationMode();
              sendResponse({ success: true, data: { annotationMode: true } });
              break;
            case "STOP_ANNOTATION_MODE":
              stopAnnotationMode();
              sendResponse({ success: true, data: { annotationMode: false } });
              break;
            case "GET_PAGE_METADATA":
            case "extract_page_info":
              sendResponse({ success: true, data: getPageMetadata() });
              break;
            case "GET_SELECTED_TEXT":
            case "euclid-clip-selection":
              sendResponse({ success: true, data: getSelectedTextData() });
              break;
            case "EXTRACT_ARTICLE":
            case "euclid-clip-article":
            case "command_clip_article":
              sendResponse({ success: true, data: extractArticleData() });
              break;
            case "DETECT_MEDIA":
              sendResponse({ success: true, data: detectMediaData() });
              break;
            case "CREATE_HIGHLIGHT":
              const highlightData = createHighlight(request.color || localStorage.getItem("euclid_last_color") || "#FDE047");
              sendResponse({
                success: !!highlightData,
                data: highlightData,
                error: highlightData ? void 0 : "No text selected to highlight"
              });
              break;
            case "LOCATE_ANNOTATION":
              const located = locateAnnotationOnPage(request.id || request.annotationId);
              sendResponse({ success: located, data: { located } });
              break;
            case "RESTORE_ANNOTATIONS":
              const restoredCount = restoreAnnotationsOnPage(request.annotations || []);
              sendResponse({ success: true, data: { restoredCount } });
              break;
            case "CAPTURE_ELEMENT_METADATA":
              sendResponse({ success: true, data: captureElementMetadata() });
              break;
            case "GET_YOUTUBE_METADATA":
            case "get_youtube_info":
              const ytInfo = getYouTubeMetadata();
              sendResponse({ success: !!ytInfo, data: ytInfo, error: ytInfo ? void 0 : "Not a valid YouTube video page" });
              break;
            case "GET_VIDEO_TIMESTAMP":
            case "capture_video_frame":
            case "command_add_youtube_timestamp":
              const videoData = getVideoTimestampData();
              sendResponse({ success: !!videoData, data: videoData, error: videoData ? void 0 : "No active HTML5 video found on page" });
              break;
            case "SEEK_YOUTUBE_VIDEO":
            case "seek_youtube_video":
              const videoToSeek = document.querySelector("video");
              if (videoToSeek && typeof request.seconds === "number" && !isNaN(request.seconds) && request.seconds >= 0) {
                videoToSeek.currentTime = request.seconds;
                sendResponse({
                  success: true,
                  data: { currentTime: videoToSeek.currentTime, duration: videoToSeek.duration || 0 }
                });
              } else {
                sendResponse({
                  success: false,
                  error: "Active video element not found or invalid target timestamp"
                });
              }
              break;
            default:
              sendResponse({
                success: true,
                data: { message: `Processed message: ${msgType}`, metadata: getPageMetadata() }
              });
              break;
          }
        } catch (err) {
          console.error("[Euclid Content Script Error]", err);
          sendResponse({ success: false, error: err?.message || "Unknown content script error" });
        }
        return true;
      }
    );
  }
  function startRegionSelection() {
    if (!isSupportedPage(window.location.href)) return;
    activeOverlayMode = "region_selection";
    startOverlayListeners();
    const { shadowRoot } = createOverlayHost(true);
    const styleEl = document.createElement("style");
    styleEl.textContent = `
    ${getShadowStyles()}
    .backdrop {
      position: absolute;
      inset: 0;
      background: rgba(0, 0, 0, 0.45);
      cursor: crosshair;
      user-select: none;
    }
    .banner {
      position: absolute;
      top: 16px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 10;
    }
    .selection-box {
      position: absolute;
      display: none;
      border: 2px solid #10b981;
      background: rgba(16, 185, 129, 0.12);
      box-shadow: 0 0 0 9999px rgba(0, 0, 0, 0.5);
      pointer-events: auto;
    }
    .badge {
      position: absolute;
      top: -30px;
      left: 0;
      background: #10b981;
      color: #064e3b;
      font-weight: 800;
      font-size: 11px;
      padding: 3px 8px;
      border-radius: 6px;
      white-space: nowrap;
    }
    .controls {
      position: absolute;
      bottom: -48px;
      right: 0;
      display: flex;
      gap: 6px;
    }
  `;
    shadowRoot.appendChild(styleEl);
    const container = document.createElement("div");
    container.className = "backdrop";
    container.innerHTML = `
    <div class="banner">
      <div class="euclid-toolbar">
        <div class="euclid-brand">
          <span class="euclid-logo">E</span>
          <span class="euclid-text">Select an area to clip</span>
        </div>
        <div class="euclid-actions">
          <button class="btn-close" aria-label="Close Euclid Smart Clipper toolbar" id="banner-close">\u2715</button>
        </div>
      </div>
    </div>
    <div class="selection-box" id="selection-box">
      <div class="badge" id="selection-badge">0 \xD7 0 px</div>
      <div class="controls">
        <button class="btn-primary" id="confirm-btn">\u2713 Capture Area</button>
        <button class="btn-secondary" id="cancel-btn">\u2715 Cancel</button>
      </div>
    </div>
  `;
    shadowRoot.appendChild(container);
    const box = shadowRoot.getElementById("selection-box");
    const badge = shadowRoot.getElementById("selection-badge");
    let isSelecting = false;
    let startX = 0;
    let startY = 0;
    const onMouseDown = (e) => {
      const path = e.composedPath();
      if (path.some((el) => el.id === "confirm-btn" || el.id === "cancel-btn" || el.id === "banner-close")) return;
      isSelecting = true;
      startX = e.clientX;
      startY = e.clientY;
      box.style.display = "block";
      updateBox(e.clientX, e.clientY);
    };
    const onMouseMove = (e) => {
      if (!isSelecting) return;
      updateBox(e.clientX, e.clientY);
    };
    const onMouseUp = () => {
      if (isSelecting) {
        isSelecting = false;
      }
    };
    const updateBox = (clientX, clientY) => {
      const left = Math.min(startX, clientX);
      const top = Math.min(startY, clientY);
      const width = Math.abs(clientX - startX);
      const height = Math.abs(clientY - startY);
      currentRect = { x: left, y: top, width, height };
      box.style.left = `${left}px`;
      box.style.top = `${top}px`;
      box.style.width = `${width}px`;
      box.style.height = `${height}px`;
      const dpr = window.devicePixelRatio || 1;
      badge.textContent = `${Math.round(width * dpr)} \xD7 ${Math.round(height * dpr)} px`;
    };
    container.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    shadowRoot.getElementById("banner-close")?.addEventListener("click", (e) => {
      e.stopPropagation();
      cleanupEuclidClipperOverlays();
      chrome.runtime.sendMessage({ type: "OVERLAY_CANCELLED", action: "CANCEL_ACTIVE_OVERLAY" }).catch(() => {
      });
    });
    shadowRoot.getElementById("cancel-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      cleanupEuclidClipperOverlays();
      chrome.runtime.sendMessage({ type: "OVERLAY_CANCELLED", action: "CANCEL_ACTIVE_OVERLAY" }).catch(() => {
      });
    });
    shadowRoot.getElementById("confirm-btn")?.addEventListener("click", (e) => {
      e.stopPropagation();
      if (currentRect && currentRect.width > 5 && currentRect.height > 5) {
        const dpr = window.devicePixelRatio || 1;
        const selectionData = {
          selectionRect: {
            x: (currentRect.x + window.scrollX) * dpr,
            y: (currentRect.y + window.scrollY) * dpr,
            width: currentRect.width * dpr,
            height: currentRect.height * dpr,
            viewportX: currentRect.x,
            viewportY: currentRect.y,
            viewportWidth: currentRect.width,
            viewportHeight: currentRect.height,
            devicePixelRatio: dpr
          },
          sourceUrl: window.location.href,
          sourceTitle: document.title
        };
        cleanupEuclidClipperOverlays();
        chrome.runtime.sendMessage({
          type: "REGION_SELECTION_CONFIRMED",
          data: selectionData
        }).catch((err) => console.error("Error sending region selection:", err));
      } else {
        alert("Please drag to select an area before confirming.");
      }
    });
  }
  function startElementSelection() {
    if (!isSupportedPage(window.location.href)) return;
    activeOverlayMode = "element_selection";
    startOverlayListeners();
    const { shadowRoot } = createOverlayHost(false);
    const styleEl = document.createElement("style");
    styleEl.textContent = getShadowStyles();
    shadowRoot.appendChild(styleEl);
    const container = document.createElement("div");
    container.className = "euclid-toolbar";
    container.innerHTML = `
    <div class="euclid-brand">
      <span class="euclid-logo">E</span>
      <span class="euclid-text">Click element to capture</span>
    </div>
    <div class="euclid-actions">
      <button class="btn-secondary" id="elem-cancel">\u2715 Cancel</button>
      <button class="btn-close" aria-label="Close Euclid Smart Clipper toolbar" id="elem-close">\u2715</button>
    </div>
  `;
    shadowRoot.appendChild(container);
    const handleCancel = () => {
      cleanupEuclidClipperOverlays();
      chrome.runtime.sendMessage({ type: "OVERLAY_CANCELLED", action: "CANCEL_ACTIVE_OVERLAY" }).catch(() => {
      });
    };
    shadowRoot.getElementById("elem-cancel")?.addEventListener("click", handleCancel);
    shadowRoot.getElementById("elem-close")?.addEventListener("click", handleCancel);
    const onMouseMove = (e) => {
      const target = e.target;
      if (!target || target === document.body || target === document.documentElement) return;
      if (target.closest("#euclid-smart-clipper-root")) return;
      if (elementHoverEl) {
        elementHoverEl.style.outline = "";
      }
      elementHoverEl = target;
      elementHoverEl.style.outline = "3px solid #10b981";
    };
    const onClick = (e) => {
      const target = e.target;
      if (target && target.closest("#euclid-smart-clipper-root")) return;
      e.preventDefault();
      e.stopPropagation();
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick, true);
      if (elementHoverEl) {
        elementHoverEl.style.outline = "";
        const rect = elementHoverEl.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;
        const selectionData = {
          selectionRect: {
            x: (rect.left + window.scrollX) * dpr,
            y: (rect.top + window.scrollY) * dpr,
            width: rect.width * dpr,
            height: rect.height * dpr,
            viewportX: rect.left,
            viewportY: rect.top,
            viewportWidth: rect.width,
            viewportHeight: rect.height,
            devicePixelRatio: dpr
          },
          sourceUrl: window.location.href,
          sourceTitle: document.title
        };
        cleanupEuclidClipperOverlays();
        chrome.runtime.sendMessage({
          type: "ELEMENT_SELECTED",
          data: selectionData
        }).catch((err) => console.error("Error sending element selection:", err));
      }
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick, true);
  }
  function startAnnotationMode() {
    if (!isSupportedPage(window.location.href)) return;
    activeOverlayMode = "annotation";
    startOverlayListeners();
    const { shadowRoot } = createOverlayHost(false);
    const styleEl = document.createElement("style");
    styleEl.textContent = `
    ${getShadowStyles()}
    .color-btn {
      width: 18px;
      height: 18px;
      border-radius: 50%;
      border: none;
      cursor: pointer;
      flex-shrink: 0;
    }
  `;
    shadowRoot.appendChild(styleEl);
    const container = document.createElement("div");
    container.className = "euclid-toolbar";
    container.innerHTML = `
    <div class="euclid-brand">
      <span class="euclid-logo">E</span>
      <span class="euclid-text">Euclid Annotator</span>
    </div>
    <div class="euclid-actions">
      <button class="color-btn" style="background: #FDE047" id="ann-hl-yellow" title="Yellow Highlight"></button>
      <button class="color-btn" style="background: #4ADE80" id="ann-hl-green" title="Green Highlight"></button>
      <button class="btn-primary" id="ann-done">Done</button>
      <button class="btn-close" aria-label="Close Euclid Smart Clipper toolbar" id="ann-close">\u2715</button>
    </div>
  `;
    shadowRoot.appendChild(container);
    const handleFinish = () => {
      cleanupEuclidClipperOverlays();
      chrome.runtime.sendMessage({ type: "OVERLAY_COMPLETED", action: "CLEANUP_ACTIVE_OVERLAY" }).catch(() => {
      });
    };
    shadowRoot.getElementById("ann-hl-yellow")?.addEventListener("click", () => createHighlight("#FDE047"));
    shadowRoot.getElementById("ann-hl-green")?.addEventListener("click", () => createHighlight("#4ADE80"));
    shadowRoot.getElementById("ann-done")?.addEventListener("click", handleFinish);
    shadowRoot.getElementById("ann-close")?.addEventListener("click", handleFinish);
  }
  function stopAnnotationMode() {
    cleanupEuclidClipperOverlays();
  }
  function getPageMetadata() {
    if (!isSupportedPage(window.location.href)) {
      return {
        title: "Restricted Browser Page",
        url: window.location.href,
        domain: "chrome",
        isUnsupported: true,
        unsupportedMessage: "This page cannot be captured or annotated because Chrome does not allow extensions to access it."
      };
    }
    const url = window.location.href;
    const domain = window.location.hostname;
    const title = document.title || "Untitled Page";
    const canonicalUrl = document.querySelector('link[rel="canonical"]')?.getAttribute("href") || url;
    const faviconRaw = document.querySelector('link[rel*="icon"]')?.getAttribute("href") || "/favicon.ico";
    let favicon = faviconRaw;
    try {
      favicon = new URL(faviconRaw, url).href;
    } catch (e) {
      favicon = "/favicon.ico";
    }
    const ogImage = document.querySelector('meta[property="og:image"]')?.getAttribute("content") || "";
    const description = document.querySelector('meta[name="description"]')?.getAttribute("content") || document.querySelector('meta[property="og:description"]')?.getAttribute("content") || "";
    const author = document.querySelector('meta[name="author"]')?.getAttribute("content") || document.querySelector('meta[property="article:author"]')?.getAttribute("content") || "";
    const textContent = document.body ? document.body.innerText || "" : "";
    const words = textContent.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    const isPdf = url.toLowerCase().endsWith(".pdf") || document.contentType === "application/pdf";
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
      selectionText: window.getSelection()?.toString() || "",
      html: document.body ? document.body.innerHTML : ""
    };
  }
  function getSelectedTextData() {
    const selection = window.getSelection();
    const text = selection ? selection.toString().trim() : "";
    let contextBefore = "";
    let contextAfter = "";
    let xpath = "";
    let cssSelector = "";
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      const container = range.commonAncestorContainer;
      const parentText = container.textContent || "";
      const index = parentText.indexOf(text);
      if (index >= 0) {
        contextBefore = parentText.substring(Math.max(0, index - 50), index);
        contextAfter = parentText.substring(index + text.length, Math.min(parentText.length, index + text.length + 50));
      }
      const parentEl = container.nodeType === 1 ? container : container.parentElement;
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
  function getXPathForElement(element) {
    if (element.id) return `//*[@id="${element.id}"]`;
    if (element === document.body) return "/html/body";
    let ix = 0;
    const siblings = element.parentNode ? Array.from(element.parentNode.childNodes) : [];
    for (let i = 0; i < siblings.length; i++) {
      const sibling = siblings[i];
      if (sibling === element) {
        return getXPathForElement(element.parentNode) + "/" + element.tagName.toLowerCase() + "[" + (ix + 1) + "]";
      }
      if (sibling.nodeType === 1 && sibling.tagName === element.tagName) {
        ix++;
      }
    }
    return "";
  }
  function getCssSelectorForElement(element) {
    if (element.id) return `#${element.id}`;
    if (element.className && typeof element.className === "string") {
      const classes = element.className.trim().split(/\s+/).filter(Boolean).join(".");
      if (classes) return `${element.tagName.toLowerCase()}.${classes}`;
    }
    return element.tagName.toLowerCase();
  }
  function extractArticleData() {
    const meta = getPageMetadata();
    const selectors = ["article", '[role="main"]', "main", ".post-content", ".article-content", ".entry-content", "#content", ".content"];
    let mainEl = null;
    for (const selector of selectors) {
      const found = document.querySelector(selector);
      if (found && found.innerText.trim().length > 200) {
        mainEl = found;
        break;
      }
    }
    if (!mainEl) {
      mainEl = document.body;
    }
    const clone = mainEl.cloneNode(true);
    const removeSelectors = ["script", "style", "iframe", "nav", "header", "footer", ".ad", ".ads", ".social-share"];
    removeSelectors.forEach((s) => {
      clone.querySelectorAll(s).forEach((node) => node.remove());
    });
    const cleanHtml = clone.innerHTML;
    const plainText = clone.innerText || clone.textContent || "";
    const words = plainText.trim().split(/\s+/).filter(Boolean);
    const wordCount = words.length;
    const readingTime = Math.max(1, Math.ceil(wordCount / 200));
    const markdown = `# ${meta.title}

*Source: [${meta.domain}](${meta.url})*

${plainText.split("\n\n").map((p) => p.trim()).filter(Boolean).join("\n\n")}`;
    return {
      title: meta.title,
      author: meta.author || meta.domain,
      publishedDate: (/* @__PURE__ */ new Date()).toISOString(),
      cleanHtml,
      markdown,
      plainText,
      wordCount,
      readingTime,
      sourceUrl: meta.url,
      sourceDomain: meta.domain
    };
  }
  function detectMediaData() {
    const images = [];
    document.querySelectorAll("img").forEach((img) => {
      if (img.src && (img.width > 100 || img.height > 100)) {
        images.push({
          src: img.src,
          alt: img.alt || "",
          width: img.naturalWidth || img.width,
          height: img.naturalHeight || img.height
        });
      }
    });
    const videos = [];
    document.querySelectorAll("video").forEach((video) => {
      videos.push({
        src: video.currentSrc || video.src || "HTML5 Video",
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
      isPdf: window.location.href.toLowerCase().endsWith(".pdf")
    };
  }
  function getYouTubeMetadata() {
    const host = window.location.hostname.toLowerCase();
    const isYouTubeHost = host.includes("youtube.com") || host.includes("youtu.be");
    if (!isYouTubeHost) return null;
    const videoEl = document.querySelector("video");
    const titleEl = document.querySelector("h1.ytd-watch-metadata yt-formatted-string") || document.querySelector("h1.title") || document.querySelector("yt-formatted-string.ytd-video-primary-info-renderer");
    const channelEl = document.querySelector("ytd-channel-name a") || document.querySelector("#owner #channel-name a") || document.querySelector(".ytd-channel-name");
    let videoId = new URLSearchParams(window.location.search).get("v") || "";
    if (!videoId && window.location.pathname.includes("/shorts/")) {
      videoId = window.location.pathname.split("/shorts/")[1]?.split("?")[0]?.split("/")[0] || "";
    }
    return {
      isYouTube: true,
      videoId,
      title: titleEl?.textContent?.trim() || document.title.replace("- YouTube", "").trim(),
      channelName: channelEl?.textContent?.trim() || "",
      channelUrl: channelEl?.href || "",
      currentTime: videoEl ? Math.floor(videoEl.currentTime) : 0,
      duration: videoEl ? Math.floor(videoEl.duration) : 0,
      url: window.location.href
    };
  }
  function getVideoTimestampData() {
    const video = document.querySelector("video");
    if (!video) return null;
    let frameDataUrl = null;
    try {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth || 640;
      canvas.height = video.videoHeight || 360;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        frameDataUrl = canvas.toDataURL("image/png");
      }
    } catch (e) {
    }
    const ytInfo = getYouTubeMetadata();
    const currentTime = Math.floor(video.currentTime || 0);
    const minutes = Math.floor(currentTime / 60);
    const seconds = currentTime % 60;
    const formattedTime = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    return {
      currentTime,
      formattedTime,
      duration: Math.floor(video.duration || 0),
      videoTitle: ytInfo?.title || document.title,
      frameDataUrl,
      pageUrl: window.location.href
    };
  }
  function createHighlight(color = "#FDE047", comment) {
    if (!isSupportedPage(window.location.href)) return null;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0 || !selection.toString().trim()) {
      return null;
    }
    const range = selection.getRangeAt(0);
    const text = selection.toString().trim();
    const highlightId = "euclid-hl-" + Date.now();
    const selectedData = getSelectedTextData();
    try {
      const mark = document.createElement("mark");
      mark.id = highlightId;
      mark.className = "euclid-smart-highlight";
      mark.style.backgroundColor = color;
      mark.style.color = "#000000";
      mark.style.borderRadius = "3px";
      mark.style.padding = "1px 4px";
      mark.style.boxShadow = "0 1px 3px rgba(0,0,0,0.15)";
      mark.style.transition = "all 0.3s ease";
      range.surroundContents(mark);
      selection.removeAllRanges();
      try {
        localStorage.setItem("euclid_last_color", color);
      } catch (e) {
      }
      const annObj = {
        id: highlightId,
        type: "highlight",
        color,
        selectedText: text,
        comment: comment || "",
        textQuoteSelector: {
          exact: text,
          prefix: selectedData.contextBefore,
          suffix: selectedData.contextAfter
        },
        xpath: selectedData.xpath,
        cssSelector: selectedData.cssSelector,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      pageAnnotations.push(annObj);
      return annObj;
    } catch (e) {
      const span = document.createElement("span");
      span.id = highlightId;
      span.className = "euclid-smart-highlight";
      span.style.backgroundColor = color;
      span.innerText = text;
      try {
        range.deleteContents();
        range.insertNode(span);
        selection.removeAllRanges();
        const annObj = {
          id: highlightId,
          type: "highlight",
          color,
          selectedText: text,
          comment: comment || "",
          createdAt: (/* @__PURE__ */ new Date()).toISOString()
        };
        pageAnnotations.push(annObj);
        return annObj;
      } catch (err) {
        return null;
      }
    }
  }
  function locateAnnotationOnPage(id) {
    if (!id) return false;
    const el = document.getElementById(id) || document.querySelector(`[data-annotation-id="${id}"]`);
    if (!el) return false;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    const origOutline = el.style.outline;
    const origBoxShadow = el.style.boxShadow;
    el.style.outline = "4px solid #facc15";
    el.style.boxShadow = "0 0 20px #facc15";
    setTimeout(() => {
      el.style.outline = origOutline;
      el.style.boxShadow = origBoxShadow;
    }, 2500);
    return true;
  }
  function restoreAnnotationsOnPage(annotations) {
    if (!Array.isArray(annotations) || annotations.length === 0) return 0;
    let count = 0;
    annotations.forEach((ann) => {
      if (ann.selectedText) {
        const exactText = ann.selectedText;
        const bodyText = document.body.innerText;
        if (bodyText.includes(exactText)) {
          count++;
        }
      }
    });
    return count;
  }
  function captureElementMetadata() {
    const activeEl = document.activeElement;
    if (!activeEl) return null;
    return {
      tagName: activeEl.tagName.toLowerCase(),
      id: activeEl.id || "",
      className: activeEl.className || "",
      innerText: activeEl.innerText ? activeEl.innerText.substring(0, 300) : "",
      value: activeEl.value || "",
      attributes: Array.from(activeEl.attributes).map((a) => ({ name: a.name, value: a.value }))
    };
  }
  window.addEventListener("popstate", () => cleanupEuclidClipperOverlays());
  window.addEventListener("hashchange", () => cleanupEuclidClipperOverlays());
  window.addEventListener("yt-navigate-finish", () => cleanupEuclidClipperOverlays());
  var lastObservedUrl = window.location.href;
  setInterval(() => {
    if (window.location.href !== lastObservedUrl) {
      lastObservedUrl = window.location.href;
      cleanupEuclidClipperOverlays();
    }
  }, 1e3);
})();
