# Euclid Smart Clipper — Manual Testing Checklist

Follow this step-by-step checklist to test the unpacked **Euclid Smart Clipper** Chrome extension in Google Chrome.

---

## Step 1: Loading Unpacked Extension into Chrome
1. Open Google Chrome.
2. Navigate to `chrome://extensions`.
3. Enable **Developer mode** toggle in the upper right corner.
4. Click **Load unpacked**.
5. Select the `dist` directory in this project folder.
6. **Verify:**
   - Extension loads with name **Euclid Smart Clipper**.
   - Official icon displays clearly (16x16, 32x32, 48x48, 128x128).
   - No errors or warnings appear under the extension card.

---

## Step 2: Testing Extension Popup
1. Click the **Euclid Smart Clipper** icon in the Chrome toolbar.
2. **Verify Popup Dimensions:**
   - Popup opens at **460px width x 600px height**.
   - No horizontal scrollbars appear.
   - Text, buttons, and inputs are easily readable with clean padding.
3. **Test Mode Toggles:**
   - Click **Simplified Article** tile -> verify article content preview loads.
   - Click **Full Webpage** tile -> verify full DOM HTML is captured.
   - Click **Selected Text** tile -> verify highlighted text is placed into editor.
   - Click **Bookmark** tile -> verify page title and URL are populated.
   - Click **Screenshot** tile -> verify screenshot thumbnail displays.
   - Click **Video Notes** tile -> verify YouTube timestamp controls appear.
4. **Test Saving to Smart Notes:**
   - Select destination notebook or folder using dropdowns.
   - Click **Save to Euclid Smart Notes** button (`data-testid="save-smart-notes"`).
   - Verify green success notification badge appears.
   - Click **Open in Euclid Smart Notes** link -> verify it navigates to `https://notes.app.euclidprojects.org/`.

---

## Step 3: Testing Side Panel Workspace
1. In the extension popup, click **Side Panel** or right-click the toolbar icon and select **Open side panel**.
2. **Verify:**
   - Side panel opens smoothly in Chrome's side dock.
   - Layout expands dynamically to fill side panel height.
   - Clipping, notebook selection, and note saving work identical to popup.

---

## Step 4: Testing YouTube Video Notes
1. Navigate to any YouTube video page (e.g. `https://www.youtube.com/watch?v=fXfQfC1BvH8`).
2. Open the Clipper popup or side panel and select **Video Notes**.
3. Press <kbd>Alt</kbd> + <kbd>N</kbd> or click **Add Timestamp Note**.
4. Verify timestamp note card is created with current video time link.
5. Save note and verify clickable timestamp links jump to the exact video frame.

---

## Step 5: Testing Screenshot & Annotations
1. Open Clipper popup and select **Screenshot & Annotation**.
2. Select **Highlighter** tool and drag over image canvas -> verify yellow highlight is drawn.
3. Select **Arrow** tool and draw an arrow -> verify crisp vector line.
4. Select **Blur** tool -> verify confidential area is pixelated.
5. Click **Save Annotated Screenshot** -> verify saved in library.

---

## Step 6: Testing Context Menu Integration
1. Highlight text on any webpage.
2. Right-click the selected text.
3. Select **Clip Selection to Euclid Smart Notes** from Chrome context menu.
4. Verify extension opens with selection automatically pasted and saved.
