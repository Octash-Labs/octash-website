# octash.co

The Octash website, in Design System v2. Plain HTML and CSS with a small build step, deployed by Cloudflare Workers Builds. The blog is written in Pages CMS, the same setup as the Mora website.

## How it builds
`npm run build` (scripts/build.mjs) writes `dist/`:
- Pages: body fragments in `src/pages/` wrapped in one shared head, header and footer. Header and footer live only in the build script, so they match on every page.
- Blog: each `posts/*.md` becomes `/blog/<slug>`, plus the `/blog` index and sitemap entries. Images go in `media/`.
- `src/assets/` (CSS, JS) and `src/static/` (favicon, robots, `_redirects`, `_headers`) are copied as they are.

## Blog (Pages CMS)
Config is `.pages.yml`. Sign in at pagescms.org with GitHub, open this repo, and write under "Blog posts". A post's address comes from its "Web address" field, else its file name without the date. Drafts are skipped. Pages CMS commits straight to `main`, so a published post goes live on the next deploy.

## Deploy
Cloudflare Workers Builds runs `npm run build` then `npx wrangler deploy` for the `octash-site` Worker on every push to `main`, and a preview for other branches. The www.octash.co domain is set in the Cloudflare dashboard, never in wrangler.jsonc.

## Pages
| URL | Source |
|---|---|
| / | src/pages/index.html |
| /farmers | src/pages/farmers.html |
| /partners | src/pages/partners.html |
| /join | src/pages/join.html (form posts to the `octash-forms` Worker) |
| /privacy | src/pages/privacy.html |
| /blog, /blog/<slug> | posts/*.md |

Old URLs redirect through `src/static/_redirects`.

## Rules
- No em dashes in copy.
- Company name is "Octash Labs Ltd.".
- Copy describes only what is in the app today: free under 50 cows, no public price above that, no languages or dates beyond December 2026.
