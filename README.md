# Anirudh Khade — Portfolio (Vercel package)

A static site plus a tiny deploy-time script. No dependencies, nothing to install.

| Path | What it is |
|---|---|
| `public/` | Everything visitors download: the site, images, résumé, icons, link-preview image, 404 page |
| `vercel.json` | Tells Vercel: plain static site, publish `public/`, short links, caching and safety headers |
| `build.mjs` | Runs during each deploy: puts your real web address into the link-preview tags and writes `sitemap.xml` |

## Deploy — option A (no terminal)
1. On GitHub create a **new** repository, click **uploading an existing file**, and drag in
   `build.mjs`, `vercel.json`, `README.md` **and the `public` folder itself**. Commit.
2. On Vercel: **Add New → Project → Import** that repository → **Deploy**. Leave all settings alone.

## Deploy — option B (terminal)
```bash
cd anirudh-portfolio-vercel
npx vercel --prod
```

## Reusing your old Vercel project instead?
Open **Settings → Build and Deployment → Root Directory** and clear it (your old site used `client`).
That is the one setting `vercel.json` cannot override.

## After it is live
- `/professional` or `/cv` → the professional CV view · `/cinematic` or `/3d` → the 3D catalog · `/resume` → the PDF
- `/#/eog`, `/#/parkinson`, `/#/lpg`, `/#/cycle`, `/#/gesture`, `/#/bci`, `/#/har`, `/#/adaroq`, `/#/manip` → a paper's page
- Check the link preview at https://www.linkedin.com/post-inspector/
- Added a custom domain later? Redeploy once so previews use it.
