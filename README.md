# Euclid Smart Clipper

**Euclid Smart Clipper** is the official web-clipping, webpage-annotation, screenshot, recording, YouTube note-taking, and research companion for **Euclid Smart Notes**.

- **Euclid Smart Notes Web App:** [https://notes.app.euclidprojects.org/](https://notes.app.euclidprojects.org/)
- **Shared Firebase Project:** `euclid-projects`

---

## 🌟 Key Features

### 1. Web Clipping Modes
- **Simplified Article:** Clean article reader view powered by DOM article extraction and HTML-to-Markdown conversion. Removes ads, navigation menus, and clutter.
- **Full Article:** Saves the article with original media formatting.
- **Selected Text Clipping:** Captures highlighted selection, source URL, page title, and user notes.
- **Bookmark Clipping:** Saves title, URL, description, favicon, and user notes.
- **Image Clip & Code Clip:** Detects syntax formatting and programming languages.

### 2. Screenshot & Annotation Suite
- Capture visible area screenshots and full-page captures.
- Live Webpage & Screenshot Annotation Toolbar:
  - Text Highlighters in 6 colors (Yellow, Green, Blue, Red, Purple, Orange).
  - Freehand drawing pen, arrows, rectangles, circles, text boxes, and sticky notes.
  - Blur & Pixelation tool for sensitive details.
  - Saves both flattened images and editable JSON annotation objects.

### 3. YouTube & Video Note-Taking Workspace
- Deep watch-page integration for YouTube and HTML5 videos.
- Timestamps & Shortcuts:
  - `Alt + N`: Add timestamped note.
  - `Alt + B`: Create video bookmark.
  - `Alt + S`: Capture current video frame screenshot.
- Synchronized transcript search and clickable timestamp jump.
- Click any timestamp note in Euclid Smart Notes to open the video at that exact position (`https://www.youtube.com/watch?v={videoId}&t={seconds}s`).

### 4. Euclid ID Direct Integration
- Shared authentication with Euclid Smart Notes.
- Synchronizes directly into user notebooks, folders, and tags.
- Deep links directly to saved notes at `https://notes.app.euclidprojects.org/note/{noteId}`.
- Offline-first IndexedDB buffer with automatic two-way synchronization and conflict resolution.

---

## 🏗️ Architecture & Extension Output Structure

```
dist/
├── manifest.json              # Extension Manifest V3 configuration
├── popup.html                 # Main compact clipping extension popup
├── sidepanel.html             # Chrome Side Panel interface
├── index.html                 # Full-screen extension dashboard
├── service-worker.js          # Background service worker (bundled ESM)
├── contentScript.js           # Page injection & DOM extractor (bundled JS)
├── icons/
│   ├── icon16.png             # 16x16 PNG extension icon
│   ├── icon32.png             # 32x32 PNG extension icon
│   ├── icon48.png             # 48x48 PNG extension icon
│   ├── icon128.png            # 128x128 PNG extension icon
│   └── icon512.png           # 512x512 PNG extension icon
└── assets/                    # Bundled React application assets
```

---

## 🚀 How to Install and Load Unpacked Extension in Chrome

Follow these exact steps to build and load Euclid Smart Clipper into Google Chrome:

1. **Open the project folder** in your terminal or editor.
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Run the production build script:**
   ```bash
   npm run build
   ```
   *This automatically generates icon PNGs, bundles Vite app pages, compiles `service-worker.js` & `contentScript.js` with `esbuild`, copies `manifest.json`, and verifies all extension files via `scripts/verify-extension-build.mjs`.*

4. **Open Chrome Extensions Manager:**
   Navigate to `chrome://extensions` in your Google Chrome browser.

5. **Enable Developer Mode:**
   Toggle on the **Developer mode** switch in the upper-right corner of the `chrome://extensions` page.

6. **Click "Load unpacked":**
   Click the **Load unpacked** button in the top-left toolbar.

7. **Select the generated `dist` directory:**
   Navigate to the project directory and **select the `dist` folder** (NOT the parent folder or source folder).

8. **Confirm Successful Load:**
   Confirm that **Euclid Smart Clipper** appears with its official green-and-yellow icon, version `1.0.0`, and active background service worker without any red error buttons.

9. **Pin Extension:**
   Click the puzzle piece icon (Extensions menu) in Chrome's top bar and click the pin icon next to **Euclid Smart Clipper**.

---

## 🔧 Troubleshooting Common Extension Loading Errors

If Chrome shows an error when attempting to load the unpacked extension, consult the solutions below:

### 1. "Could not load manifest" or "Manifest file is missing or unreadable"
- **Cause:** You selected the parent directory or root source folder instead of the `dist` folder.
- **Fix:** In `chrome://extensions` -> **Load unpacked**, make sure you select the **`dist/`** directory. The `dist/` directory directly contains `manifest.json`.

### 2. "Nested Downloaded Folders"
- **Cause:** If you unzipped a downloaded archive, you may have nested folders like `Chrome-Extension-Euclid-Smart-Clipper--main/Chrome-Extension-Euclid-Smart-Clipper--main/`.
- **Fix:** Ensure you navigate into the innermost project root directory, run `npm run build`, and then select `dist/`.

### 3. "Could not load icon 'icons/icon16.png' specified in 'icons'"
- **Cause:** Missing PNG files, incorrect pathing, or capitalization mismatch.
- **Fix:** Run `npm run build` again. The build script automatically executes `node generate-pngs.js` to ensure `dist/icons/icon16.png`, `icon32.png`, `icon48.png`, and `icon128.png` are produced and verified.

### 4. "Service Worker registration failed"
- **Cause:** Service worker file missing or syntax error.
- **Fix:** Ensure `npm run build` completed cleanly. The verification script checks that `dist/service-worker.js` exists and is non-empty.

### 5. "Stale Build"
- **Cause:** Chrome is keeping a previously loaded broken build in memory.
- **Fix:** Go to `chrome://extensions`, click the **Reload** (circular arrow) icon on the Euclid Smart Clipper card, or remove the extension and re-click **Load unpacked** selecting `dist/`.

---

## 🔒 Security & Privacy
- **User Isolation:** All Firestore documents (`/Notes`, `/notebooks`, `/Folders`, `/Tags`, `/Users`) are scoped to the authenticated user's `UID`.
- **Firebase Security:** Configured with `firestore.rules` and `storage.rules`.
- Read details in `PRIVACY.md`.
