const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// Helper to create uncompressed PNG buffer using standard Node.js
function createSolidPng(width, height, drawIconFn) {
  // RGBA buffer
  const buffer = Buffer.alloc(width * height * 4);

  // Fill pixels
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4;
      const [r, g, b, a] = drawIconFn(x, y, width, height);
      buffer[idx] = r;
      buffer[idx + 1] = g;
      buffer[idx + 2] = b;
      buffer[idx + 3] = a;
    }
  }

  // Build PNG with scanlines (filter type 0 = None)
  const rawData = Buffer.alloc(height * (width * 4 + 1));
  for (let y = 0; y < height; y++) {
    rawData[y * (width * 4 + 1)] = 0; // Filter None
    buffer.copy(rawData, y * (width * 4 + 1) + 1, y * width * 4, (y + 1) * width * 4);
  }

  const deflated = zlib.deflateSync(rawData);

  // PNG Header
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 6; // color type RGBA
  ihdr[10] = 0; // compression method
  ihdr[11] = 0; // filter method
  ihdr[12] = 0; // interlace method

  const ihdrChunk = createChunk('IHDR', ihdr);
  const idatChunk = createChunk('IDAT', deflated);
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function createChunk(type, data) {
  const length = Buffer.alloc(4);
  length.writeUInt32BE(data.length, 0);

  const typeBuf = Buffer.from(type, 'ascii');
  const crcData = Buffer.concat([typeBuf, data]);

  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(crcData), 0);

  return Buffer.concat([length, typeBuf, data, crcBuf]);
}

// CRC32 implementation
function crc32(buf) {
  let crc = 0 ^ (-1);
  for (let i = 0; i < buf.length; i++) {
    crc = (crc >>> 8) ^ crcTable[(crc ^ buf[i]) & 0xFF];
  }
  return (crc ^ (-1)) >>> 0;
}

const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) {
    c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
  }
  crcTable[n] = c;
}

// Draw MediNova Brand Icon (Teal/Emerald gradient rounded background with white cross & heartbeat pulse)
function drawMediNovaLogo(x, y, w, h) {
  const nx = x / w;
  const ny = y / h;

  // Background rounded rect gradient from #0d9488 (13, 148, 136) to #0284c7 (2, 132, 199)
  const cornerRadius = 0.22;
  const dx = Math.max(0, Math.max(cornerRadius - nx, nx - (1 - cornerRadius)));
  const dy = Math.max(0, Math.max(cornerRadius - ny, ny - (1 - cornerRadius)));
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > cornerRadius) {
    return [0, 0, 0, 0]; // Transparent outside rounded corner
  }

  // Gradient bg
  const bgR = Math.round(13 + (2 - 13) * ny);
  const bgG = Math.round(148 + (132 - 148) * nx);
  const bgB = Math.round(136 + (199 - 136) * ((nx + ny) / 2));

  // Medical Cross & Pulse Wave
  const cx = nx - 0.5;
  const cy = ny - 0.5;

  // Outer circle ring
  const circleDist = Math.sqrt(cx * cx + cy * cy);
  const isRing = circleDist > 0.32 && circleDist < 0.36;

  // Pulse segments
  function distToSegment(px, py, x1, y1, x2, y2) {
    const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    if (l2 === 0) return Math.hypot(px - x1, py - y1);
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));
    return Math.hypot(px - (x1 + t * (x2 - x1)), py - (y1 + t * (y2 - y1)));
  }

  const pulseWidth = 0.038;
  const segments = [
    [-0.32, 0, -0.15, 0],
    [-0.15, 0, -0.07, -0.18],
    [-0.07, -0.18, 0.04, 0.20],
    [0.04, 0.20, 0.12, -0.09],
    [0.12, -0.09, 0.20, 0],
    [0.20, 0, 0.32, 0]
  ];

  let isPulse = false;
  for (const [x1, y1, x2, y2] of segments) {
    if (distToSegment(cx, cy, x1, y1, x2, y2) < pulseWidth) {
      isPulse = true;
      break;
    }
  }

  // Cross shield accent dot at top
  const isShieldDot = Math.hypot(cx, cy + 0.28) < 0.055;

  if (isPulse || isRing || isShieldDot) {
    return [255, 255, 255, 255]; // Pure crisp white
  }

  return [bgR, bgG, bgB, 255];
}

const publicDir = path.join(__dirname, '..', 'public');
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// Generate 192x192
const icon192 = createSolidPng(192, 192, drawMediNovaLogo);
fs.writeFileSync(path.join(publicDir, 'icon-192.png'), icon192);

// Generate 512x512
const icon512 = createSolidPng(512, 512, drawMediNovaLogo);
fs.writeFileSync(path.join(publicDir, 'icon-512.png'), icon512);

// Generate maskable 512x512
fs.writeFileSync(path.join(publicDir, 'icon-maskable.png'), icon512);

// Generate apple-touch-icon.png (180x180)
const appleIcon = createSolidPng(180, 180, drawMediNovaLogo);
fs.writeFileSync(path.join(publicDir, 'apple-touch-icon.png'), appleIcon);

// Generate favicon.png
const favicon32 = createSolidPng(32, 32, drawMediNovaLogo);
fs.writeFileSync(path.join(publicDir, 'favicon.png'), favicon32);

console.log('App icons generated successfully in public/ directory!');
