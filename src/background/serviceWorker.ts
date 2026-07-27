// Background Service Worker for Euclid Smart Clipper

// Context Menu Initialization
if (typeof chrome !== 'undefined' && chrome.runtime && chrome.contextMenus) {
  chrome.runtime.onInstalled.addListener(() => {
    chrome.contextMenus.create({
      id: 'euclid-parent',
      title: 'Euclid Smart Clipper',
      contexts: ['all'],
    });

    chrome.contextMenus.create({
      parentId: 'euclid-parent',
      id: 'euclid-clip-article',
      title: 'Clip Simplified Article',
      contexts: ['page'],
    });

    chrome.contextMenus.create({
      parentId: 'euclid-parent',
      id: 'euclid-clip-selection',
      title: 'Clip Selected Text',
      contexts: ['selection'],
    });

    chrome.contextMenus.create({
      parentId: 'euclid-parent',
      id: 'euclid-clip-image',
      title: 'Clip Image to Smart Notes',
      contexts: ['image'],
    });

    chrome.contextMenus.create({
      parentId: 'euclid-parent',
      id: 'euclid-save-bookmark',
      title: 'Save Bookmark',
      contexts: ['page', 'link'],
    });

    chrome.contextMenus.create({
      parentId: 'euclid-parent',
      id: 'euclid-capture-screenshot',
      title: 'Capture Visible Screenshot',
      contexts: ['all'],
    });

    chrome.contextMenus.create({
      parentId: 'euclid-parent',
      id: 'euclid-open-sidepanel',
      title: 'Open Side Panel',
      contexts: ['all'],
    });
  });

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
      action: info.menuItemId,
      selectionText: info.selectionText,
      srcUrl: info.srcUrl,
      pageUrl: info.pageUrl || tab.url,
      pageTitle: tab.title,
    });
  });

  // Keyboard Command Listener
  chrome.commands?.onCommand?.addListener((command) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.id) {
        chrome.tabs.sendMessage(tabs[0].id, { action: `command_${command}` });
      }
    });
  });
}

export {};
