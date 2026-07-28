import fs from 'fs';
import path from 'path';

console.log('🧪 Verifying Euclid Toolbar Popup Fix Requirements...');

let errors = [];

const popupHtmlPath = path.resolve(process.cwd(), 'popup.html');
const popupMainPath = path.resolve(process.cwd(), 'src/popup/main.tsx');
const popupAppPath = path.resolve(process.cwd(), 'src/popup/PopupApp.tsx');
const popupCssPath = path.resolve(process.cwd(), 'src/popup/popup.css');
const errorBoundaryPath = path.resolve(process.cwd(), 'src/components/ErrorBoundary.tsx');
const clippingWorkspacePath = path.resolve(process.cwd(), 'src/components/ClippingWorkspace.tsx');
const manifestPath = path.resolve(process.cwd(), 'manifest.json');

// 1. Verify Entry Files
if (!fs.existsSync(popupHtmlPath)) {
  errors.push('popup.html missing!');
} else {
  const htmlContent = fs.readFileSync(popupHtmlPath, 'utf-8');
  if (!htmlContent.includes('/src/popup/main.tsx')) {
    errors.push('popup.html does not load /src/popup/main.tsx module script.');
  }
}

if (!fs.existsSync(popupMainPath)) {
  errors.push('src/popup/main.tsx missing!');
}

if (!fs.existsSync(popupAppPath)) {
  errors.push('src/popup/PopupApp.tsx missing!');
} else {
  const appContent = fs.readFileSync(popupAppPath, 'utf-8');
  if (!appContent.includes('ErrorBoundary')) {
    errors.push('src/popup/PopupApp.tsx does not wrap content in ErrorBoundary.');
  }
}

// 2. Verify Popup CSS Dimensions
if (!fs.existsSync(popupCssPath)) {
  errors.push('src/popup/popup.css missing!');
} else {
  const cssContent = fs.readFileSync(popupCssPath, 'utf-8');
  if (!cssContent.includes('width: 360px') || !cssContent.includes('height: 600px')) {
    errors.push('src/popup/popup.css missing explicit 360px width or 600px height.');
  }
  if (!cssContent.includes('.euclid-popup-root') || !cssContent.includes('.euclid-popup-content')) {
    errors.push('src/popup/popup.css missing .euclid-popup-root or .euclid-popup-content rules.');
  }
}

// 3. Verify Error Boundary component
if (!fs.existsSync(errorBoundaryPath)) {
  errors.push('src/components/ErrorBoundary.tsx missing!');
} else {
  const ebContent = fs.readFileSync(errorBoundaryPath, 'utf-8');
  if (!ebContent.includes('Euclid Smart Clipper could not load this section')) {
    errors.push('ErrorBoundary.tsx missing required fallback message text.');
  }
}

// 4. Verify Clipping Workspace Options & Order
if (!fs.existsSync(clippingWorkspacePath)) {
  errors.push('src/components/ClippingWorkspace.tsx missing!');
} else {
  const cwContent = fs.readFileSync(clippingWorkspacePath, 'utf-8');
  
  // Check default clip type is null
  if (!cwContent.includes('useState<ClipType | null>(null)')) {
    errors.push('ClippingWorkspace.tsx does not default selectedClipType to null.');
  }

  // Check 5 options in order
  const optionsOrder = ['screenshot', 'youtube_note', 'bookmark', 'simplified_article', 'full_page'];
  let lastIndex = -1;
  optionsOrder.forEach((opt) => {
    const idx = cwContent.indexOf(`id: '${opt}'`);
    if (idx === -1) {
      errors.push(`Missing clipping option: ${opt}`);
    } else if (idx < lastIndex) {
      errors.push(`Clipping option ${opt} is out of order.`);
    } else {
      lastIndex = idx;
    }
  });

  // Check Screenshot Mode Dialog
  if (!cwContent.includes('setIsScreenshotDialogOpen(true)')) {
    errors.push('ClippingWorkspace.tsx missing screenshot dialog toggle.');
  }
}

// 5. Verify Manifest
if (!fs.existsSync(manifestPath)) {
  errors.push('manifest.json missing!');
} else {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  if (manifest.action?.default_popup !== 'popup.html') {
    errors.push('manifest.json action.default_popup is not "popup.html".');
  }
}

if (errors.length > 0) {
  console.error('\n❌ Popup Verification FAILED with errors:');
  errors.forEach((err) => console.error(` - ${err}`));
  process.exit(1);
}

console.log('  ✓ Verified popup entry point popup.html -> /src/popup/main.tsx.');
console.log('  ✓ Verified PopupApp.tsx, ErrorBoundary, and dedicated popup.css.');
console.log('  ✓ Verified exact 360px x 600px compact popup layout & scroll region.');
console.log('  ✓ Verified 5 clipping options in exact required order with null default.');
console.log('  ✓ Verified manifest.json extension action popup configuration.');
console.log('🎉 Popup Verification PASSED!\n');
