import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

console.log('🧪 Starting Chrome Web Store ZIP Packaging Verification...');

const rootDir = process.cwd();
const releaseDir = path.resolve(rootDir, 'release');

if (!fs.existsSync(releaseDir)) {
  console.error('Verification failed: release/ directory does not exist.');
  process.exit(1);
}

// Find ZIP file in release/ directory
const zipFiles = fs.readdirSync(releaseDir).filter((f) => f.endsWith('.zip'));

if (zipFiles.length === 0) {
  console.error('Verification failed: No .zip files found in release/ directory.');
  process.exit(1);
}

const zipFilename = zipFiles[0];
const zipPath = path.join(releaseDir, zipFilename);
console.log(`📦 Inspecting ZIP package: ${path.relative(rootDir, zipPath)}`);

let zip;
try {
  zip = new AdmZip(zipPath);
} catch (e) {
  console.error(`Verification failed: The ZIP file is invalid or corrupted: ${e.message}`);
  process.exit(1);
}

const entries = zip.getEntries();
const entryNames = entries.map((e) => e.entryName.replace(/\\/g, '/'));

console.log(`ZIP Archive contains ${entryNames.length} file/folder entries.`);

let errorCount = 0;

// 1. Check for manifest.json entries
const manifestEntries = entryNames.filter((name) => {
  const parts = name.split('/');
  return parts[parts.length - 1] === 'manifest.json' || parts[parts.length - 1] === 'manifest.json/';
});

console.log('Manifest entries found in ZIP:', manifestEntries);

if (manifestEntries.length === 0) {
  console.error('Verification failed: manifest.json is missing from ZIP.');
  errorCount++;
} else if (manifestEntries.length > 1) {
  console.error(`Verification failed: ${manifestEntries.length} manifest.json files were found in ZIP.`);
  errorCount++;
} else if (manifestEntries[0] !== 'manifest.json') {
  console.error(`Verification failed: manifest.json is under ${manifestEntries[0]} instead of the ZIP root.`);
  errorCount++;
}

// 2. Check for forbidden directories or files
const forbiddenPrefixes = [
  'dist/',
  'public/',
  'public-extension/',
  'public-website/',
  'src/',
  'node_modules/',
  'scripts/',
  'release/',
  'website-dist/',
  'extension-dist/',
  '.git/',
  '.github/',
];

for (const entry of entryNames) {
  for (const prefix of forbiddenPrefixes) {
    if (entry.startsWith(prefix)) {
      console.error(`Verification failed: ZIP contains forbidden path "${entry}"`);
      errorCount++;
      break;
    }
  }
}

// Check for top-level wrapper folder
const topLevelDirectories = new Set();
for (const entry of entryNames) {
  if (entry.includes('/')) {
    topLevelDirectories.add(entry.split('/')[0]);
  }
}

// If all entries share the same single top-level wrapper directory (other than standard assets/ or icons/)
if (
  topLevelDirectories.size === 1 &&
  !topLevelDirectories.has('assets') &&
  !topLevelDirectories.has('icons')
) {
  const wrapper = Array.from(topLevelDirectories)[0];
  console.error(`Verification failed: ZIP contains root wrapper directory "${wrapper}"`);
  errorCount++;
}

// 3. Parse manifest.json from ZIP
let manifest;
try {
  const manifestEntry = zip.getEntry('manifest.json');
  if (!manifestEntry) {
    throw new Error('manifest.json entry missing in ZIP');
  }
  const manifestText = manifestEntry.getData().toString('utf-8');
  manifest = JSON.parse(manifestText);
  console.log('✅ Root manifest.json in ZIP is valid JSON.');
} catch (e) {
  console.error(`Verification failed: Failed to parse manifest.json in ZIP: ${e.message}`);
  process.exit(1);
}

// 4. Verify version
const version = manifest.version;
if (!version || typeof version !== 'string' || !/^\d+(\.\d+){1,3}$/.test(version)) {
  console.error(`Verification failed: Invalid manifest version "${version}"`);
  errorCount++;
}

// 5. Inspect manifest paths & resources
const referencedFiles = [];

function extractPaths(obj, currentKey = '') {
  if (!obj) return;
  if (typeof obj === 'string') {
    if (obj.startsWith('http://') || obj.startsWith('https://')) {
      if (currentKey.includes('icons') || currentKey.includes('default_icon')) {
        console.error(`Verification failed: Icon path "${obj}" uses a remote URL.`);
        errorCount++;
      }
    } else if (obj.startsWith('/')) {
      console.error(`Verification failed: Path "${obj}" begins with "/" when package-relative path is required.`);
      errorCount++;
    } else if (obj.match(/\.(png|jpg|jpeg|svg|html|js|css|json)$/i)) {
      referencedFiles.push({ key: currentKey, relPath: obj });
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => extractPaths(item, `${currentKey}[${index}]`));
  } else if (typeof obj === 'object') {
    Object.entries(obj).forEach(([k, v]) => {
      if (k === 'matches' || k === 'permissions' || k === 'host_permissions') return;
      extractPaths(v, currentKey ? `${currentKey}.${k}` : k);
    });
  }
}

extractPaths(manifest);

// Check all manifest-referenced files in ZIP
const checkedPaths = new Set();
for (const item of referencedFiles) {
  const rel = item.relPath;
  if (checkedPaths.has(rel)) continue;
  checkedPaths.add(rel);

  const entry = zip.getEntry(rel);
  if (!entry) {
    console.error(`Verification failed: ${rel} is referenced in manifest (${item.key}) but missing in ZIP.`);
    errorCount++;
  }
}

// 6. Verify required icon files specifically
const requiredIcons = ['icons/icon16.png', 'icons/icon32.png', 'icons/icon48.png', 'icons/icon128.png'];
for (const icon of requiredIcons) {
  const entry = zip.getEntry(icon);
  if (!entry) {
    console.error(`Verification failed: ${icon} is referenced but missing in ZIP.`);
    errorCount++;
  } else if (entry.header.size === 0) {
    console.error(`Verification failed: ${icon} in ZIP is empty (0 bytes).`);
    errorCount++;
  }
}

// 7. Verify background service worker
if (manifest.background && manifest.background.service_worker) {
  const swPath = manifest.background.service_worker;
  const entry = zip.getEntry(swPath);
  if (!entry) {
    console.error(`Verification failed: background service worker (${swPath}) is missing in ZIP.`);
    errorCount++;
  }
} else {
  console.error('Verification failed: background service worker is missing in manifest.');
  errorCount++;
}

// Summary evaluation
if (errorCount > 0) {
  console.error(`\n❌ Chrome Web Store Package Verification FAILED with ${errorCount} error(s).`);
  process.exit(1);
}

// Print top-level ZIP entries
const topLevelEntries = new Set();
for (const name of entryNames) {
  const top = name.split('/')[0];
  if (top) topLevelEntries.add(top);
}

console.log('\n==================================================');
console.log('Package verification passed');
console.log(`ZIP: ${path.relative(rootDir, zipPath)}`);
console.log(`Manifest count: 1`);
console.log(`Manifest location: manifest.json`);
console.log(`Manifest version: ${version}`);
console.log(`Root wrapper folder: none`);
console.log(`Required files: present`);
console.log(`Icon files: present`);
console.log(`Chrome Web Store package: valid`);
console.log('==================================================');

console.log('\nTop-level ZIP contents:');
Array.from(topLevelEntries).sort().forEach((item) => {
  console.log(` - ${item}`);
});
console.log('');
