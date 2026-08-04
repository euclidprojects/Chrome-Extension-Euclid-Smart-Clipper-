console.info("[Offscreen] Offscreen document loaded");

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.target === "offscreen" && message?.type === "PING_OFFSCREEN") {
    sendResponse({ success: true });
    return true;
  }
  return false;
});
