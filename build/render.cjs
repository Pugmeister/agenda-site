/* ============================================================
   Agenda SSG — статическая генерация сайта из React-компонентов.
   ЗАПУСК ИЗ КОРНЯ ПРОЕКТА:  npm run build   (или: node build/render.cjs)
   Зависимостей нет: нужны только Node.js 18+ (npm install не требуется).
   ============================================================ */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..');
const VENDOR = path.join(ROOT, 'vendor');
const SRC = path.join(ROOT, 'src');
const DIST = path.join(ROOT, 'dist');

/* Загрузчик UMD-библиотек без npm: react-dom-server делает require('react'),
   поэтому даём ему шим, возвращающий уже загруженный React */
function loadUMD(file, shims) {
  const src = fs.readFileSync(file, 'utf8');
  const mod = { exports: {} };
  const wrapper = vm.runInThisContext('(function (module, exports, require){\n' + src + '\n})', { filename: file });
  wrapper(mod, mod.exports, function (name) {
    if (shims && shims[name]) return shims[name];
    throw new Error('Неожиданный require: ' + name);
  });
  return mod.exports;
}

const React = loadUMD(path.join(VENDOR, 'react.min.js'));
const ReactDOMServer = loadUMD(path.join(VENDOR, 'react-dom-server-legacy.min.js'), { react: React });
const Babel = loadUMD(path.join(VENDOR, 'babel.min.js'));

/* ---------- 1. Компиляция исходников (по порядку зависимостей) ---------- */
const FILES = [
  'data/site.js', 'data/services.js', 'data/cases.js', 'data/clients.js', 'data/team.js',
  'components/Icons.jsx', 'components/Reveal.jsx', 'components/Counter.jsx',
  'components/Marquee.jsx', 'components/Breadcrumbs.jsx', 'components/PageHero.jsx',
  'components/CaseVisual.jsx', 'components/CaseStats.jsx', 'components/CaseCard.jsx',
  'components/CasesGrid.jsx', 'components/ClientsField.jsx', 'components/ClientsSection.jsx',
  'components/TeamCard.jsx', 'components/TeamSection.jsx', 'components/ContactsBlock.jsx',
  'components/Header.jsx', 'components/MobileMenu.jsx', 'components/Footer.jsx',
  'components/Preloader.jsx', 'components/Hero.jsx', 'components/Stats.jsx',
  'components/CasesSection.jsx', 'components/ServicesGrid.jsx', 'components/CaseDetail.jsx',
  'pages/home.jsx', 'pages/services.jsx', 'pages/cases.jsx', 'pages/case-detail.jsx',
  'pages/clients.jsx', 'pages/about.jsx', 'pages/contacts.jsx', 'pages/notfound.jsx',
  'pages/index.js',
];

const code = FILES.map((f) => {
  const src = fs.readFileSync(path.join(SRC, f), 'utf8');
  const out = Babel.transform(src, {
    presets: [[Babel.availablePresets['react'], { runtime: 'classic' }]],
    filename: f, compact: false,
  }).code;
  return '/* ---- ' + f + ' ---- */\n' + out;
}).join('\n;\n');

const sandbox = { React, ReactDOMServer, console, setTimeout, clearTimeout };
vm.createContext(sandbox);
vm.runInContext(code, sandbox, { filename: 'app.js' });
const { AGENDA_PAGES } = sandbox.__OUT__;
console.log('компоненты скомпилированы, страниц:', AGENDA_PAGES.length);

/* ---------- 2. HTML-каркас с SEO ---------- */
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function renderShell(prefix, el) {
  sandbox.__P__ = prefix;
  return ReactDOMServer.renderToStaticMarkup(el);
}

function jsonLdScript(obj) {
  return '<script type="application/ld+json">' + JSON.stringify(obj).replace(/</g, '\\u003c') + '</script>';
}

/* фиктивный компонент — контейнеры кастомного курсора */
sandbox.CursorPlaceholders = function CursorPlaceholders() {
  return React.createElement(
    React.Fragment, null,
    React.createElement('div', { className: 'cursor-dot', 'aria-hidden': 'true' }),
    React.createElement('div', { className: 'cursor-ring', 'aria-hidden': 'true' },
      React.createElement('i', null)),
  );
};

/* домен берём из данных (src/data/site.js): const в vm не свойство объекта,
   поэтому вычисляем выражение в контексте */
sandbox.__P__ = '';
sandbox.SITE = vm.runInContext('SITE', sandbox);
const SITE_DOMAIN = sandbox.SITE.domain;

function layout(page, mainHtml) {
  const P = '../'.repeat(page.depth || 0);
  const route = page.route || '';
  const url = SITE_DOMAIN + '/' + route;
  const ogImg = SITE_DOMAIN + (page.ogImage || '/assets/img/og-cover.jpg');
  const robots = page.noindex
    ? '<meta name="robots" content="noindex, nofollow">'
    : '<meta name="robots" content="index, follow">';

  return `<!DOCTYPE html>
<html lang="ru">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(page.title)}</title>
<meta name="description" content="${esc(page.desc)}">
${robots}
<link rel="canonical" href="${url}">
<meta property="og:type" content="${page.ogType || 'website'}">
<meta property="og:site_name" content="Agenda">
<meta property="og:title" content="${esc(page.title)}">
<meta property="og:description" content="${esc(page.desc)}">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${ogImg}">
<meta property="og:locale" content="ru_RU">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(page.title)}">
<meta name="twitter:description" content="${esc(page.desc)}">
<meta name="theme-color" content="#B26B52">
<link rel="icon" type="image/svg+xml" href="${P}assets/img/favicon.svg">
<link rel="stylesheet" href="${P}assets/css/site.css?v=1.4">
<script>document.documentElement.classList.add('js');</script>
${(page.jsonld || []).map(jsonLdScript).join('\n')}
</head>
<body>
<div class="bg-fx" aria-hidden="true"><i class="b1"></i><i class="b2"></i><i class="b3"></i><i class="ring"></i><i class="sh sh1"></i><i class="sh sh2"></i><i class="sh sh3"></i><i class="sh sh4"></i><i class="grain"></i></div>
${page.preload ? renderShell(P, React.createElement(sandbox.Preloader)) : ''}
${renderShell(P, React.createElement(sandbox.CursorPlaceholders))}
${renderShell(P, React.createElement(sandbox.Header, { active: '/' + route }))}
<main>
${mainHtml}
</main>
${renderShell(P, React.createElement(sandbox.Footer))}
${renderShell(P, React.createElement(sandbox.MobileMenu))}
<script src="${P}assets/js/site.js?v=1.4" defer></script>
</body>
</html>
`;
}

/* ---------- 3. Генерация страниц ---------- */
fs.rmSync(DIST, { recursive: true, force: true });
fs.mkdirSync(DIST, { recursive: true });

for (const page of AGENDA_PAGES) {
  const P = '../'.repeat(page.depth || 0);
  sandbox.__P__ = P;
  const mainHtml = ReactDOMServer.renderToStaticMarkup(page.el);
  const html = layout(page, mainHtml);
  const outPath = page.route.endsWith('.html')
    ? path.join(DIST, page.route)
    : path.join(DIST, page.route, 'index.html');
  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, html);
  console.log('  +', path.relative(DIST, outPath));
}

/* ---------- 4. Статические файлы ---------- */
fs.cpSync(path.join(SRC, 'styles/site.css'), path.join(DIST, 'assets/css/site.css'));
fs.cpSync(path.join(SRC, 'assets/js/site.js'), path.join(DIST, 'assets/js/site.js'));
fs.cpSync(path.join(SRC, 'assets/img'), path.join(DIST, 'assets/img'), { recursive: true });
fs.cpSync(path.join(SRC, 'assets/fonts'), path.join(DIST, 'assets/fonts'), { recursive: true });

/* favicon */
fs.writeFileSync(path.join(DIST, 'assets/img/favicon.svg'),
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#B26B52"/><text x="30" y="44" font-family="Arial,sans-serif" font-size="36" font-weight="800" fill="#F7F1EA" text-anchor="middle">a</text><circle cx="47" cy="41" r="4.5" fill="#F7F1EA"/></svg>`);

/* robots.txt + sitemap.xml */
fs.writeFileSync(path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nSitemap: ${SITE_DOMAIN}/sitemap.xml\n`);

/* флаг для GitHub Pages: не запускать Jekyll поверх готового сайта */
fs.writeFileSync(path.join(DIST, '.nojekyll'), '');

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${AGENDA_PAGES.filter((p) => !p.noindex).map((p) => `  <url>
    <loc>${SITE_DOMAIN}/${p.route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${p.route === '' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${p.route === '' ? '1.0' : p.route.startsWith('cases/') && !p.route.endsWith('cases/') ? '0.8' : '0.7'}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemap);

console.log('DONE. dist:', fs.readdirSync(DIST).join(', '));
