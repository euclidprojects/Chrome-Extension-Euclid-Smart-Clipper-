import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';

const publicIconsDir = path.join(process.cwd(), 'public', 'icons');
const distIconsDir = path.join(process.cwd(), 'dist', 'icons');

if (!fs.existsSync(publicIconsDir)) fs.mkdirSync(publicIconsDir, { recursive: true });
if (!fs.existsSync(distIconsDir)) fs.mkdirSync(distIconsDir, { recursive: true });

const masterPath = path.join(publicIconsDir, 'official_master.png');
const tmpMasterPath = '/tmp/downloaded_icon.png';

let sourceMaster = null;
if (fs.existsSync(masterPath)) {
  sourceMaster = masterPath;
} else if (fs.existsSync(tmpMasterPath)) {
  sourceMaster = tmpMasterPath;
  fs.copyFileSync(tmpMasterPath, masterPath);
}

const sizes = [16, 32, 48, 128, 512];

let usedConvert = false;
if (sourceMaster) {
  try {
    sizes.forEach((s) => {
      const pubTarget = path.join(publicIconsDir, `icon${s}.png`);
      const distTarget = path.join(distIconsDir, `icon${s}.png`);
      execSync(`convert "${sourceMaster}" -resize ${s}x${s}! "${pubTarget}"`);
      fs.copyFileSync(pubTarget, distTarget);
      console.log(`Generated official PNG icon${s}.png (${s}x${s})`);
    });
    usedConvert = true;
  } catch (err) {
    console.warn('Notice: ImageMagick convert command unavailable or failed, checking existing files...', err.message);
  }
}

if (!usedConvert) {
  console.log('Using pre-bundled official PNG icons in public/icons/');
  sizes.forEach((s) => {
    const pubTarget = path.join(publicIconsDir, `icon${s}.png`);
    const distTarget = path.join(distIconsDir, `icon${s}.png`);
    if (fs.existsSync(pubTarget)) {
      fs.copyFileSync(pubTarget, distTarget);
      console.log(`Copied official icon${s}.png to dist/icons/`);
    }
  });
}
