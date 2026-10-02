// Runs on Vercel at deploy time.
// 1. Collects the site files from wherever they were uploaded (repository root, a public/
//    folder or any sub-folder) into dist/, the folder Vercel publishes.
// 2. Puts the site's real address into the link-preview tags; writes sitemap.xml and robots.txt.
import { readdirSync, statSync, mkdirSync, copyFileSync, readFileSync, writeFileSync, rmSync, existsSync } from "node:fs";
import { join, basename, sep } from "node:path";

const OUT = "dist";
const SKIP_DIRS = new Set([".git", ".github", ".vercel", "node_modules", OUT]);
const SKIP_FILES = new Set(["build.mjs", "vercel.json", "README.md", "package.json", "package-lock.json", ".gitignore", ".DS_Store", "Thumbs.db"]);

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) { if (!SKIP_DIRS.has(name)) walk(p, out); }
    else if (!SKIP_FILES.has(name)) out.push(p);
  }
  return out;
}

rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT);
const files = walk(".").sort((a, b) => a.split(sep).length - b.split(sep).length);   // shallowest copy wins
const placed = new Set();
for (const f of files) {
  const name = basename(f);
  if (placed.has(name)) continue;
  copyFileSync(f, join(OUT, name));
  placed.add(name);
}

if (!placed.has("index.html")) {
  console.error("\nindex.html was not found in the repository.");
  console.error("Upload ALL the files from the zip (select them all and drag them onto GitHub), not only build.mjs, vercel.json and README.md.\n");
  process.exit(1);
}

let html = readFileSync(join(OUT, "index.html"), "utf8");
const wanted = [...new Set([...html.matchAll(/"\/([\w.-]+\.(?:webp|pdf|jpg|png|svg|webmanifest))"/g)].map(m => m[1]))];
const missing = wanted.filter(n => !placed.has(n));
if (missing.length) console.log("Warning: these files are missing, so parts of the site won't show:", missing.join(", "));

const host = (process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || "")
  .replace(/^https?:\/\//, "").replace(/\/$/, "");
const site = host ? `https://${host}` : "";
writeFileSync(join(OUT, "index.html"), html.replaceAll("__SITE_URL__", site));
if (site) {
  writeFileSync(join(OUT, "sitemap.xml"),
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    `  <url><loc>${site}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>\n`);
  writeFileSync(join(OUT, "robots.txt"), `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
}
console.log(`Published ${placed.size} files · link previews use ${site || "relative paths"}`);
