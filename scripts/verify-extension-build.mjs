import fs from 'fs';
import path from 'path';

console.log('🔍 Starting Comprehensive Extension Build Verification...');

const distDir = path.resolve(process.cwd(), 'dist');

if (!fs.existsSync(distDir)) {
  console.error('❌ ERROR: dist directory does not exist! Run build first.');
  process.exit(1);
}

const manifestPath = path.join(distDir, 'manifest.json');
if (!fs.existsSync(manifestPath)) {
  console.error('❌ ERROR: dist/manifest.json is missing!');
  process.exit(1);
}

let manifest;
try {
  const content = fs.readFileSync(manifestPath, 'utf-8');
  manifest = JSON.parse(content);
  console.log('✅ dist/manifest.json loaded and parsed successfully.');
} catch (e) {
  console.error('❌ ERROR: Failed to parse dist/manifest.json:', e.message);
  process.exit(1);
}

const resourcesToCheck = [];

// Recursive inspector to find relative file paths referenced in manifest
function inspectManifestObject(obj, currentKey = '') {
  if (!obj) return;

  if (typeof obj === 'string') {
    // If string points to a relative file (ends with .png, .jpg, .html, .js, .css, etc.)
    if (obj.match(/\.(png|jpg|jpeg|svg|html|js|css|json)$/i) && !obj.startsWith('http://') && !obj.startsWith('https://')) {
      resourcesToCheck.push({ key: currentKey, relPath: obj });
    }
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => inspectManifestObject(item, `${currentKey}[${index}]`));
  } else if (typeof obj === 'object') {
    Object.entries(obj).forEach(([k, v]) => {
      // Skip chrome permissions or match patterns
      if (k === 'matches' || k === 'permissions' || k === 'host_permissions') return;
      inspectManifestObject(v, currentKey ? `${currentKey}.${k}` : k);
    });
  }
}

inspectManifestObject(manifest);

let errorCount = 0;
const checkedPaths = new Set();

console.log(`\nFound ${resourcesToCheck.length} manifest-referenced resources to verify:`);

for (const resource of resourcesToCheck) {
  const relPath = resource.relPath;
  if (checkedPaths.has(relPath)) continue;
  checkedPaths.add(relPath);

  const fullPath = path.join(distDir, relPath);

  if (!fs.existsSync(fullPath)) {
    console.error(`❌ ERROR: manifest.json references ${relPath}, but dist/${relPath} does not exist.`);
    errorCount++;
  } else {
    const stats = fs.statSync(fullPath);
    if (stats.size === 0) {
      console.error(`❌ ERROR: manifest.json references ${relPath}, but dist/${relPath} is empty (0 bytes).`);
      errorCount++;
    } else if (relPath.endsWith('.png')) {
      const buf = fs.readFileSync(fullPath);
      // Verify PNG magic header: 0x89 0x50 0x4E 0x47
      if (buf.length < 8 || buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4e || buf[3] !== 0x47) {
        console.error(`❌ ERROR: manifest.json references ${relPath}, but dist/${relPath} is not a valid PNG image.`);
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

if (errorCount > 0) {
  console.error(`\n❌ Extension build verification FAILED with ${errorCount} error(s).`);
  process.exit(1);
}

console.log('\n🎉 Extension Build Verification PASSED! Complete unpacked Chrome extension ready in dist/\n');
