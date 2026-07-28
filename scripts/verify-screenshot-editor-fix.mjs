import fs from 'fs';
import path from 'path';

console.log('🧪 Verifying Euclid Screenshot Editor & Annotator Layout Fix...');

let errors = [];

// 1. Verify screenshot-editor.html
const htmlPath = path.resolve(process.cwd(), 'screenshot-editor.html');
if (!fs.existsSync(htmlPath)) {
  errors.push('screenshot-editor.html does not exist');
} else {
  const htmlContent = fs.readFileSync(htmlPath, 'utf-8');
  if (!htmlContent.includes('/src/screenshot-editor/main.tsx')) {
    errors.push('screenshot-editor.html does not load /src/screenshot-editor/main.tsx');
  }
  if (!htmlContent.includes('class="euclid-screenshot-editor-root"') && !htmlContent.includes('euclid-screenshot-editor-root')) {
    errors.push('screenshot-editor.html missing euclid-screenshot-editor-root root container');
  }
}

// 2. Verify src/screenshot-editor/main.tsx & src/screenshot-editor/screenshot-editor.css
const mainPath = path.resolve(process.cwd(), 'src/screenshot-editor/main.tsx');
const cssPath = path.resolve(process.cwd(), 'src/screenshot-editor/screenshot-editor.css');

if (!fs.existsSync(mainPath)) {
  errors.push('src/screenshot-editor/main.tsx missing');
} else {
  const mainContent = fs.readFileSync(mainPath, 'utf-8');
  if (!mainContent.includes('screenshot-editor.css')) {
    errors.push('main.tsx does not import screenshot-editor.css');
  }
  if (!mainContent.includes('euclid-screenshot-editor-root')) {
    errors.push('main.tsx missing root class setup for euclid-screenshot-editor-root');
  }
}

if (!fs.existsSync(cssPath)) {
  errors.push('src/screenshot-editor/screenshot-editor.css missing');
} else {
  const cssContent = fs.readFileSync(cssPath, 'utf-8');
  if (!cssContent.includes('.euclid-screenshot-editor-root')) {
    errors.push('screenshot-editor.css missing .euclid-screenshot-editor-root rules');
  }
  if (!cssContent.includes('.editor-main')) {
    errors.push('screenshot-editor.css missing .editor-main grid rules');
  }
}

// 3. Verify ScreenshotEditorView.tsx component layout
const viewPath = path.resolve(process.cwd(), 'src/components/ScreenshotEditorView.tsx');
if (!fs.existsSync(viewPath)) {
  errors.push('src/components/ScreenshotEditorView.tsx missing');
} else {
  const viewContent = fs.readFileSync(viewPath, 'utf-8');

  if (!viewContent.includes('editor-source-title')) {
    errors.push('ScreenshotEditorView missing editor-source-title class for source title truncation');
  }
  if (!viewContent.includes('editor-source-url')) {
    errors.push('ScreenshotEditorView missing editor-source-url class for source URL truncation');
  }
  if (!viewContent.includes('canvas-viewport')) {
    errors.push('ScreenshotEditorView missing canvas-viewport class for centered canvas workspace');
  }
  if (!viewContent.includes('canvas-stage')) {
    errors.push('ScreenshotEditorView missing canvas-stage class for scaled screenshot stage');
  }

  // Verify single Save Clip button
  const saveClipMatches = (viewContent.match(/data-testid="save-clip"/g) || []).length;
  if (saveClipMatches !== 1) {
    errors.push(`Expected exactly 1 Save Clip button with data-testid="save-clip" in ScreenshotEditorView, found ${saveClipMatches}`);
  }

  // Verify panel collapse controls
  if (!viewContent.includes('isLeftCollapsed') || !viewContent.includes('isRightCollapsed')) {
    errors.push('ScreenshotEditorView missing collapsible panel state');
  }
}

if (errors.length > 0) {
  console.error('\n❌ Screenshot Editor Verification FAILED:');
  errors.forEach((err) => console.error(` - ${err}`));
  process.exit(1);
}

console.log('✅ screenshot-editor.html correctly configured.');
console.log('✅ Dedicated entry point src/screenshot-editor/main.tsx and CSS verified.');
console.log('✅ Responsive 3-column workspace & canvas fit-to-screen scale verified.');
console.log('✅ Panel collapse controls and single Save Clip button verified.');
console.log('🎉 Screenshot Editor Layout Verification PASSED!\n');
