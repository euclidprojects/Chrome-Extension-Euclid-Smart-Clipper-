import fs from 'fs';
import path from 'path';

console.log('📦 Separating Website and Chrome Extension build outputs...');

const distDir = path.resolve(process.cwd(), 'dist');
const websiteDistDir = path.resolve(process.cwd(), 'website-dist');
const extensionDistDir = path.resolve(process.cwd(), 'extension-dist');

if (!fs.existsSync(distDir)) {
  console.error('❌ dist directory does not exist.');
  process.exit(1);
}

// 1. Clean previous website-dist and extension-dist
fs.rmSync(websiteDistDir, { recursive: true, force: true });
fs.rmSync(extensionDistDir, { recursive: true, force: true });

// 2. Create website-dist (Cloudflare Pages deployment)
fs.mkdirSync(websiteDistDir, { recursive: true });

if (fs.existsSync(path.join(distDir, 'extension-auth'))) {
  fs.cpSync(path.join(distDir, 'extension-auth'), path.join(websiteDistDir, 'extension-auth'), { recursive: true });
}
if (fs.existsSync(path.join(distDir, 'assets'))) {
  fs.cpSync(path.join(distDir, 'assets'), path.join(websiteDistDir, 'assets'), { recursive: true });
}
if (fs.existsSync(path.join(distDir, 'index.html'))) {
  fs.copyFileSync(path.join(distDir, 'index.html'), path.join(websiteDistDir, 'index.html'));
}

// Copy public/_headers to website-dist/_headers
const publicHeaders = path.resolve(process.cwd(), 'public/_headers');
if (fs.existsSync(publicHeaders)) {
  fs.copyFileSync(publicHeaders, path.join(websiteDistDir, '_headers'));
} else {
  console.error('❌ ERROR: public/_headers does not exist!');
  process.exit(1);
}

// Ensure headers (without underscore) does not exist in website-dist
if (fs.existsSync(path.join(websiteDistDir, 'headers'))) {
  fs.rmSync(path.join(websiteDistDir, 'headers'), { force: true });
}

// 3. Create extension-dist (Chrome Extension package)
fs.mkdirSync(extensionDistDir, { recursive: true });
fs.cpSync(distDir, extensionDistDir, { recursive: true });

// Forbidden files in Chrome extension package
const forbiddenFiles = ['_headers', '_redirects', 'headers'];

for (const forbidden of forbiddenFiles) {
  const extPath = path.join(extensionDistDir, forbidden);
  if (fs.existsSync(extPath)) {
    fs.rmSync(extPath, { recursive: true, force: true });
  }
  const distPath = path.join(distDir, forbidden);
  if (fs.existsSync(distPath)) {
    fs.rmSync(distPath, { recursive: true, force: true });
  }
}

console.log('  ✓ Website deployment package ready in: website-dist/');
console.log('  ✓ Chrome extension package ready in: extension-dist/ (and dist/)');
