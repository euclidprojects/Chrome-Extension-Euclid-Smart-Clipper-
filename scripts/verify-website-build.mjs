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

// Match asset src in html (e.g. /assets/extensionAuth-xxx.js or ../assets/xxx.js)
const assetMatch = authHtmlContent.match(/src="([^"]+)"/);
if (!assetMatch) {
  console.error('❌ Website build failed: website-dist/extension-auth/index.html does not contain a script src attribute.');
  process.exit(1);
}

const scriptRelPath = assetMatch[1].replace(/^\//, ''); // remove leading slash
const scriptFullPath = path.resolve(websiteDistDir, scriptRelPath);

if (!fs.existsSync(scriptFullPath)) {
  console.error(`❌ Website build failed: Referenced script ${scriptRelPath} does not exist in website-dist.`);
  process.exit(1);
}

const scriptContent = fs.readFileSync(scriptFullPath, 'utf-8');

if (!scriptContent.includes('[Hosted Auth] Script started')) {
  console.error('❌ Website build failed: Hosted auth script does not contain "[Hosted Auth] Script started".');
  process.exit(1);
}

if (!scriptContent.includes('EUCLID_HOSTED_AUTH_READY')) {
  console.error('❌ Website build failed: Hosted auth script does not contain "EUCLID_HOSTED_AUTH_READY".');
  process.exit(1);
}

if (scriptContent.match(/from\s+["']firebase\//)) {
  console.error('❌ Website build failed: Hosted auth script contains unresolved bare Firebase imports.');
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
console.log(`  ✓ website-dist/${scriptRelPath} verified (bundled JS asset).`);
console.log('  ✓ website-dist/_headers verified.');
console.log('  ✓ No unneeded headers file in website-dist/.');
console.log('\n🎉 Website Build Verification PASSED! Website deployment package ready in website-dist/\n');
