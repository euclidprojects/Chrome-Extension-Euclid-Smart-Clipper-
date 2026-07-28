/// <reference types="chrome"/>
// Background Service Worker for Euclid Smart Clipper

import { isSupportedPage } from '../utils/pageUtils';
import { auth, firebaseConfig } from '../lib/firebase';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth/web-extension';

const EXPECTED_EXTENSION_ID = "fhphlopkmeipmabplekkeepjakikijke";

if (typeof chrome !== 'undefined' && chrome?.runtime?.id) {
  if (chrome.runtime.id !== EXPECTED_EXTENSION_ID) {
    console.warn("Extension ID mismatch:", {
      current: chrome.runtime.id,
      expected: EXPECTED_EXTENSION_ID
    });
  }
}

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

  // Background Message Listener
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.type === 'PING_SERVICE_WORKER') {
      sendResponse({ success: true, data: { status: 'service_worker_active' } });
      return true;
    }

    if (request.type === 'EUCLID_GOOGLE_SIGN_IN' || request.type === 'GOOGLE_SIGN_IN_REQUEST') {
      handleGoogleSignInOffscreen()
        .then((res) => sendResponse(res))
        .catch((err) => sendResponse({
          success: false,
          error: err?.message || 'Google Sign-In returned invalid authentication data. Please try again.'
        }));
      return true;
    }

    if (request.type === 'START_SCREENSHOT_CAPTURE') {
      handleStartScreenshotCapture(request.payload)
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
    if (request.type === 'START_REGION_SELECTION' || request.type === 'start_region_selection') {
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
            }).catch((err) => {
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
    if (request.type === 'REGION_SELECTION_CONFIRMED' || request.type === 'ELEMENT_SELECTED') {
      const selectionData = request.data;
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
        }
        await chrome.storage?.local.set({ [jobId]: jobData });

        const editorUrl = chrome.runtime.getURL(`screenshot-editor.html?jobId=${jobId}`);
        createEditorWindow(editorUrl);

        sendResponse({ success: true, data: { jobId } });
      });
      return true;
    }

    if (request.type === 'OVERLAY_CANCELLED') {
      if (sender.tab?.id) {
        chrome.tabs.sendMessage(sender.tab.id, { type: 'CLEANUP_ACTIVE_OVERLAY' }).catch(() => {});
      }
      sendResponse({ success: true });
      return true;
    }
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

  async function hasOffscreenDocument(): Promise<boolean> {
    if (typeof chrome === 'undefined') return false;
    // @ts-ignore
    if ('getContexts' in chrome.runtime) {
      // @ts-ignore
      const contexts = await chrome.runtime.getContexts({
        contextTypes: ['OFFSCREEN_DOCUMENT'],
      });
      return contexts.length > 0;
    }
    if (chrome.offscreen && 'hasDocument' in chrome.offscreen) {
      // @ts-ignore
      return await chrome.offscreen.hasDocument();
    }
    return false;
  }

  interface OffscreenGoogleAuthResponse {
    success: boolean;
    idToken?: string;
    accessToken?: string;
    user?: {
      uid: string;
      email: string | null;
      displayName: string | null;
      photoURL: string | null;
    };
    error?: {
      code?: string;
      message?: string;
    } | string;
  }

  async function handleGoogleSignInOffscreen(): Promise<{ success: boolean; user?: any; error?: string }> {
    console.info("[Auth Debug] Calling function", {
      functionName: "handleGoogleSignInOffscreen",
      authExists: Boolean(auth),
      appExists: true,
      projectId: firebaseConfig?.projectId || "euclid-projects",
      hasRequiredArguments: true
    });

    if (!chrome.offscreen) {
      return { success: false, error: 'Offscreen API not supported' };
    }

    try {
      const hasDoc = await hasOffscreenDocument();
      if (!hasDoc) {
        await chrome.offscreen.createDocument({
          url: 'offscreen.html',
          reasons: [(chrome.offscreen.Reason as any)?.IFRAME_SCRIPTING || 'IFRAME_SCRIPTING'],
          justification: 'Complete Firebase Google authentication using a hosted authentication page.',
        });
      }

      const response = await new Promise<OffscreenGoogleAuthResponse | null>((resolve) => {
        chrome.runtime.sendMessage({ type: 'EUCLID_GOOGLE_SIGN_IN' }, (res) => {
          if (chrome.runtime.lastError) {
            console.error("[Auth Debug] Firebase failure", {
              code: 'CHROME_RUNTIME_ERROR',
              message: chrome.runtime.lastError.message,
              name: 'ChromeRuntimeError',
              context: 'background'
            });
            resolve({
              success: false,
              error: {
                code: 'CHROME_RUNTIME_ERROR',
                message: chrome.runtime.lastError.message || 'Offscreen document messaging failed.'
              }
            });
          } else {
            resolve(res || null);
          }
        });
      });

      if (!response) {
        throw new Error("The offscreen authentication page returned no response.");
      }

      if (!response.success) {
        const rawErr = response.error;
        const errMsg = typeof rawErr === 'object' ? rawErr?.message : typeof rawErr === 'string' ? rawErr : 'Google authentication failed.';
        throw new Error(errMsg || "Google authentication failed.");
      }

      const idToken = typeof response.idToken === "string" && response.idToken.trim() ? response.idToken.trim() : undefined;
      const accessToken = typeof response.accessToken === "string" && response.accessToken.trim() ? response.accessToken.trim() : undefined;

      console.info("[Google Auth] Offscreen response received:", {
        responseExists: Boolean(response),
        success: response?.success,
        hasIdToken: typeof response?.idToken === "string" && response.idToken.length > 0,
        hasAccessToken: typeof response?.accessToken === "string" && response.accessToken.length > 0,
        hasUser: Boolean(response?.user)
      });

      if (idToken || accessToken) {
        console.info("[Google Auth] Creating credential:", {
          authExists: Boolean(auth),
          hasIdToken: Boolean(idToken),
          hasAccessToken: Boolean(accessToken)
        });

        if (!auth) {
          throw new Error("Firebase Auth instance is missing.");
        }

        const credential = GoogleAuthProvider.credential(idToken, accessToken);
        const userCredential = await signInWithCredential(auth, credential);
        return {
          success: true,
          user: {
            uid: userCredential.user.uid,
            email: userCredential.user.email,
            displayName: userCredential.user.displayName,
            photoURL: userCredential.user.photoURL,
          }
        };
      } else if (response.user && response.user.uid) {
        return {
          success: true,
          user: response.user
        };
      } else {
        throw new Error("Google authentication returned no valid ID token or access token.");
      }
    } catch (err: any) {
      console.error("[Google Auth] Failure:", {
        code: err?.code || 'GOOGLE_AUTH_ERROR',
        message: err?.message,
        stack: err?.stack,
        function: "handleGoogleSignInOffscreen"
      });
      return {
        success: false,
        error: err?.message || "Google Sign-In returned invalid authentication data. Please try again."
      };
    }
  }
}

export {};
