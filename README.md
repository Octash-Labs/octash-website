# octash.co

The Octash website: plain HTML and CSS in Design System v2, with no build step.

## Pages

| URL | File |
|---|---|
| / | public/index.html |
| /farmers | public/farmers.html |
| /partners | public/partners.html |
| /join | public/join.html (form posts to the `octash-forms` Worker) |
| /privacy | public/privacy.html |

Old URLs redirect through `public/_redirects`. The blog at /blog is served by the separate `octash-blog` Worker and is not in this repo.

## Preview locally

```sh
npx wrangler dev        # or: python3 -m http.server -d public
```

## Deploy

```sh
npx wrangler deploy     # creates or updates the "octash-site" Worker on workers.dev
```

Pointing www.octash.co at this Worker replaces the live site, so it needs sign-off first.

## Copy and design sources

Copy and design were approved on 2026-11-15. Keep facts in line with the copy doc: free under 50 cows, no public price above that, no languages or dates beyond December 2026, company name "Octash Labs Ltd.".
