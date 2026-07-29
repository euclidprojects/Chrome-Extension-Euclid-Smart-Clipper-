import fs from 'fs';
import path from 'path';

console.log('🔍 Starting Extension Build Verification (dist)...');

const extensionDistDir = path.resolve(process.cwd(), 'dist');

if (!fs.existsSync(extensionDistDir)) {
  console.error('❌ Extension build failed: dist/ directory does not exist.');
  process.exit(1);
}

const manifestPath = path.join(extensionDistDir, 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('❌ Extension build failed: dist/manifest.json is missing.');
  process.exit(1);
}

let manifest;
try {
  const content = fs.readFileSync(manifestPath, 'utf-8');
  manifest = JSON.parse(content);
  console.log('✅ dist/manifest.json loaded and parsed successfully.');
} catch (e) {
  console.error('❌ Extension build failed: Failed to parse dist/manifest.json:', e.message);
  process.exit(1);
}

const resourcesToCheck = [];

// Recursive inspector to find relative file paths referenced in manifest
function inspectManifestObject(obj, currentKey = '') {
  if (!obj) return;

  if (typeof obj === 'string') {
    if (obj.match(/\.(png|jpg|jpeg|svg|html|js|css|json)$/i) && !obj.startsWith('http://') && !obj.startsWith('https://')) {
      resourcesToCheck.push({ key: currentKey, relPath: obj });
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => inspectManifestObject(item, `${currentKey}[${index}]`));
  } else if (typeof obj === 'object') {
    Object.entries(obj).forEach(([k, v]) => {
      if (k === 'matches' || k === 'permissions' || k === 'host_permissions') return;
      inspectManifestObject(v, currentKey ? `${currentKey}.${k}` : k);
    });
  }
}

inspectManifestObject(manifest);

let errorCount = 0;
const checkedPaths = new Set();

console.log(`\nFound ${resourcesToCheck.length} manifest-referenced resources to verify in dist:`);

for (const resource of resourcesToCheck) {
  const relPath = resource.relPath;
  if (checkedPaths.has(relPath)) continue;
  checkedPaths.add(relPath);

  const fullPath = path.join(extensionDistDir, relPath);

  if (!fs.existsSync(fullPath)) {
    console.error(`❌ Extension build failed: manifest.json references ${relPath}, but dist/${relPath} does not exist.`);
    errorCount++;
  } else {
    const stats = fs.statSync(fullPath);
    if (stats.size === 0) {
      console.error(`❌ Extension build failed: manifest.json references ${relPath}, but dist/${relPath} is empty (0 bytes).`);
      errorCount++;
    } else if (relPath.endsWith('.png')) {
      const buf = fs.readFileSync(fullPath);
      if (buf.length < 8 || buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4e || buf[3] !== 0x47) {
        console.error(`❌ Extension build failed: manifest.json references ${relPath}, but dist/${relPath} is not a valid PNG image.`);
        errorCount++;
      } else {
        const width = buf.readUInt32BE(16);
        const height = buf.readUInt32BE(20);
        console.log(`  ✓ Valid PNG Icon [${resource.key}]: dist/${relPath} (${width}x${height}px, ${stats.size} bytes)`);
      }
    } else {
      console.log(`  ✓ Verified File [${resource.key}]: dist/${relPath} (${stats.size} bytes)`);
    }
  }
}

// Check required files specifically
const requiredFiles = ['service-worker.js', 'offscreen.html', 'popup.html'];
for (const reqFile of requiredFiles) {
  const fPath = path.join(extensionDistDir, reqFile);
  if (!fs.existsSync(fPath)) {
    console.error(`❌ Extension build failed: Required extension file "dist/${reqFile}" is missing.`);
    errorCount++;
  }
}

// Check forbidden files in dist
const forbiddenFiles = ['_headers', 'headers', '_redirects', 'extension-auth'];
for (const forbidden of forbiddenFiles) {
  const fPath = path.join(extensionDistDir, forbidden);
  if (fs.existsSync(fPath)) {
    console.error(`❌ Extension build failed: dist/ contains forbidden file/dir "${forbidden}"`);
    errorCount++;
  }
}

if (errorCount > 0) {
  console.error(`\n❌ Extension build verification FAILED with ${errorCount} error(s).`);
  process.exit(1);
}

console.log('\n🎉 Extension Build Verification PASSED! Complete unpacked Chrome extension ready in dist/\n');
