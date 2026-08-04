import fs from 'fs';
import path from 'path';
import AdmZip from 'adm-zip';

console.log('🛡️  Starting Security & Remote Code Verification...');

const rootDir = process.cwd();
const distDir = path.resolve(rootDir, 'dist');
const srcDir = path.resolve(rootDir, 'src');
const releaseDir = path.resolve(rootDir, 'release');

// Forbidden URLs and popup auth methods
const forbiddenStrings = [
  'apis.google.com/js/api.js',
  'google.com/recaptcha/api.js',
  'google.com/recaptcha/enterprise.js',
  'signInWithPopup',
  'signInWithRedirect',
  'linkWithPopup',
  'reauthenticateWithPopup',
];

// Patterns representing active remote script assignments
const forbiddenPatterns = [
  /gapiScript\s*:\s*["']http/i,
  /recaptchaV2Script\s*:\s*["']http/i,
  /recaptchaEnterpriseScript\s*:\s*["']http/i,
  /gapiScript\s*=\s*["']http/i,
  /recaptchaV2Script\s*=\s*["']http/i,
  /recaptchaEnterpriseScript\s*=\s*["']http/i,
];

let errorCount = 0;

// Helper to inspect string content for forbidden targets
function checkContent(content, locationIdentifier) {
  for (const forbidden of forbiddenStrings) {
    if (content.includes(forbidden)) {
      console.error(`❌ Violation in ${locationIdentifier}: Found forbidden string "${forbidden}"`);
      errorCount++;
    }
  }
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(content)) {
      console.error(`❌ Violation in ${locationIdentifier}: Found active remote script pattern ${pattern}`);
      errorCount++;
    }
  }
}

// 1. Scan dist directory (excluding manifest.json connect-src CSP header)
if (fs.existsSync(distDir)) {
  console.log('🔍 Scanning compiled output (dist/)...');
  function scanDir(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanDir(fullPath);
      } else if (entry.isFile()) {
        if (/\.(png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot)$/i.test(entry.name)) continue;
        if (entry.name === 'manifest.json') continue; // CSP configuration
        const text = fs.readFileSync(fullPath, 'utf-8');
        const relPath = path.relative(rootDir, fullPath);
        checkContent(text, relPath);
      }
    }
  }
  scanDir(distDir);
} else {
  console.error('❌ dist/ directory does not exist.');
  errorCount++;
}

// 2. Scan src directory
if (fs.existsSync(srcDir)) {
  console.log('🔍 Scanning extension source files (src/)...');
  function scanSrc(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        scanSrc(fullPath);
      } else if (entry.isFile() && /\.(ts|tsx|js|jsx)$/i.test(entry.name)) {
        const text = fs.readFileSync(fullPath, 'utf-8');
        const relPath = path.relative(rootDir, fullPath);
        checkContent(text, relPath);
      }
    }
  }
  scanSrc(srcDir);
}

// 3. Scan ZIP archive in release/
if (fs.existsSync(releaseDir)) {
  console.log('🔍 Scanning packaged ZIP in release/...');
  const zipFiles = fs.readdirSync(releaseDir).filter((f) => f.endsWith('.zip'));
  for (const zipFile of zipFiles) {
    const zipPath = path.join(releaseDir, zipFile);
    try {
      const zip = new AdmZip(zipPath);
      for (const entry of zip.getEntries()) {
        if (entry.isDirectory) continue;
        if (/\.(png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot)$/i.test(entry.entryName)) continue;
        if (entry.entryName === 'manifest.json') continue;
        const content = entry.getData().toString('utf-8');
        checkContent(content, `${zipFile}:${entry.entryName}`);
      }
    } catch (e) {
      console.error(`❌ Failed to read ZIP file ${zipFile}: ${e.message}`);
      errorCount++;
    }
  }
}

if (errorCount > 0) {
  console.error(`\n❌ Security verification FAILED with ${errorCount} forbidden code violation(s).`);
  process.exit(1);
}

console.log('✅ Security & Remote Code Verification PASSED! No forbidden strings or remote script loaders detected.\n');
