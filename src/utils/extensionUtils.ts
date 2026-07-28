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

