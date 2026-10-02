# Anirudh Khade — Portfolio (Vercel package)

Every file sits at the top level — there are no folders to lose during upload.

## Deploy / update through GitHub (no terminal)
1. Unzip, then open the `anirudh-portfolio-vercel` folder.
2. Select **all** files inside it (Ctrl+A / Cmd+A).
3. In your GitHub repository: **Add file → Upload files**, drag the selected files in, then **Commit changes**.
4. Vercel deploys automatically (new project: **Add New → Project → Import** the repository → **Deploy**, leaving settings alone).

## Deploy with the terminal instead
```bash
cd anirudh-portfolio-vercel
npx vercel --prod
```

## What the files are
- `index.html` — the whole site · `404.html` — page for broken links
- `*.webp`, `og.jpg`, `*.png`, `favicon.svg`, `site.webmanifest` — images, link-preview card and icons
- `Anirudh_Khade_Resume.pdf` — résumé (also at `/resume`)
- `vercel.json` — tells Vercel how to publish · `build.mjs` — runs during each deploy: gathers the files into `dist/`,
  fills your web address into the link-preview tags, writes `sitemap.xml`

## If a deploy ever fails
Open the build log: it states exactly which files are missing. Upload them to the repository's top level.

## Handy links once live
`/professional` or `/cv` (CV view) · `/cinematic` or `/3d` (3D catalog) · `/resume` (PDF) ·
`/#/eog`, `/#/parkinson`, `/#/lpg`, `/#/cycle`, `/#/gesture`, `/#/bci`, `/#/har`, `/#/adaroq`, `/#/manip` (a paper's page)
