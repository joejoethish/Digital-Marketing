// Runs after `next build` (npm "postbuild"). Lists every page and static asset
// the site needs so the browser can download them all up-front for offline use.
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const nextDir = path.join(root, '.next');
const publicDir = path.join(root, 'public');
const OUT = 'precache-manifest.json';

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

const toUrl = (base, file, prefix) => prefix + path.relative(base, file).split(path.sep).join('/');

const version = fs.readFileSync(path.join(nextDir, 'BUILD_ID'), 'utf8').trim();

// Pages: every prerendered route except internal / metadata routes.
const prerender = JSON.parse(fs.readFileSync(path.join(nextDir, 'prerender-manifest.json'), 'utf8'));
const pages = Object.keys(prerender.routes)
  .filter((r) => !r.startsWith('/_') && !/\.(txt|xml|ico)$/.test(r))
  .sort();

// Build output: JS chunks, CSS and self-hosted fonts.
const staticDir = path.join(nextDir, 'static');
const assets = walk(staticDir)
  .filter((f) => !f.endsWith('.map'))
  .map((f) => toUrl(staticDir, f, '/_next/static/'));

// Public files — only those the built site actually references.
const builtText = [...walk(path.join(nextDir, 'server', 'app')), ...walk(staticDir)]
  .filter((f) => /\.(html|js|css|rsc)$/.test(f))
  .map((f) => fs.readFileSync(f, 'utf8'))
  .join('\n');
const publicAssets = walk(publicDir)
  .map((f) => toUrl(publicDir, f, '/'))
  .filter((u) => u !== `/${OUT}` && u !== '/sw.js' && builtText.includes(u));

const manifest = { version, pages, assets: ['/favicon.ico', ...publicAssets, ...assets] };
fs.writeFileSync(path.join(publicDir, OUT), JSON.stringify(manifest));

const bytes = manifest.assets.reduce((sum, u) => {
  const file = u.startsWith('/_next/static/')
    ? path.join(staticDir, u.slice('/_next/static/'.length))
    : path.join(publicDir, u.slice(1));
  return sum + (fs.existsSync(file) ? fs.statSync(file).size : 0);
}, 0);
console.log(
  `precache: ${pages.length} pages, ${manifest.assets.length} assets (${(bytes / 1024).toFixed(0)} KB) → public/${OUT}`,
);
