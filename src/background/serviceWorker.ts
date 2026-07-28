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
          id: 'euclid-webpage-annotation',
          title: 'Webpage Annotation',
          contexts: ['all'],
        });

        chrome.contextMenus.create({
          parentId: 'euclid-parent',
          id: 'euclid-screenshot',
          title: 'Screenshot',
          contexts: ['all'],
        });

        chrome.contextMenus.create({
          parentId: 'euclid-parent',
          id: 'euclid-youtube-note',
          title: 'YouTube Note',
          contexts: ['all'],
        });

        chrome.contextMenus.create({
          parentId: 'euclid-parent',
          id: 'euclid-bookmark',
          title: 'Bookmark',
          contexts: ['all'],
        });

        chrome.contextMenus.create({
          parentId: 'euclid-parent',
          id: 'euclid-full-page',
          title: 'Full Page',
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
  chrome.runtime.onMessage.addListener((request, _sender, sendResponse) => {
    if (request.type === 'PING_SERVICE_WORKER') {
      sendResponse({ success: true, data: { status: 'service_worker_active' } });
      return true;
    }
  });
}

export {};
