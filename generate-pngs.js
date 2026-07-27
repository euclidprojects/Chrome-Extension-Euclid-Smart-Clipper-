import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

// Minimal PNG generator in pure Node.js
function createPNG(width, height, renderPixel) {
  const rowSize = width * 4 + 1;
  const rawData = Buffer.alloc(rowSize * height);

  for (let y = 0; y < height; y++) {
    const rowOffset = y * rowSize;
    rawData[rowOffset] = 0; // Filter type 0
    for (let x = 0; x < width; x++) {
      const [r, g, b, a] = renderPixel(x, y, width, height);
      const pixelOffset = rowOffset + 1 + x * 4;
      rawData[pixelOffset] = r;
      rawData[pixelOffset + 1] = g;
      rawData[pixelOffset + 2] = b;
      rawData[pixelOffset + 3] = a;
    }
  }

  const compressed = zlib.deflateSync(rawData);

  function crc32(buf) {
    let crc = -1;
    for (let i = 0; i < buf.length; i++) {
      let c = buf[i];
      for (let j = 0; j < 8; j++) {
        crc = (crc >>> 1) ^ ((crc ^ c) & 1 ? 0xedb88320 : 0);
        c >>>= 1;
      }
    }
    return (crc ^ -1) >>> 0;
  }

  function chunk(type, data) {
    const lenBuf = Buffer.alloc(4);
    lenBuf.writeUInt32BE(data.length, 0);
    const typeBuf = Buffer.from(type, 'ascii');
    const crcBuf = Buffer.alloc(4);
    crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])), 0);
    return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
  }

  const header = Buffer.alloc(13);
  header.writeUInt32BE(width, 0);
  header.writeUInt32BE(height, 4);
  header[8] = 8; // Bit depth
  header[9] = 6; // Color type: RGBA
  header[10] = 0; // Compression
  header[11] = 0; // Filter
  header[12] = 0; // Interlace

  return Buffer.concat([
    Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]), // PNG Signature
    chunk('IHDR', header),
    chunk('IDAT', compressed),
    chunk('IEND', Buffer.alloc(0))
  ]);
}

// Render Euclid Smart Clipper Icon Pixel
function renderIconPixel(x, y, w, h) {
  const nx = x / w;
  const ny = y / h;
  const cx = nx - 0.5;
  const cy = ny - 0.5;

  // Squircle background radius
  const rx = Math.abs(cx) * 2;
  const ry = Math.abs(cy) * 2;
  const distSquircle = Math.pow(rx, 4) + Math.pow(ry, 4);

  if (distSquircle > 0.85) {
    return [0, 0, 0, 0]; // Transparent outside
  }

  // Corner Brackets (Lime Green #a3e635)
  const isCorner =
    (rx > 0.65 && ry > 0.65) &&
    (Math.abs(cx) > 0.35 || Math.abs(cy) > 0.35);
  if (isCorner && distSquircle < 0.82 && distSquircle > 0.60) {
    return [163, 230, 53, 255];
  }

  // Main E symbol area (Yellow #facc15 / #eab308)
  const isEBack = (nx >= 0.18 && nx <= 0.38 && ny >= 0.22 && ny <= 0.78);
  const isETop = (nx >= 0.18 && nx <= 0.68 && ny >= 0.22 && ny <= 0.34);
  const isEMid = (nx >= 0.18 && nx <= 0.58 && ny >= 0.44 && ny <= 0.56);
  const isEBot = (nx >= 0.18 && nx <= 0.68 && ny >= 0.66 && ny <= 0.78);

  // Document Sheet (White with green lines in right notch)
  const isDoc = (nx >= 0.42 && nx <= 0.78 && ny >= 0.34 && ny <= 0.68);
  const isDocLine = isDoc && (ny >= 0.42 && ny <= 0.48 && nx >= 0.48 && nx <= 0.68);

  // Scissors (Golden yellow)
  const isScissor = (nx >= 0.68 && nx <= 0.82 && ny >= 0.62 && ny <= 0.78);

  if (isETop || isEMid || isEBot || isEBack) {
    // 3D Highlight & Shadow gradient
    if (ny < 0.3) return [254, 240, 138, 255]; // Yellow highlight
    return [250, 204, 21, 255]; // Vivid yellow
  }

  if (isDocLine) {
    return [16, 185, 129, 255]; // Emerald green text line
  }

  if (isDoc) {
    return [255, 255, 255, 255]; // Paper white
  }

  if (isScissor) {
    return [234, 179, 8, 255]; // Gold scissor
  }

  // Emerald Green Background Gradient (#059669 -> #046c4e)
  const greenR = Math.round(5 - ny * 1);
  const greenG = Math.round(150 - ny * 42);
  const greenB = Math.round(105 - ny * 27);
  return [greenR, greenG, greenB, 255];
}

const dir = path.join(process.cwd(), 'public', 'icons');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

[16, 32, 48, 128, 512].forEach((size) => {
  const png = createPNG(size, size, renderIconPixel);
  fs.writeFileSync(path.join(dir, `icon${size}.png`), png);
  console.log(`Generated icon${size}.png`);
});
