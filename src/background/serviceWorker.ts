// Background Service Worker for Euclid Smart Clipper

// Context Menu & Lifecycle Initialization
if (typeof chrome !== 'undefined' && chrome.runtime) {
  chrome.runtime.onInstalled.addListener(() => {
    if (chrome.contextMenus) {
      chrome.contextMenus.removeAll(() => {
        chrome.contextMenus.create({
          id: 'euclid-parent',
          title: 'Euclid Smart Clipper',
          contexts: ['all'],
        });

        chrome.contextMenus.create({
          parentId: 'euclid-parent',
          id: 'euclid-screenshot',
          title: 'Capture Screenshot',
          contexts: ['all'],
        });

        chrome.contextMenus.create({
          parentId: 'euclid-parent',
          id: 'euclid-youtube-note',
          title: 'Create YouTube Note',
          contexts: ['all'],
        });

        chrome.contextMenus.create({
          parentId: 'euclid-parent',
          id: 'euclid-bookmark',
          title: 'Save Bookmark',
          contexts: ['all'],
        });

        chrome.contextMenus.create({
          parentId: 'euclid-parent',
          id: 'euclid-simplified-article',
          title: 'Save Simplified Article',
          contexts: ['all'],
        });

        chrome.contextMenus.create({
          parentId: 'euclid-parent',
          id: 'euclid-full-page',
          title: 'Save Full Page',
          contexts: ['all'],
        });

        chrome.contextMenus.create({
          parentId: 'euclid-parent',
          id: 'euclid-save-clip',
          title: 'Save Clip',
          contexts: ['all'],
        });
      });
    }
  });

  // Handle Context Menu Item Clicks
  if (chrome.contextMenus) {
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      if (!tab || !tab.id) return;

      if (info.menuItemId === 'euclid-open-sidepanel') {
        // @ts-ignore
        if (chrome.sidePanel && chrome.sidePanel.open) {
          // @ts-ignore
          chrome.sidePanel.open({ tabId: tab.id });
        }
        return;
      }

      chrome.tabs.sendMessage(tab.id, {
        type: 'CONTEXT_MENU_CLICK',
        action: info.menuItemId,
        selectionText: info.selectionText,
        srcUrl: info.srcUrl,
        pageUrl: info.pageUrl || tab.url,
        pageTitle: tab.title,
      }).catch(() => {
        // Tab may not have content script active or supported protocol
      });
    });
  }

  // Keyboard Command Listener
  if (chrome.commands?.onCommand) {
    chrome.commands.onCommand.addListener((command) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id) {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: 'COMMAND_TRIGGERED',
            action: `command_${command}`
          }).catch(() => {
            // Ignore if active tab isn't listening
          });
        }
      });
    });
  }

  // Background Message Listener
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'PING_SERVICE_WORKER') {
      sendResponse({ success: true, data: { status: 'service_worker_active' } });
      return true;
    }

    // Trigger Region Selection on active tab
    if (request.type === 'START_REGION_SELECTION' || request.type === 'start_region_selection') {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        if (!tab || !tab.id) {
          sendResponse({ success: false, error: 'No active tab found' });
          return;
        }

        if (tab.url?.startsWith('chrome://') || tab.url?.startsWith('chrome-extension://') || tab.url?.startsWith('edge://')) {
          sendResponse({ success: false, error: 'Chrome extension permissions prevent capturing browser internal pages.' });
          return;
        }

        chrome.tabs.sendMessage(tab.id, { type: 'START_REGION_SELECTION' }, (response) => {
          if (chrome.runtime.lastError) {
            // Inject content script if not loaded
            chrome.scripting.executeScript({
              target: { tabId: tab.id! },
              files: ['contentScript.js'],
            }).then(() => {
              chrome.tabs.sendMessage(tab.id!, { type: 'START_REGION_SELECTION' }, (res2) => {
                sendResponse(res2 || { success: true });
              });
            }).catch((err) => {
              sendResponse({ success: false, error: err?.message || 'Could not inject content script on this page.' });
            });
          } else {
            sendResponse(response || { success: true });
          }
        });
      });
      return true;
    }

    // Region selection confirmed -> capture visible tab -> save job -> open editor window
    if (request.type === 'REGION_SELECTION_CONFIRMED' || request.type === 'ELEMENT_SELECTED') {
      const selectionData = request.data;
      const tabId = sender.tab?.id;

      chrome.tabs.captureVisibleTab(null, { format: 'png' }, async (dataUrl) => {
        if (chrome.runtime.lastError || !dataUrl) {
          console.error('Failed to capture visible tab:', chrome.runtime.lastError);
          return;
        }

        const jobId = 'job_' + Date.now();
        const jobData = {
          id: jobId,
          type: request.type === 'ELEMENT_SELECTED' ? 'element' : 'selected_area',
          tabId: tabId || 0,
          sourceUrl: selectionData?.sourceUrl || sender.tab?.url || '',
          sourceTitle: selectionData?.sourceTitle || sender.tab?.title || 'Captured Area',
          createdAt: Date.now(),
          status: 'editing',
          dataUrl: dataUrl,
          selectionRect: selectionData?.selectionRect,
        };

        try {
          // Store job in chrome.storage.session or local storage
          if (chrome.storage?.session) {
            await chrome.storage.session.set({ [jobId]: jobData });
          } else {
            await chrome.storage.local.set({ [jobId]: jobData });
          }
        } catch (e) {
          console.warn('Storage save fallback:', e);
        }

        const editorUrl = chrome.runtime.getURL(`screenshot-editor.html?jobId=${jobId}`);
        chrome.windows.create({
          url: editorUrl,
          type: 'popup',
          width: 1100,
          height: 750,
          focused: true,
        });
      });
      return true;
    }

    // Capture visible tab directly
    if (request.type === 'CAPTURE_VISIBLE_TAB') {
      chrome.tabs.captureVisibleTab(null, { format: 'png' }, async (dataUrl) => {
        if (chrome.runtime.lastError || !dataUrl) {
          sendResponse({ success: false, error: 'Capture failed' });
          return;
        }

        const jobId = 'job_' + Date.now();
        const jobData = {
          id: jobId,
          type: 'visible_page',
          sourceUrl: sender.tab?.url || request.data?.sourceUrl || '',
          sourceTitle: sender.tab?.title || request.data?.sourceTitle || 'Visible Webpage',
          createdAt: Date.now(),
          status: 'editing',
          dataUrl: dataUrl,
        };

        if (chrome.storage?.session) {
          await chrome.storage.session.set({ [jobId]: jobData });
        } else {
          await chrome.storage.local.set({ [jobId]: jobData });
        }

        const editorUrl = chrome.runtime.getURL(`screenshot-editor.html?jobId=${jobId}`);
        chrome.windows.create({
          url: editorUrl,
          type: 'popup',
          width: 1100,
          height: 750,
          focused: true,
        });

        sendResponse({ success: true, data: { jobId } });
      });
      return true;
    }
  });
}

export {};
