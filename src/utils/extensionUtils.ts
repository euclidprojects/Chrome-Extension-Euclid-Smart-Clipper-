import { isSupportedPage } from './pageUtils';

export function getCurrentExtensionId(): string {
  if (typeof chrome !== 'undefined' && chrome?.runtime?.id) {
    return chrome.runtime.id;
  }
  return '';
}

export function getCurrentExtensionOrigin(): string {
  const id = getCurrentExtensionId();
  return id ? `chrome-extension://${id}` : '';
}

export function checkExtensionIdMatch(): void {
  const actualExtensionId = getCurrentExtensionId();
  const expectedExtensionId =
    (import.meta.env.VITE_EXTENSION_ID as string) || "adgadgaalgjmkikplcdlnejpimmebgmm";

  if (actualExtensionId && expectedExtensionId && actualExtensionId !== expectedExtensionId) {
    console.warn("[Extension ID mismatch]", {
      expected: expectedExtensionId,
      actual: actualExtensionId
    });
  }
}

/**
 * Programmatically injects contentScript.js on demand after user gesture/action
 * if it is not already present on the target tab.
 */
export async function ensureContentScriptInTab(tabId: number): Promise<boolean> {
  if (typeof chrome === 'undefined' || !chrome.tabs) {
    return false;
  }

  try {
    const tab = await chrome.tabs.get(tabId);
    if (!tab || !tab.url || !isSupportedPage(tab.url)) {
      return false;
    }

    // Ping existing content script first to avoid duplicate listeners/injection
    const isAlive = await new Promise<boolean>((resolve) => {
      chrome.tabs.sendMessage(tabId, { type: 'PING_CONTENT_SCRIPT' }, (res) => {
        if (chrome.runtime.lastError || !res?.success) {
          resolve(false);
        } else {
          resolve(true);
        }
      });
    });

    if (isAlive) {
      return true;
    }

    if (!chrome.scripting) {
      return false;
    }

    // Inject contentScript.js dynamically using scripting API + activeTab
    await chrome.scripting.executeScript({
      target: { tabId },
      files: ['contentScript.js'],
    });

    return true;
  } catch (err) {
    console.warn('[ensureContentScriptInTab] Failed to inject content script into tab:', tabId, err);
    return false;
  }
}


