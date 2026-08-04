import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

console.log('📦 Starting Chrome Web Store extension packaging...');

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, 'dist');
const releaseDir = path.resolve(rootDir, 'release');
const manifestPath = path.join(distDir, 'manifest.json');

if (!fs.existsSync(manifestPath)) {
  console.error('Packaging failed: dist/manifest.json was not found.');
  process.exit(1);
}

let version = '1.0.0';
try {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));
  if (manifest.version) {
    version = manifest.version;
  }
} catch (e) {
  console.error('Packaging failed: Failed to parse dist/manifest.json: ' + e.message);
  process.exit(1);
}

// Ensure release directory exists
if (!fs.existsSync(releaseDir)) {
  fs.mkdirSync(releaseDir, { recursive: true });
}

const zipFilename = `Euclid-Smart-Clipper-v${version}.zip`;
const zipFilePath = path.join(releaseDir, zipFilename);
const rootZipFilePath = path.join(rootDir, 'Euclid-Smart-Clipper.zip');

if (fs.existsSync(zipFilePath)) fs.rmSync(zipFilePath, { force: true });
if (fs.existsSync(rootZipFilePath)) fs.rmSync(rootZipFilePath, { force: true });

try {
  // Remove any .map files from dist if present
  function removeMaps(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        removeMaps(fullPath);
      } else if (entry.name.endsWith('.map')) {
        fs.rmSync(fullPath, { force: true });
      }
    }
  }
  removeMaps(distDir);

  const zip = new AdmZip();
  // Adds all files/folders inside dist/ directly to the ZIP root
  zip.addLocalFolder(distDir, '');

  zip.writeZip(zipFilePath);
  fs.copyFileSync(zipFilePath, rootZipFilePath);

  const stats = fs.statSync(zipFilePath);
  console.log(`✅ ZIP package created successfully (${stats.size} bytes)`);
  console.log(`   Filename: ${zipFilename}`);
  console.log(`   Location: ${zipFilePath}`);
} catch (err) {
  if (fs.existsSync(zipFilePath)) fs.rmSync(zipFilePath, { force: true });
  if (fs.existsSync(rootZipFilePath)) fs.rmSync(rootZipFilePath, { force: true });
  console.error('Packaging failed: ' + err.message);
  process.exit(1);
}
