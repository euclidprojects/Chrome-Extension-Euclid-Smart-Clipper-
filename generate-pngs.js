import fs from 'fs';
import path from 'path';
import https from 'https';
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
const rootMasterPath = path.join(rootDir, 'official_icon.png');
const officialUrl = 'https://i.postimg.cc/KzT17zDf/clipper-Chat-GPT-Image-Jul-25-2026-12-46-06-PM.png';

async function downloadMasterIfNeeded() {
  if (fs.existsSync(masterPath)) {
    const buf = fs.readFileSync(masterPath);
    if (buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
      return;
    }
  }

  if (fs.existsSync(rootMasterPath)) {
    const buf = fs.readFileSync(rootMasterPath);
    if (buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
      fs.copyFileSync(rootMasterPath, masterPath);
      return;
    }
  }

  console.log('Downloading official master icon PNG in binary mode...');
  await new Promise((resolve, reject) => {
    function fetchUrl(url) {
      https.get(url, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          fetchUrl(res.headers.location);
        } else if (res.statusCode === 200) {
          const chunks = [];
          res.on('data', (chunk) => chunks.push(chunk));
          res.on('end', () => {
            const buffer = Buffer.concat(chunks);
            fs.writeFileSync(masterPath, buffer);
            console.log(`Saved master icon (${buffer.length} bytes)`);
            resolve();
          });
        } else {
          reject(new Error(`HTTP ${res.statusCode}`));
        }
      }).on('error', reject);
    }
    fetchUrl(officialUrl);
  });
}

async function main() {
  await downloadMasterIfNeeded();

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


