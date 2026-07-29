import fs from 'fs';
import path from 'path';

console.log('🧹 Cleaning extension build and release output directories...');

const rootDir = process.cwd();
const dirsToClean = [
  path.join(rootDir, 'dist'),
  path.join(rootDir, 'release'),
  path.join(rootDir, 'extension-dist'),
];

for (const dir of dirsToClean) {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    console.log(`  ✓ Removed ${path.relative(rootDir, dir)}/`);
  }
}

// Clean any standalone root zip files if present
const rootZip = path.join(rootDir, 'Euclid-Smart-Clipper.zip');
if (fs.existsSync(rootZip)) {
  fs.rmSync(rootZip, { force: true });
  console.log('  ✓ Removed Euclid-Smart-Clipper.zip');
}

console.log('✅ Build directories successfully cleaned.\n');
