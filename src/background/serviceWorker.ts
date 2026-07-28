/// <reference types="chrome"/>
// Background Service Worker for Euclid Smart Clipper

import { isSupportedPage } from '../utils/pageUtils';
import { auth } from '../lib/firebase';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth/web-extension';
import { getCurrentExtensionOrigin } from '../utils/extensionUtils';
import { AuthMessages } from '../constants/auth';

console.info("[Background] Service worker loaded", {
  extensionId: typeof chrome !== 'undefined' && chrome?.runtime ? chrome.runtime.id : '',
  timestamp: new Date().toISOString()
});

console.info("[Service Worker] Euclid Smart Clipper worker loaded", {
  extensionId: typeof chrome !== 'undefined' && chrome?.runtime ? chrome.runtime.id : '',
  time: new Date().toISOString()
});

if (typeof chrome !== 'undefined' && chrome?.runtime?.id) {
  console.info(
    "Confirm this origin is registered in Firebase Authorized Domains:",
    getCurrentExtensionOrigin()
  );
}

// ---------------------------------------------------------------------------
// Offscreen Document & Google Authentication Logic
// ---------------------------------------------------------------------------
const OFFSCREEN_PATH = "offscreen.html";
let creatingOffscreen: Promise<void> | null = null;

async function ensureOffscreenDocument(): Promise<void> {
  console.info("[Background] Creating offscreen document");
  console.info("[Google Auth] 3. Preparing offscreen document");

  const offscreenUrl = chrome.runtime.getURL(OFFSCREEN_PATH);

  if (typeof chrome !== 'undefined' && chrome.runtime && 'getContexts' in chrome.runtime) {
    // @ts-ignore
    const contexts = await chrome.runtime.getContexts({
      contextTypes: ['OFFSCREEN_DOCUMENT'],
      documentUrls: [offscreenUrl],
    });
    if (contexts.length > 0) {
      console.info("[Background] Offscreen document ready");
      console.info("[Google Auth] 4. Offscreen document ready");
      return;
    }
  } else if (chrome.offscreen && 'hasDocument' in chrome.offscreen) {
    // @ts-ignore
    if (await chrome.offscreen.hasDocument()) {
      console.info("[Background] Offscreen document ready");
      console.info("[Google Auth] 4. Offscreen document ready");
      return;
    }
  }

  if (!creatingOffscreen) {
    creatingOffscreen = chrome.offscreen.createDocument({
      url: OFFSCREEN_PATH,
      reasons: [(chrome.offscreen.Reason as any)?.IFRAME_SCRIPTING || 'IFRAME_SCRIPTING'],
      justification: 'Use the hosted Firebase authentication page for Google sign-in.',
    }).finally(() => {
      creatingOffscreen = null;
    });
  }

  await creatingOffscreen;
  console.info("[Background] Offscreen document ready");
  console.info("[Google Auth] 4. Offscreen document ready");
}

async function handleGoogleSignIn(): Promise<{ success: boolean; user?: any; idToken?: string; error?: any }> {
  if (!chrome.offscreen) {
    throw new Error('Offscreen API is not supported in this browser environment.');
  }

  await ensureOffscreenDocument();

  console.info("[Background] Sending auth request to offscreen");
  console.info("[Google Auth] 5. Sending request to offscreen document");

  const response = await new Promise<any>((resolve) => {
    chrome.runtime.sendMessage(
      {
        target: 'offscreen',
        type: 'FIREBASE_GOOGLE_SIGN_IN'
      },
      (res) => {
        if (chrome.runtime.lastError) {
          console.error('[Google Auth] Offscreen runtime error:', chrome.runtime.lastError.message);
          resolve({
            success: false,
            error: {
              code: 'CHROME_RUNTIME_ERROR',
              message: chrome.runtime.lastError.message || 'The offscreen authentication document returned no response.'
            }
          });
        } else {
          resolve(res);
        }
      }
    );
  });

  if (!response) {
    throw new Error('The offscreen authentication document returned no response.');
  }

  if (!response.success) {
    const rawErr = response.error;
    const errMsg = typeof rawErr === 'object' ? rawErr?.message : typeof rawErr === 'string' ? rawErr : 'Google authentication failed.';
    const err = new Error(errMsg || 'Google authentication failed.');
    (err as any).code = typeof rawErr === 'object' ? rawErr?.code : 'auth/offscreen-error';
    throw err;
  }

  if (response.idToken && auth) {
    try {
      const credential = GoogleAuthProvider.credential(response.idToken);
      await signInWithCredential(auth, credential);
    } catch (e) {
      console.warn('[Background] Firebase extension signInWithCredential warning:', e);
    }
  }

  return response;
}

// ---------------------------------------------------------------------------
// Context Menu & Extension Lifecycle Setup
// ---------------------------------------------------------------------------
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

  // Clean up overlays on tab change / tab update
  if (chrome.tabs?.onActivated) {
    chrome.tabs.onActivated.addListener((activeInfo) => {
      if (activeInfo.tabId) {
        chrome.tabs.sendMessage(activeInfo.tabId, { type: 'CLEANUP_ACTIVE_OVERLAY' }).catch(() => {});
      }
    });
  }

  if (chrome.tabs?.onUpdated) {
    chrome.tabs.onUpdated.addListener((tabId, changeInfo) => {
      if (changeInfo.status === 'loading' || changeInfo.url) {
        chrome.tabs.sendMessage(tabId, { type: 'CLEANUP_ACTIVE_OVERLAY' }).catch(() => {});
      }
    });
  }

  // Handle Context Menu Item Clicks
  if (chrome.contextMenus) {
    chrome.contextMenus.onClicked.addListener((info, tab) => {
      if (!tab || !tab.id) return;

      if (!isSupportedPage(tab.url)) {
        return;
      }

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
      }).catch(() => {});
    });
  }

  // Keyboard Command Listener
  if (chrome.commands?.onCommand) {
    chrome.commands.onCommand.addListener((command) => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0]?.id && isSupportedPage(tabs[0].url)) {
          chrome.tabs.sendMessage(tabs[0].id, {
            type: 'COMMAND_TRIGGERED',
            action: `command_${command}`
          }).catch(() => {});
        }
      });
    });
  }
}

// Helper to open screenshot editor in responsive desktop window
const createEditorWindow = async (editorUrl: string) => {
  let targetWidth = 1200;
  let targetHeight = 850;

  try {
    if (chrome.system?.display) {
      const displays = await chrome.system.display.getInfo();
      const primary = displays.find((d) => d.isPrimary) || displays[0];
      if (primary && primary.workArea) {
        targetWidth = Math.max(760, Math.min(1200, primary.workArea.width - 40));
        targetHeight = Math.max(560, Math.min(850, primary.workArea.height - 40));
      }
    }
  } catch (e) {
    // Fallback default
  }

  return chrome.windows.create({
    url: editorUrl,
    type: 'popup',
    width: targetWidth,
    height: targetHeight,
    focused: true,
  });
};

// ---------------------------------------------------------------------------
// Primary Top-Level Background Message Listener
// ---------------------------------------------------------------------------
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (!message || typeof message !== "object") {
    return false;
  }

  // Ignore messages targeted specifically for offscreen document
  if (message.target === "offscreen") {
    return false;
  }

  console.info("[Background] Message received", {
    type: message?.type,
    target: message?.target,
    senderId: sender?.id
  });

  if (
    message.type === "PING_BACKGROUND" ||
    message.type === "SERVICE_WORKER_PING" ||
    message.type === "PING_SERVICE_WORKER" ||
    message.type === AuthMessages.SERVICE_WORKER_PING ||
    message.type === AuthMessages.PING_BACKGROUND
  ) {
    sendResponse({
      success: true,
      status: "alive",
      message: "SERVICE_WORKER_PONG",
      extensionId: chrome.runtime.id,
      data: { status: "service_worker_active" }
    });
    return false;
  }

  if (
    message.type === "GOOGLE_SIGN_IN" ||
    message.type === "START_GOOGLE_SIGN_IN" ||
    message.type === AuthMessages.START_GOOGLE_SIGN_IN ||
    message.type === AuthMessages.GOOGLE_SIGN_IN ||
    message.type === "EUCLID_GOOGLE_SIGN_IN" ||
    message.type === "GOOGLE_SIGN_IN_REQUEST"
  ) {
    console.info("[Background] GOOGLE_SIGN_IN received");
    console.info("[Google Auth] 2. Service worker received request");

    handleGoogleSignIn()
      .then((result) => {
        console.info("[Background] Authentication response received", result);
        sendResponse({
          success: true,
          user: result.user,
          idToken: result.idToken,
          result: result
        });
      })
      .catch((error) => {
        console.error("[Background Google Auth Error]", error);

        sendResponse({
          success: false,
          error: {
            code: error?.code || "auth/unknown-error",
            message: error?.message || String(error)
          }
        });
      });

    // Exact literal true required to keep channel open for async response
    return true;
  }

  if (message.type === 'START_SCREENSHOT_CAPTURE') {
    handleStartScreenshotCapture(message.payload)
      .then((result) => sendResponse(result))
      .catch((error) =>
        sendResponse({
          success: false,
          error: error instanceof Error ? error.message : 'Screenshot capture failed.',
        })
      );
    return true;
  }

  // Trigger Region Selection on active tab
  if (message.type === 'START_REGION_SELECTION' || message.type === 'start_region_selection') {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const tab = tabs[0];
      if (!tab || !tab.id) {
        sendResponse({ success: false, error: 'No active tab found' });
        return;
      }

      if (!isSupportedPage(tab.url)) {
        sendResponse({
          success: false,
          error: "This page cannot be captured or annotated because Chrome does not allow extensions to access it."
        });
        return;
      }

      chrome.tabs.sendMessage(tab.id, { type: 'START_REGION_SELECTION' }, (response) => {
        if (chrome.runtime.lastError) {
          chrome.scripting.executeScript({
            target: { tabId: tab.id! },
            files: ['contentScript.js'],
          }).then(() => {
            chrome.tabs.sendMessage(tab.id!, { type: 'START_REGION_SELECTION' }, (res2) => {
              sendResponse(res2 || { success: true });
            });
          }).catch(() => {
            sendResponse({
              success: false,
              error: "This page cannot be captured or annotated because Chrome does not allow extensions to access it."
            });
          });
        } else {
          sendResponse(response || { success: true });
        }
      });
    });
    return true;
  }

  // Region selection confirmed -> capture visible tab -> save job -> open editor window
  if (message.type === 'REGION_SELECTION_CONFIRMED' || message.type === 'ELEMENT_SELECTED') {
    const selectionData = message.data;
    const tabId = sender.tab?.id;

    if (tabId) {
      chrome.tabs.sendMessage(tabId, { type: 'CLEANUP_ACTIVE_OVERLAY' }).catch(() => {});
    }

    chrome.tabs.captureVisibleTab(null, { format: 'png' }, async (dataUrl) => {
      if (chrome.runtime.lastError || !dataUrl) {
        console.error('Failed to capture visible tab:', chrome.runtime.lastError);
        return;
      }

      const jobId = 'job_' + Date.now();
      const jobData = {
        id: jobId,
        type: message.type === 'ELEMENT_SELECTED' ? 'element' : 'selected_area',
        tabId: tabId || 0,
        sourceUrl: selectionData?.sourceUrl || sender.tab?.url || '',
        sourceTitle: selectionData?.sourceTitle || sender.tab?.title || 'Captured Area',
        createdAt: Date.now(),
        status: 'editing',
        dataUrl: dataUrl,
        selectionRect: selectionData?.selectionRect,
      };

      try {
        if (chrome.storage?.session) {
          await chrome.storage.session.set({ [jobId]: jobData });
        }
        await chrome.storage?.local.set({ [jobId]: jobData });
      } catch (e) {
        console.warn('Storage save fallback:', e);
      }

      const editorUrl = chrome.runtime.getURL(`screenshot-editor.html?jobId=${jobId}`);
      createEditorWindow(editorUrl);
    });
    return true;
  }

  // Capture visible tab directly
  if (message.type === 'CAPTURE_VISIBLE_TAB') {
    chrome.tabs.captureVisibleTab(null, { format: 'png' }, async (dataUrl) => {
      if (chrome.runtime.lastError || !dataUrl) {
        sendResponse({ success: false, error: 'Capture failed' });
        return;
      }

      const jobId = 'job_' + Date.now();
      const jobData = {
        id: jobId,
        type: 'visible_page',
        sourceUrl: sender.tab?.url || message.data?.sourceUrl || '',
        sourceTitle: sender.tab?.title || message.data?.sourceTitle || 'Visible Webpage',
        createdAt: Date.now(),
        status: 'editing',
        dataUrl: dataUrl,
      };

      if (chrome.storage?.session) {
        await chrome.storage.session.set({ [jobId]: jobData });
      }
      await chrome.storage?.local.set({ [jobId]: jobData });

      const editorUrl = chrome.runtime.getURL(`screenshot-editor.html?jobId=${jobId}`);
      createEditorWindow(editorUrl);

      sendResponse({ success: true, data: { jobId } });
    });
    return true;
  }

  if (message.type === 'OVERLAY_CANCELLED') {
    if (sender.tab?.id) {
      chrome.tabs.sendMessage(sender.tab.id, { type: 'CLEANUP_ACTIVE_OVERLAY' }).catch(() => {});
    }
    sendResponse({ success: true });
    return true;
  }

  return false;
});

async function handleStartScreenshotCapture(payload: {
  jobId: string;
  mode: string;
  tabId: number;
  sourceUrl: string;
  sourceTitle: string;
}): Promise<{ success: boolean; jobId?: string; error?: string }> {
  const { jobId, mode, tabId, sourceUrl, sourceTitle } = payload;

  if (!tabId) {
    return { success: false, error: 'The active tab could not be detected.' };
  }

  let tab: any;
  try {
    tab = await chrome.tabs.get(tabId);
  } catch (e) {
    return { success: false, error: 'The active tab could not be detected.' };
  }

  const url = tab.url || sourceUrl || '';
  if (!isSupportedPage(url)) {
    return {
      success: false,
      error: "This page cannot be captured or annotated because Chrome does not allow extensions to access it."
    };
  }

  const ensureContentScript = async (): Promise<boolean> => {
    try {
      const pong = await new Promise((res) => {
        chrome.tabs.sendMessage(tabId, { type: 'PING_CONTENT_SCRIPT' }, (response) => {
          if (chrome.runtime.lastError || !response?.success) {
            res(false);
          } else {
            res(true);
          }
        });
      });
      if (pong) return true;

      await chrome.scripting.executeScript({
        target: { tabId },
        files: ['contentScript.js'],
      });
      return true;
    } catch (err) {
      return false;
    }
  };

  if (mode === 'visible_area') {
    return new Promise((resolve) => {
      chrome.tabs.captureVisibleTab(tab.windowId || null, { format: 'png' }, async (dataUrl) => {
        if (chrome.runtime.lastError || !dataUrl) {
          resolve({
            success: false,
            error: chrome.runtime.lastError?.message || 'Failed to capture visible area.',
          });
          return;
        }

        const jobData = {
          id: jobId,
          type: 'visible_page',
          tabId,
          sourceUrl: url,
          sourceTitle: tab.title || sourceTitle || 'Visible Webpage',
          createdAt: Date.now(),
          status: 'editing',
          dataUrl,
        };

        try {
          if (chrome.storage?.session) {
            await chrome.storage.session.set({ [jobId]: jobData });
          }
          await chrome.storage?.local.set({ [jobId]: jobData });
        } catch (e) {
          console.warn('Storage save warning:', e);
        }

        const editorUrl = chrome.runtime.getURL(`screenshot-editor.html?jobId=${jobId}`);
        createEditorWindow(editorUrl);

        resolve({ success: true, jobId });
      });
    });
  }

  if (mode === 'selected_area') {
    const csReady = await ensureContentScript();
    if (!csReady) {
      return {
        success: false,
        error: "This page cannot be captured or annotated because Chrome does not allow extensions to access it."
      };
    }

    return new Promise((resolve) => {
      chrome.tabs.sendMessage(tabId, { type: 'START_REGION_SELECTION' }, (response) => {
        if (chrome.runtime.lastError || (response && !response.success)) {
          resolve({
            success: false,
            error: response?.error || "This page cannot be captured or annotated because Chrome does not allow extensions to access it.",
          });
        } else {
          resolve({ success: true, jobId });
        }
      });
    });
  }

  if (mode === 'element') {
    const csReady = await ensureContentScript();
    if (!csReady) {
      return {
        success: false,
        error: "This page cannot be captured or annotated because Chrome does not allow extensions to access it."
      };
    }

    return new Promise((resolve) => {
      chrome.tabs.sendMessage(tabId, { type: 'START_ELEMENT_SELECTION' }, (response) => {
        if (chrome.runtime.lastError || (response && !response.success)) {
          resolve({
            success: false,
            error: response?.error || 'Element selection could not start.',
          });
        } else {
          resolve({ success: true, jobId });
        }
      });
    });
  }

  if (mode === 'video_frame') {
    const csReady = await ensureContentScript();
    if (!csReady) {
      return { success: false, error: 'No supported video was detected.' };
    }

    return new Promise((resolve) => {
      chrome.tabs.sendMessage(tabId, { type: 'GET_VIDEO_TIMESTAMP' }, async (response) => {
        if (chrome.runtime.lastError || !response || !response.success || !response.data) {
          resolve({ success: false, error: 'No supported video was detected.' });
          return;
        }

        const videoData = response.data;
        chrome.tabs.captureVisibleTab(tab.windowId || null, { format: 'png' }, async (dataUrl) => {
          const finalDataUrl = videoData.frameDataUrl || dataUrl;
          if (!finalDataUrl) {
            resolve({ success: false, error: 'Failed to capture video frame.' });
            return;
          }

          const jobData = {
            id: jobId,
            type: 'video_frame',
            tabId,
            sourceUrl: url,
            sourceTitle: videoData.videoTitle || tab.title || sourceTitle,
            createdAt: Date.now(),
            status: 'editing',
            dataUrl: finalDataUrl,
            videoTimestamp: videoData.currentTime,
            formattedVideoTime: videoData.formattedTime,
          };

          try {
            if (chrome.storage?.session) {
              await chrome.storage.session.set({ [jobId]: jobData });
            }
            await chrome.storage?.local.set({ [jobId]: jobData });
          } catch (e) {
            console.warn('Storage save warning:', e);
          }

          const editorUrl = chrome.runtime.getURL(`screenshot-editor.html?jobId=${jobId}`);
          createEditorWindow(editorUrl);

          resolve({ success: true, jobId });
        });
      });
    });
  }

  if (mode === 'full_page') {
    return new Promise((resolve) => {
      chrome.tabs.captureVisibleTab(tab.windowId || null, { format: 'png' }, async (dataUrl) => {
        if (chrome.runtime.lastError || !dataUrl) {
          resolve({
            success: false,
            error: chrome.runtime.lastError?.message || 'Failed to capture full page.',
          });
          return;
        }

        const jobData = {
          id: jobId,
          type: 'full_page',
          tabId,
          sourceUrl: url,
          sourceTitle: tab.title || sourceTitle || 'Full Page Capture',
          createdAt: Date.now(),
          status: 'editing',
          dataUrl,
        };

        try {
          if (chrome.storage?.session) {
            await chrome.storage.session.set({ [jobId]: jobData });
          }
          await chrome.storage?.local.set({ [jobId]: jobData });
        } catch (e) {
          console.warn('Storage save warning:', e);
        }

        const editorUrl = chrome.runtime.getURL(`screenshot-editor.html?jobId=${jobId}`);
        createEditorWindow(editorUrl);

        resolve({ success: true, jobId });
      });
    });
  }

  return { success: false, error: 'Unknown screenshot mode.' };
}

export {};
