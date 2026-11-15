// Builds the deployable site into dist/.
//
// Pages are body fragments in src/pages/, wrapped here in one shared head,
// header and footer. Blog posts are Markdown files in posts/, written through
// Pages CMS (.pages.yml), and are rendered into /blog and /blog/<slug>.
// Nothing is fetched at runtime: the old Hashnode-backed blog Worker broke
// when Hashnode's API stopped serving it.

import { readFileSync, writeFileSync, mkdirSync, rmSync, readdirSync, cpSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { marked } from 'marked';
import { parse as parseYaml } from 'yaml';

const ROOT = new URL('..', import.meta.url).pathname;
const DIST = join(ROOT, 'dist');
const SITE = 'https://www.octash.co';
const GTM = 'GTM-5N99FLKQ';

const esc = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const fmtDate = (d) => d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Africa/Lagos' });
const isoDate = (d) => d.toISOString().slice(0, 10);
const absUrl = (p) => (p && p.startsWith('/') ? SITE + p : p);

const MARK = '<svg viewBox="0 0 96 96" width="34" height="34" aria-hidden="true"><rect x="19.5" y="14" width="9" height="64" rx="1.5" fill="#008724"/><rect x="43.5" y="23" width="9" height="50" rx="1.5" fill="#008724"/><rect x="67.5" y="14" width="9" height="64" rx="1.5" fill="#008724"/><rect x="15" y="43" width="66" height="10" rx="1.5" fill="#008724"/></svg>';

// --- layout -------------------------------------------------------------------

function head({ title, description, path, image, type = 'website', noindex = false, extra = '' }) {
  const url = SITE + path;
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(description)}">
${noindex ? '<meta name="robots" content="noindex">' : `<link rel="canonical" href="${url}">`}
<meta property="og:type" content="${type}">
<meta property="og:site_name" content="Octash">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${url}">
${image ? `<meta property="og:image" content="${esc(absUrl(image))}">\n<meta name="twitter:card" content="summary_large_image">\n` : ''}<meta name="theme-color" content="#FAF6EF">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&amp;family=Noto+Serif:wght@600&amp;family=Inter:wght@400;500;600&amp;display=swap" rel="stylesheet">
<link rel="stylesheet" href="/assets/site.css">
<script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM}');</script>
${extra}</head>
<body>
<noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
<a class="skip" href="#main">Skip to content</a>
`;
}

function header(current = '') {
  const a = (href, label, key) => `<a href="${href}"${key === current ? ' aria-current="page"' : ''}>${label}</a>`;
  return `<header class="site-header">
  <div class="wrap">
    <a class="brand" href="/" aria-label="Octash home">${MARK}<span class="serif">Octash</span></a>
    <nav class="nav" aria-label="Main">
      ${a('/farmers', 'Farmers', 'farmers')}
      ${a('/partners', 'Partners', 'partners')}
      ${a('/blog', 'Blog', 'blog')}
      <a class="btn" href="/join">Save my farm's place</a>
    </nav>
  </div>
</header>
<main id="main">
`;
}

function footer(scripts = '') {
  return `</main>
<footer class="foot">
  <div class="wrap">
    <div><span class="serif" style="font-size:22px;color:#FFFFFF">Octash Labs Ltd.</span></div>
    <nav aria-label="Footer"><a href="/farmers">Farmers</a><a href="/partners">Partners</a><a href="/blog">Blog</a><a href="/join">Save your place</a><a href="/privacy">Privacy</a></nav>
    <div class="contact">
      <a href="mailto:contact@octash.co">contact@octash.co</a>
      <a href="https://wa.me/2348081094648">WhatsApp 0808 109 4648</a>
      <span>&copy; ${new Date().getFullYear()} Octash Labs Ltd.</span>
    </div>
  </div>
</footer>
${scripts}</body>
</html>
`;
}

// --- pages --------------------------------------------------------------------

const PAGES = [
  { file: 'index', path: '/', nav: '', title: 'Octash | Milk and breeding records for Nigerian dairy farms',
    description: 'A phone app that keeps the milk, breeding and health record of every cow. Works without internet. Free for farms under 50 cows.' },
  { file: 'farmers', path: '/farmers', nav: 'farmers', title: 'Octash for farmers | Know what every cow gives',
    description: 'Litres per cow, breeding reminders and a record that proves what your cows are worth. Free for farms under 50 cows.' },
  { file: 'partners', path: '/partners', nav: 'partners', title: 'Octash for partners | Records across your farmer network',
    description: 'Cooperatives, processors, programmes and lenders: give each farm a daily record per cow and see anonymised totals across your network, with consent.' },
  { file: 'join', path: '/join', nav: '', title: 'Save your place | Octash',
    description: 'Be one of the first farms on Octash. The first release goes to these farms in December 2026.',
    scripts: '<script src="/assets/join.js" defer></script>\n' },
  { file: 'privacy', path: '/privacy', nav: '', title: 'Privacy | Octash',
    description: 'What the Octash website collects, why, how long we keep it, and how to ask us to delete it.' },
  { file: '404', path: '/404', nav: '', title: 'Page not found | Octash', description: 'This page does not exist.', noindex: true },
];

// --- posts --------------------------------------------------------------------

function readPost(file) {
  const raw = readFileSync(join(ROOT, 'posts', file), 'utf8');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) throw new Error(`posts/${file}: missing front matter (--- block at the top)`);
  const meta = parseYaml(m[1]) || {};
  const body = m[2];

  const fileDate = file.match(/^(\d{4}-\d{2}-\d{2})-/)?.[1];
  const slug = String(meta.slug || file.replace(/^\d{4}-\d{2}-\d{2}-/, '').replace(/\.md$/, '')).trim();
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) throw new Error(`posts/${file}: web address "${slug}" may only use lowercase letters, numbers and hyphens`);
  if (!meta.title) throw new Error(`posts/${file}: title is required`);
  const date = meta.date ? new Date(meta.date) : fileDate ? new Date(fileDate) : null;
  if (!date || Number.isNaN(date.getTime())) throw new Error(`posts/${file}: needs a publish date`);

  const firstPara = (body.split(/\n\s*\n/).find((p) => p.trim() && !/^\s*(#|---|!\[)/.test(p)) || '')
    .replace(/[*_`>#\[\]]/g, '').replace(/\(.*?\)/g, '').replace(/\s+/g, ' ').trim();
  const description = String(meta.description || firstPara).trim();
  const words = body.split(/\s+/).filter(Boolean).length;

  return {
    file, slug,
    title: String(meta.title).replace(/\s+/g, ' ').trim(),
    description: description.length > 180 ? description.slice(0, 177).replace(/\s+\S*$/, '') + '...' : description,
    date,
    cover: meta.cover ? String(meta.cover) : null,
    tags: Array.isArray(meta.tags) ? meta.tags.map(String) : [],
    draft: meta.draft === true,
    readMinutes: Math.max(1, Math.round(words / 220)),
    html: marked.parse(body),
  };
}

const CTA = `
  <section class="finale">
    <div class="wrap" style="padding-top:96px;padding-bottom:96px;display:flex;flex-direction:column;align-items:flex-start;gap:24px">
      <h2 class="serif" style="margin:0;font-size:clamp(32px,4vw,48px);line-height:1.1;max-width:820px">Start with the cows you have.</h2>
      <a class="btn btn-light" href="/join">Save my farm's place</a>
    </div>
  </section>
`;

function postPage(p) {
  const path = `/blog/${p.slug}`;
  const jsonLd = {
    '@context': 'https://schema.org', '@type': 'BlogPosting',
    headline: p.title, description: p.description, datePublished: isoDate(p.date),
    ...(p.cover ? { image: absUrl(p.cover) } : {}),
    mainEntityOfPage: SITE + path,
    publisher: { '@type': 'Organization', name: 'Octash Labs Ltd.', url: SITE },
  };
  return head({ title: `${p.title} | Octash`, description: p.description, path, image: p.cover, type: 'article',
    extra: `<script type="application/ld+json">${JSON.stringify(jsonLd).replace(/</g, '\\u003c')}</script>\n` })
    + header('blog') + `
  <article class="wrap post">
    <a class="back" href="/blog">All posts</a>
    <p class="post-meta">${fmtDate(p.date)} · ${p.readMinutes} min read</p>
    <h1 class="serif">${esc(p.title)}</h1>
    ${p.cover ? `<img class="post-cover" src="${esc(p.cover)}" alt="">` : ''}
    <div class="prose">${p.html}</div>
  </article>
` + CTA + footer();
}

function indexPage(posts) {
  const cards = posts.map((p) => `
      <article class="card post-card">
        ${p.cover ? `<a href="/blog/${p.slug}" tabindex="-1" aria-hidden="true"><img src="${esc(p.cover)}" alt="" loading="lazy"></a>` : ''}
        <div class="post-card-body">
          <p class="post-meta">${fmtDate(p.date)} · ${p.readMinutes} min read</p>
          <h2 class="serif"><a href="/blog/${p.slug}">${esc(p.title)}</a></h2>
          <p>${esc(p.description)}</p>
        </div>
      </article>`).join('\n');
  return head({ title: 'Blog | Octash', description: 'Notes on Nigerian dairy farming, herd records and what we learn on our own farm.', path: '/blog' })
    + header('blog') + `
  <section class="wrap" style="padding-top:80px;padding-bottom:40px;display:flex;flex-direction:column;gap:20px;max-width:1000px">
    <p class="eyebrow">Blog</p>
    <h1 class="serif" style="margin:0;font-size:clamp(40px,5.2vw,64px);line-height:1.06">Notes from Nigerian dairy</h1>
    <p class="lead">What we learn keeping records on our own farm, and what it means for yours.</p>
  </section>
  <section class="wrap post-list">
${cards || '    <p class="lead">No posts yet. Check back soon.</p>'}
  </section>
` + footer();
}

// --- build --------------------------------------------------------------------

rmSync(DIST, { recursive: true, force: true });
mkdirSync(DIST, { recursive: true });
cpSync(join(ROOT, 'src/static'), DIST, { recursive: true });
cpSync(join(ROOT, 'src/assets'), join(DIST, 'assets'), { recursive: true });
if (existsSync(join(ROOT, 'media'))) cpSync(join(ROOT, 'media'), join(DIST, 'media'), { recursive: true });

for (const pg of PAGES) {
  const body = readFileSync(join(ROOT, 'src/pages', `${pg.file}.html`), 'utf8');
  writeFileSync(join(DIST, `${pg.file}.html`), head(pg) + header(pg.nav) + body + footer(pg.scripts));
}

const postsDir = join(ROOT, 'posts');
const all = existsSync(postsDir) ? readdirSync(postsDir).filter((f) => f.endsWith('.md')).map(readPost) : [];
const posts = all.filter((p) => !p.draft).sort((a, b) => b.date - a.date);
const seen = new Map();
mkdirSync(join(DIST, 'blog'), { recursive: true });
for (const p of posts) {
  if (seen.has(p.slug)) throw new Error(`posts/${p.file} and posts/${seen.get(p.slug)} share the web address "${p.slug}"`);
  seen.set(p.slug, p.file);
  writeFileSync(join(DIST, 'blog', `${p.slug}.html`), postPage(p));
}
writeFileSync(join(DIST, 'blog.html'), indexPage(posts));

const urls = [
  ...PAGES.filter((p) => !p.noindex).map((p) => [p.path, null]),
  ['/blog', posts[0] ? isoDate(posts[0].date) : null],
  ...posts.map((p) => [`/blog/${p.slug}`, isoDate(p.date)]),
];
writeFileSync(join(DIST, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(([u, d]) => `  <url><loc>${SITE}${u}</loc>${d ? `<lastmod>${d}</lastmod>` : ''}</url>`).join('\n')}
</urlset>
`);

console.log(`Built ${PAGES.length} pages and ${posts.length} post(s)${all.length - posts.length ? `, skipped ${all.length - posts.length} draft(s)` : ''} into dist/`);
