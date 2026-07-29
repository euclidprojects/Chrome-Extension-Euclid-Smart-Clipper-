import fs from 'fs';
import path from 'path';

console.log('🔍 Starting Website Build Verification (website-dist)...');

const websiteDistDir = path.resolve(process.cwd(), 'website-dist');

if (!fs.existsSync(websiteDistDir)) {
  console.error('❌ Website build failed: website-dist/ directory does not exist.');
  process.exit(1);
}

const authHtmlPath = path.join(websiteDistDir, 'extension-auth/index.html');
if (!fs.existsSync(authHtmlPath)) {
  console.error('❌ Website build failed: website-dist/extension-auth/index.html is missing.');
  process.exit(1);
}

const authHtmlContent = fs.readFileSync(authHtmlPath, 'utf-8');
if (!authHtmlContent.includes('assets/')) {
  console.error('❌ Website build failed: website-dist/extension-auth/index.html does not reference bundled JS assets.');
  process.exit(1);
}

const headersPath = path.join(websiteDistDir, '_headers');
if (!fs.existsSync(headersPath)) {
  console.error('❌ Website build failed: website-dist/_headers is missing.');
  process.exit(1);
}

const headersContent = fs.readFileSync(headersPath, 'utf-8');
if (!headersContent.includes('/extension-auth/*') || !headersContent.includes('frame-ancestors chrome-extension://')) {
  console.error('❌ Website build failed: website-dist/_headers does not contain required CSP / X-Frame-Options rules.');
  process.exit(1);
}

const invalidHeadersPath = path.join(websiteDistDir, 'headers');
if (fs.existsSync(invalidHeadersPath)) {
  console.error('❌ Website build failed: website-dist/headers (without underscore) must not exist.');
  process.exit(1);
}

console.log('  ✓ website-dist/extension-auth/index.html verified.');
console.log('  ✓ website-dist/_headers verified.');
console.log('  ✓ No unneeded headers file in website-dist/.');
console.log('\n🎉 Website Build Verification PASSED! Website deployment package ready in website-dist/\n');
