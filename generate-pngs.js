import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const rootDir = process.cwd();
const publicIconsDir = path.join(rootDir, 'public', 'icons');
const publicExtIconsDir = path.join(rootDir, 'public-extension', 'icons');
const distExtIconsDir = path.join(rootDir, 'extension-dist', 'icons');
const distIconsDir = path.join(rootDir, 'dist', 'icons');

const dirs = [publicIconsDir, publicExtIconsDir, distExtIconsDir, distIconsDir];
for (const dir of dirs) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

const masterPath = path.join(publicExtIconsDir, 'official_master.png');

async function ensureValidMaster() {
  if (fs.existsSync(masterPath)) {
    try {
      await sharp(masterPath).metadata();
      return;
    } catch {
      // invalid image
    }
  }

  // Create a clean brand icon PNG with emerald background
  await sharp({
    create: {
      width: 512,
      height: 512,
      channels: 4,
      background: { r: 16, g: 185, b: 129, alpha: 1 }
    }
  })
  .png()
  .toFile(masterPath);
}

async function main() {
  await ensureValidMaster();

  const sizes = [16, 32, 48, 128, 512];
  for (const s of sizes) {
    const tempFile = path.join(publicExtIconsDir, `icon${s}.png`);

    await sharp(masterPath)
      .resize(s, s, { fit: 'fill' })
      .toFormat('png')
      .toFile(tempFile);

    for (const dir of dirs) {
      const target = path.join(dir, `icon${s}.png`);
      fs.copyFileSync(tempFile, target);
    }

    console.log(`Generated official PNG icon${s}.png (${s}x${s})`);
  }
}

main().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});
