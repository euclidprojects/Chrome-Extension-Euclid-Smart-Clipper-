import fs from 'fs';
import path from 'path';

console.log('🔍 Starting Extension Build Verification...');

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

const requiredFiles = [];

// Icons check
if (manifest.icons) {
  Object.entries(manifest.icons).forEach(([size, iconPath]) => {
    requiredFiles.push({ name: `Icon (${size}px)`, relPath: iconPath, isPng: true });
  });
}

// Action default popup check
if (manifest.action?.default_popup) {
  requiredFiles.push({ name: 'Default Popup', relPath: manifest.action.default_popup });
}

// Side panel check
if (manifest.side_panel?.default_path) {
  requiredFiles.push({ name: 'Side Panel Page', relPath: manifest.side_panel.default_path });
}

// Service worker check
if (manifest.background?.service_worker) {
  requiredFiles.push({ name: 'Background Service Worker', relPath: manifest.background.service_worker });
}

// Content scripts check
if (Array.isArray(manifest.content_scripts)) {
  manifest.content_scripts.forEach((cs, i) => {
    if (Array.isArray(cs.js)) {
      cs.js.forEach((jsPath) => {
        requiredFiles.push({ name: `Content Script JS #${i + 1}`, relPath: jsPath });
      });
    }
    if (Array.isArray(cs.css)) {
      cs.css.forEach((cssPath) => {
        requiredFiles.push({ name: `Content Script CSS #${i + 1}`, relPath: cssPath });
      });
    }
  });
}

let errorCount = 0;

for (const file of requiredFiles) {
  const fullPath = path.join(distDir, file.relPath);
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ MISSING: ${file.name} -> dist/${file.relPath}`);
    errorCount++;
  } else {
    const stats = fs.statSync(fullPath);
    if (stats.size === 0) {
      console.error(`❌ EMPTY FILE: ${file.name} -> dist/${file.relPath}`);
      errorCount++;
    } else {
      if (file.isPng || file.relPath.endsWith('.png')) {
        const buf = fs.readFileSync(fullPath);
        // Verify PNG magic header: 0x89 0x50 0x4E 0x47 (137 80 78 71)
        if (buf.length < 8 || buf[0] !== 0x89 || buf[1] !== 0x50 || buf[2] !== 0x4e || buf[3] !== 0x47) {
          console.error(`❌ INVALID PNG: ${file.name} -> dist/${file.relPath} (Corrupted or invalid PNG header)`);
          errorCount++;
          continue;
        }
        const width = buf.readUInt32BE(16);
        const height = buf.readUInt32BE(20);
        console.log(`  ✓ Valid PNG Icon: ${file.name} (dist/${file.relPath}, ${width}x${height}px, ${stats.size} bytes)`);
      } else {
        console.log(`  ✓ Found: ${file.name} (dist/${file.relPath}, ${stats.size} bytes)`);
      }
    }
  }
}

if (errorCount > 0) {
  console.error(`\n❌ Extension build verification FAILED with ${errorCount} error(s).`);
  process.exit(1);
}

console.log('\n🎉 Extension Build Verification PASSED! Official unpacked extension ready in dist/');
