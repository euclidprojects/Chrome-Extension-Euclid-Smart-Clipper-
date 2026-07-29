import fs from 'fs';
import path from 'path';

console.log('📦 Preparing clean dist/ folder for Chrome Web Store package...');

const rootDir = process.cwd();
const extensionDistDir = path.resolve(rootDir, 'extension-dist');
const distDir = path.resolve(rootDir, 'dist');

if (!fs.existsSync(extensionDistDir)) {
  console.error('❌ extension-dist/ does not exist. Build extension first.');
  process.exit(1);
}

// Clean and recreate dist/
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// Copy contents of extension-dist/ directly into dist/
function copyRecursive(src, dest) {
  const stats = fs.statSync(src);
  if (stats.isDirectory()) {
    if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      copyRecursive(path.join(src, child), path.join(dest, child));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

copyRecursive(extensionDistDir, distDir);

// Clean any stray subdirectories or unwanted manifest copies in dist/
const forbiddenInDist = ['public', 'extension', 'src', 'node_modules', 'public-extension', 'public-website'];
for (const sub of forbiddenInDist) {
  const p = path.join(distDir, sub);
  if (fs.existsSync(p)) {
    console.log(`🧹 Removing unwanted folder from dist/: ${sub}`);
    fs.rmSync(p, { recursive: true, force: true });
  }
}

// Verify manifest count inside dist/
function findManifests(dir, list = []) {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const full = path.join(dir, item);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      findManifests(full, list);
    } else if (item === 'manifest.json') {
      list.push(path.relative(distDir, full));
    }
  }
  return list;
}

const manifests = findManifests(distDir);
console.log(`Found ${manifests.length} manifest file(s) in dist/:`, manifests);

if (manifests.length !== 1 || manifests[0] !== 'manifest.json') {
  console.error(`❌ Dist preparation failed: expected exactly one dist/manifest.json, found: ${manifests.join(', ')}`);
  process.exit(1);
}

console.log('✅ dist/ successfully prepared with single dist/manifest.json\n');
