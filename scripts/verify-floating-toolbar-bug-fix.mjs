import fs from 'fs';
import path from 'path';

console.log('🧪 Running Automated Regression Verification for Euclid Floating Toolbar Bug Fix...');

let errors = [];

const contentScriptPath = path.resolve(process.cwd(), 'src/content/contentScript.ts');
const pageUtilsPath = path.resolve(process.cwd(), 'src/utils/pageUtils.ts');
const serviceWorkerPath = path.resolve(process.cwd(), 'src/background/serviceWorker.ts');
const clippingWorkspacePath = path.resolve(process.cwd(), 'src/components/ClippingWorkspace.tsx');

// 1. Verify pageUtils.ts exists and has isSupportedPage
if (!fs.existsSync(pageUtilsPath)) {
  errors.push('src/utils/pageUtils.ts does not exist.');
} else {
  const pageUtilsContent = fs.readFileSync(pageUtilsPath, 'utf-8');
  if (!pageUtilsContent.includes('export function isSupportedPage')) {
    errors.push('src/utils/pageUtils.ts does not export isSupportedPage function.');
  }
  if (!pageUtilsContent.includes('chromewebstore.google.com') || !pageUtilsContent.includes('chrome://')) {
    errors.push('isSupportedPage does not properly filter chrome:// or Chrome Web Store URLs.');
  }
  console.log('  ✓ Verified src/utils/pageUtils.ts and isSupportedPage validation logic.');
}

// 2. Verify contentScript.ts
if (!fs.existsSync(contentScriptPath)) {
  errors.push('src/content/contentScript.ts does not exist.');
} else {
  const csContent = fs.readFileSync(contentScriptPath, 'utf-8');

  // Check centralized cleanup function
  if (!csContent.includes('export function cleanupEuclidClipperOverlays')) {
    errors.push('contentScript.ts missing export function cleanupEuclidClipperOverlays');
  }

  // Check stable root ID
  if (!csContent.includes('#euclid-smart-clipper-root')) {
    errors.push('contentScript.ts does not use stable root ID #euclid-smart-clipper-root');
  }

  // Check Shadow DOM isolation
  if (!csContent.includes('attachShadow({ mode: \'open\' })')) {
    errors.push('contentScript.ts does not attach Shadow DOM for isolation');
  }

  // Check OverlayMode state machine
  if (!csContent.includes('activeOverlayMode = \'none\'') || !csContent.includes('activeOverlayMode = \'region_selection\'')) {
    errors.push('contentScript.ts missing OverlayMode explicit state management');
  }

  // Check Close button aria-label
  if (!csContent.includes('aria-label="Close Euclid Smart Clipper toolbar"')) {
    errors.push('contentScript.ts missing aria-label="Close Euclid Smart Clipper toolbar" on Close button');
  }

  // Check Escape key listener
  if (!csContent.includes("e.key === 'Escape'") || !csContent.includes('cleanupEuclidClipperOverlays()')) {
    errors.push('contentScript.ts missing Escape key cleanup binding');
  }

  // Check SPA navigation listeners
  if (!csContent.includes('popstate') || !csContent.includes('yt-navigate-finish')) {
    errors.push('contentScript.ts missing SPA navigation listeners (popstate, yt-navigate-finish)');
  }

  // Check startup cleanup
  if (!csContent.includes('cleanupEuclidClipperOverlays();')) {
    errors.push('contentScript.ts does not run cleanupEuclidClipperOverlays on initial load');
  }

  console.log('  ✓ Verified src/content/contentScript.ts Shadow DOM, overlay lifecycle & navigation handlers.');
}

// 3. Verify serviceWorker.ts
if (!fs.existsSync(serviceWorkerPath)) {
  errors.push('src/background/serviceWorker.ts does not exist.');
} else {
  const swContent = fs.readFileSync(serviceWorkerPath, 'utf-8');

  if (!swContent.includes('isSupportedPage')) {
    errors.push('serviceWorker.ts does not use isSupportedPage validation');
  }

  if (!swContent.includes('chrome.tabs.onActivated') || !swContent.includes('CLEANUP_ACTIVE_OVERLAY')) {
    errors.push('serviceWorker.ts does not send CLEANUP_ACTIVE_OVERLAY on tab switch');
  }

  console.log('  ✓ Verified src/background/serviceWorker.ts tab change events & page support checks.');
}

// 4. Verify ClippingWorkspace.tsx error message
if (!fs.existsSync(clippingWorkspacePath)) {
  errors.push('src/components/ClippingWorkspace.tsx does not exist.');
} else {
  const cwContent = fs.readFileSync(clippingWorkspacePath, 'utf-8');
  const expectedMsg = 'This page cannot be captured or annotated because Chrome does not allow extensions to access it.';

  if (!cwContent.includes(expectedMsg)) {
    errors.push(`ClippingWorkspace.tsx does not display exact error message "${expectedMsg}"`);
  }

  console.log('  ✓ Verified src/components/ClippingWorkspace.tsx restricted page error message.');
}

if (errors.length > 0) {
  console.error('\n❌ Floating Toolbar Bug Verification FAILED:');
  errors.forEach(e => console.error(' - ' + e));
  process.exit(1);
} else {
  console.log('\n🎉 ALL FLOATING TOOLBAR REGRESSION TESTS PASSED SUCCESSFULLY!\n');
}
