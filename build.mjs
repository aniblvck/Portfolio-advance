// Runs on Vercel at deploy time. Fills in the site's real address so link previews
// (LinkedIn, WhatsApp, X) show the image, then writes sitemap.xml and robots.txt.
// Written so it can never fail a deployment.
import { readFileSync, writeFileSync } from "node:fs";

const host = (process.env.VERCEL_PROJECT_PRODUCTION_URL || process.env.VERCEL_URL || "")
  .replace(/^https?:\/\//, "").replace(/\/$/, "");
const site = host ? `https://${host}` : "";

try {
  const f = "public/index.html";
  writeFileSync(f, readFileSync(f, "utf8").replaceAll("__SITE_URL__", site));
  if (site) {
    writeFileSync("public/sitemap.xml",
      `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
      `  <url><loc>${site}/</loc><changefreq>monthly</changefreq><priority>1.0</priority></url>\n</urlset>\n`);
    writeFileSync("public/robots.txt", `User-agent: *\nAllow: /\nSitemap: ${site}/sitemap.xml\n`);
  }
  console.log("Link previews will use:", site || "relative paths (no site address available)");
} catch (e) {
  console.log("Note:", e.message);
}
