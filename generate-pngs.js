import fs from 'fs';
import path from 'path';
import https from 'https';
import sharp from 'sharp';

const publicIconsDir = path.join(process.cwd(), 'public-extension', 'icons');
const distIconsDir = path.join(process.cwd(), 'extension-dist', 'icons');

if (!fs.existsSync(publicIconsDir)) fs.mkdirSync(publicIconsDir, { recursive: true });
if (!fs.existsSync(distIconsDir)) fs.mkdirSync(distIconsDir, { recursive: true });

const masterPath = path.join(publicIconsDir, 'official_master.png');
const officialUrl = 'https://i.postimg.cc/KzT17zDf/clipper-Chat-GPT-Image-Jul-25-2026-12-46-06-PM.png';

async function downloadMasterIfNeeded() {
  if (fs.existsSync(masterPath)) {
    const buf = fs.readFileSync(masterPath);
    // Verify valid PNG header
    if (buf.length > 8 && buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) {
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
    const pubTarget = path.join(publicIconsDir, `icon${s}.png`);
    const distTarget = path.join(distIconsDir, `icon${s}.png`);

    await sharp(masterPath)
      .resize(s, s, { fit: 'fill' })
      .toFormat('png')
      .toFile(pubTarget);

    fs.copyFileSync(pubTarget, distTarget);
    console.log(`Generated official PNG icon${s}.png (${s}x${s})`);
  }
}

main().catch((err) => {
  console.error('Error generating icons:', err);
  process.exit(1);
});

