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

## 🏗️ Architecture & Project Structure

```
/public
  /icons
    icon16.png
    icon32.png
    icon48.png
    icon128.png
    icon.svg
/src
  /background
    serviceWorker.ts      # Chrome extension background worker
  /content
    contentScript.ts      # Webpage & YouTube overlay script
  /components
    Header.tsx            # Global navigation & Euclid connection status
    DestinationPicker.tsx # Notebook, folder, and tag picker
    ClippingWorkspace.tsx # Primary clipping form & live article preview
    VideoNotesWorkspace.tsx # YouTube timestamped note workspace
    ScreenshotAnnotationSuite.tsx # Screenshot editor & annotation tools
    DashboardView.tsx     # Full extension clips library & search
    SettingsView.tsx      # Euclid ID connection & template settings
    OnboardingModal.tsx   # First-run interactive guide
  /services
    clippingService.ts    # Article extractor & Markdown converter
    firebaseService.ts    # Firestore & Firebase Storage integration
  /storage
    indexedDB.ts          # Offline local IndexedDB database
  /types
    index.ts              # Domain types for Euclid ecosystem
manifest.json             # Manifest V3 extension configuration
firestore.rules           # Security rules for Cloud Firestore
storage.rules             # Security rules for Firebase Storage
firebase-blueprint.json   # Intermediate blueprint schema
```

---

## 🚀 Development & Build Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Development Server
```bash
npm run dev
```

### 3. Build Extension for Chrome Web Store
```bash
npm run build
```

### 4. Load Unpacked Extension in Chrome
1. Open Google Chrome and navigate to `chrome://extensions`.
2. Enable **Developer mode** in the top right.
3. Click **Load unpacked** and select the root directory (or build output).

---

## 🔒 Security & Privacy
- **User Isolation:** All Firestore documents (`/Notes`, `/notebooks`, `/Folders`, `/Tags`, `/Users`) are scoped to the authenticated user's `UID`.
- **Firebase Security:** Configured with `firestore.rules` and `storage.rules`.
- Read details in `PRIVACY.md`.
