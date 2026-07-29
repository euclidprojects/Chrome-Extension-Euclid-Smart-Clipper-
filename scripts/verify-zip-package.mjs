import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

console.log('🧪 Starting Chrome Web Store ZIP Packaging Verification...');

const rootDir = process.cwd();
const zipPath = path.resolve(rootDir, 'Euclid-Smart-Clipper.zip');
const distDir = path.resolve(rootDir, 'dist');

if (!fs.existsSync(zipPath)) {
  console.error('❌ Verification failed: Euclid-Smart-Clipper.zip does not exist.');
  process.exit(1);
}

if (!fs.existsSync(distDir)) {
  console.error('❌ Verification failed: dist/ directory does not exist.');
  process.exit(1);
}

// 1. Inspect contents of ZIP using unzip -l
let zipOutput = '';
try {
  zipOutput = execSync(`unzip -l "${zipPath}"`, { encoding: 'utf-8' });
} catch (e) {
  console.error('❌ Failed to read ZIP contents:', e.message);
  process.exit(1);
}

const lines = zipOutput.split('\n');
const fileEntries = [];

for (const line of lines) {
  const match = line.trim().match(/^\d+\s+[\d-]+\s+[\d:]+\s+(.+)$/);
  if (match) {
    fileEntries.push(match[1]);
  }
}

console.log(`\nZIP Archive Contains ${fileEntries.length} entries.`);

// 2. Count manifest.json entries in ZIP
const manifestEntries = fileEntries.filter(
  (f) => f === 'manifest.json' || f.endsWith('/manifest.json') || f.endsWith('\\manifest.json')
);

console.log('Manifest entries found in ZIP:', manifestEntries);

if (manifestEntries.length === 0) {
  console.error('❌ Verification failed: No manifest.json found in ZIP.');
  process.exit(1);
}

if (manifestEntries.length > 1) {
  console.error(
    `❌ Verification failed: Multiple manifest.json files found in ZIP (${manifestEntries.length}):`,
    manifestEntries
  );
  process.exit(1);
}

if (manifestEntries[0] !== 'manifest.json') {
  console.error(
    `❌ Verification failed: manifest.json is not at the root of the ZIP. Found at: ${manifestEntries[0]}`
  );
  process.exit(1);
}

console.log('✅ Exactly one manifest.json found at the root of the ZIP.');

// 3. Check required extension files in ZIP and dist
const requiredFiles = [
  'manifest.json',
  'service-worker.js',
  'sidepanel.html',
  'popup.html',
  'screenshot-editor.html',
  'offscreen.html',
  'icons/icon16.png',
  'icons/icon32.png',
  'icons/icon48.png',
  'icons/icon128.png',
];

let errorCount = 0;

for (const reqFile of requiredFiles) {
  const inZip = fileEntries.includes(reqFile);
  const inDist = fs.existsSync(path.join(distDir, reqFile));

  if (!inDist) {
    console.error(`❌ Verification failed: dist/${reqFile} is missing.`);
    errorCount++;
  }
  if (!inZip) {
    console.error(`❌ Verification failed: ${reqFile} is missing from Euclid-Smart-Clipper.zip.`);
    errorCount++;
  }
}

// 4. Check forbidden files in ZIP
const forbiddenPatterns = [
  /^src\//,
  /^node_modules\//,
  /\.md$/i,
  /^public\//,
  /^extension\//,
  /^public-extension\//,
  /^public-website\//,
  /^website-dist\//,
  /^extension-dist\//,
  /^dist\//,
  /firebase-blueprint\.json/i,
  /\.rules$/,
  /\.ts$/,
  /\.mjs$/,
];

for (const entry of fileEntries) {
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(entry)) {
      console.error(`❌ Verification failed: ZIP contains forbidden item "${entry}"`);
      errorCount++;
      break;
    }
  }
}

// 5. Verify dist/manifest.json content and referenced paths
const distManifestPath = path.join(distDir, 'manifest.json');
let manifestJson;

try {
  manifestJson = JSON.parse(fs.readFileSync(distManifestPath, 'utf-8'));
  console.log('✅ dist/manifest.json parsed successfully.');
} catch (e) {
  console.error('❌ Failed to parse dist/manifest.json:', e.message);
  process.exit(1);
}

// Inspect referenced resources in manifest
const referencedPaths = [];

function extractPaths(obj) {
  if (!obj) return;
  if (typeof obj === 'string') {
    if (
      obj.match(/\.(png|jpg|jpeg|svg|html|js|css|json)$/i) &&
      !obj.startsWith('http://') &&
      !obj.startsWith('https://')
    ) {
      referencedPaths.push(obj);
    }
  } else if (Array.isArray(obj)) {
    obj.forEach(extractPaths);
  } else if (typeof obj === 'object') {
    Object.entries(obj).forEach(([k, v]) => {
      if (k === 'matches' || k === 'permissions' || k === 'host_permissions') return;
      extractPaths(v);
    });
  }
}

extractPaths(manifestJson);

for (const relPath of referencedPaths) {
  const distFile = path.join(distDir, relPath);
  if (!fs.existsSync(distFile)) {
    console.error(`❌ Manifest references "${relPath}", but dist/${relPath} does not exist.`);
    errorCount++;
  } else if (!fileEntries.includes(relPath)) {
    console.error(`❌ Manifest references "${relPath}", but it is missing from Euclid-Smart-Clipper.zip.`);
    errorCount++;
  }
}

if (errorCount > 0) {
  console.error(`\n❌ Packaging verification FAILED with ${errorCount} error(s).`);
  process.exit(1);
}

console.log('\n🎉 ALL Chrome Web Store Packaging Verifications PASSED!');
console.log(`📦 Final ZIP: ${zipPath}`);
console.log(`📄 Manifests in ZIP: 1 (located at manifest.json root)`);
console.log(`🖼️ Icon files verified: icons/icon16.png, icons/icon32.png, icons/icon48.png, icons/icon128.png\n`);
