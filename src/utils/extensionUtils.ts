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
