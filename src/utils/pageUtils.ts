/**
 * Page validation helper for Euclid Smart Clipper.
 * Validates whether a given URL is supported for capturing or annotating.
 */
export const PROTECTED_PAGE_ERROR_MESSAGE =
  "Euclid Smart Clipper cannot access this protected browser page. Open a regular webpage and try again.";

export function isSupportedPage(url?: string): boolean {
  if (!url) return false;

  const lowercaseUrl = url.toLowerCase().trim();

  // Must be http:// or https://
  if (!lowercaseUrl.startsWith('http://') && !lowercaseUrl.startsWith('https://')) {
    return false;
  }

  // Restricted pages (Chrome Web Store, internal chrome://, edge://, extension pages, internal error pages)
  if (
    lowercaseUrl.startsWith('https://chromewebstore.google.com/') ||
    lowercaseUrl.startsWith('https://chrome.google.com/webstore/') ||
    lowercaseUrl.startsWith('chrome://') ||
    lowercaseUrl.startsWith('chrome-extension://') ||
    lowercaseUrl.startsWith('edge://') ||
    lowercaseUrl.startsWith('about:')
  ) {
    return false;
  }

  return true;
}
