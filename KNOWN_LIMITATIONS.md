# Euclid Smart Clipper — Known Technical & Browser Limitations

This document lists expected technical behavior and platform constraints inherent to Google Chrome Manifest V3 extensions, sandboxed preview environments, and cloud backend integrations.

---

## 1. Chrome Manifest V3 Security & API Constraints

### `chrome.sidePanel.open` Requires User Gesture
- **Constraint:** Chrome V3 API rules dictate that opening the side panel programmatically via `chrome.sidePanel.open({ tabId })` can only be invoked directly within an active user gesture (e.g. clicking a button).
- **Fallback Handling:** If triggered outside a user gesture, the extension falls back seamlessly to rendering the Side Panel interface view directly within the active extension container.

### Context Menu Injection Target Restrictions
- **Constraint:** Chrome context menus cannot inject content scripts into restricted Chrome internal URLs (such as `chrome://extensions`, `chrome://settings`, `chrome://history`, or Chrome Web Store pages).
- **Expected Behavior:** Extension handles restricted pages gracefully without throwing uncaught console errors.

---

## 2. iFrame & Web App Authentication Behavior

### Google OAuth Popup in iFrame Previews
- **Constraint:** Third-party OAuth popups and Google Sign-In popups are blocked inside standard sandboxed `<iframe>` tags without `allow-popups` permission.
- **Fallback Handling:** Direct Firebase email/password and guest token authentication are supported natively. When running inside the official Chrome Extension environment (`chrome-extension://...`), full Google popup auth works as standard.

---

## 3. Video Timestamping & DRM Video Restrictions

### Encrypted Stream Canvas Capture
- **Constraint:** Certain DRM-protected video streams (such as Netflix or DRM-encrypted YouTube Movies) restrict HTML5 Canvas `getImageData()` or `toDataURL()` frame capture due to browser DRM policies.
- **Fallback Handling:** For DRM-restricted streams, the Clipper captures the exact video timestamp and metadata with placeholder visual cards, preserving link integrity.
