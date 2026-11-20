# Agenda — многостраничный сайт (React-структура → статический HTML)

Сайт-портфолио маркетингового дуэта «Agenda» (Севастьянова Александра + Мельников Артём).
Исходники — React-компоненты и файлы данных; сборка генерирует готовые статические
HTML-страницы (SSG) со всеми SEO-тегами — их можно положить на любой хостинг.

**Зависимостей нет**: `npm install` НЕ нужен. Нужен только Node.js 18+
(`node -v` для проверки) — и то лишь для пересборки.

## Быстрый старт (посмотреть сайт)

Вариант 1 — просто открыть в браузере:
двойной клик по `dist/index.html`. Всё работает (пути относительные).

Вариант 2 — локальный сервер (как на проде):

```bash
cd agenda-site/dist
python3 -m http.server 8000
# откройте http://localhost:8000
```

или через Node:

```bash
cd agenda-site
npm run build        # пересборка (необязательно, dist уже собран)
npx serve dist       # локальный сервер на http://localhost:3000
```

> `npm i` / `npm install` — не нужен: в package.json нет зависимостей,
> все библиотеки лежат в папке `vendor/`.

## Структура

```
agenda-site/
├── src/
│   ├── data/            ← ВСЕ СОДЕРЖИМЫЕ ЗДЕСЬ
│   │   ├── site.js      ← домен, навигация, контакты, цифры (ЗАМЕНИТЕ domain!)
│   │   ├── cases.js     ← кейсы: добавить кейс = добавить объект в массив
│   │   ├── services.js  ← услуги
│   │   ├── clients.js   ← клиенты: ниши + аватары
│   │   └── team.js      ← команда + принципы
│   ├── components/      ← каждый блок — отдельный компонент (файл)
│   │   ├── Header.jsx, Footer.jsx, MobileMenu.jsx
│   │   ├── Hero.jsx, Marquee.jsx, Stats.jsx
│   │   ├── CasesSection.jsx, CaseCard.jsx, CasesGrid.jsx, CaseDetail.jsx
│   │   ├── ClientsSection.jsx, ClientsField.jsx
│   │   ├── TeamSection.jsx, TeamCard.jsx
│   │   ├── ServicesGrid.jsx, ContactsBlock.jsx
│   │   ├── Breadcrumbs.jsx, PageHero.jsx, CaseVisual.jsx, CaseStats.jsx
│   │   └── Reveal.jsx, Counter.jsx, Icons.jsx, Preloader.jsx
│   ├── pages/           ← страницы + реестр маршрутов (pages/index.js — SEO-мета)
│   ├── assets/          ← картинки, шрифты, интерактивный site.js
│   └── styles/site.css  ← все стили
├── vendor/              ← babel + react (включены, ничего скачивать не надо)
├── build/render.cjs     ← генератор статических страниц
├── dist/                ← ГОТОВЫЙ САЙТ (деплоить это)
│   ├── index.html               — главная
│   ├── services/index.html      — услуги
│   ├── cases/index.html         — все кейсы
│   ├── cases/<slug>/index.html  — детальная страница каждого кейса
│   ├── clients/index.html       — клиенты
│   ├── about/index.html         — о нас
│   ├── contacts/index.html      — контакты
│   ├── 404.html                 — страница ошибки (noindex)
│   ├── robots.txt, sitemap.xml  — для поисковиков
│   └── assets/ (css, js, img, fonts)
├── package.json         ← скрипты: npm run build / npm start
└── README.md
```

## Как добавить новый кейс

1. Положите картинку в `src/assets/img/` (например `case4.jpg`).
2. Откройте `src/data/cases.js`, скопируйте любой объект и поменяйте поля:
   - `slug` — адрес страницы (`/cases/<slug>/`, латиницей);
   - `title`, `short` — название и краткое описание (попадает в meta description);
   - `image`, `visual` (`'phone'` — мокап телефона, `'post'` — карточка поста);
   - `tags`, `goal`, `points`, `stats` — содержимое страницы кейса.
3. Пересоберите: `npm run build` (из папки agenda-site) или `node build/render.cjs`.
   Страница кейса, пункт в списке /cases/, ссылки «предыдущий/следующий кейс»,
   запись в sitemap.xml появятся автоматически.

Клиенты/услуги/команда пополняются так же — правкой соответствующего файла в `src/data/`.

## Деплой

Содержимое `dist/` заливается целиком на любой статический хостинг
(GitHub Pages, Netlify, Vercel, Timeweb, Beget — просто папка с файлами).

После выбора домена:
1. В `src/data/site.js` поменяйте `domain: 'https://agenda-site.ru'` на свой.
2. Пересоберите (`npm run build`) — обновятся canonical, og:url и sitemap.xml.
3. Добавьте сайт в Яндекс Вебмастер и Google Search Console, отправьте sitemap.xml.
4. Для соцсетей используется обложка `assets/img/og-cover.jpg` (1200×630).

## Публикация на GitHub Pages

Сайт статический — GitHub Pages подходит полностью. Адрес будет
`https://ВАШ-ЛОГИН.github.io/agenda-site/` (все внутренние ссылки относительные,
сайт работает и в подпапке).

Перед публикацией: в `src/data/site.js` поменяйте
`domain: 'https://agenda-site.ru'` на `https://ВАШ-ЛОГИН.github.io/agenda-site`
и пересоберите (`npm run build`) — тогда canonical, og:url и sitemap будут корректны.

### Способ 1 — без терминала (быстро)

1. Создайте на github.com публичный репозиторий `agenda-site`.
2. На странице репозитория нажмите «uploading an existing file» и перетащите
   **содержимое папки `dist/`** (index.html, папки services, cases, clients,
   about, contacts, assets, robots.txt, sitemap.xml, 404.html, .nojekyll) —
   именно содержимое, не саму папку dist.
3. Commit changes → Settings → Pages → Source: «Deploy from a branch»,
   Branch: `main` / `(root)` → Save.
4. Через 1–2 минуты сайт откроется по адресу из пункта выше.
   Файл 404.html подхватится автоматически.

### Способ 2 — с автодеплоем (рекомендую)

В проекте уже есть готовый workflow `.github/workflows/deploy.yml`:
при каждом `git push` в ветку `main` GitHub сам собирает сайт
(`npm install` не нужен) и публикует `dist/`.

1. В `src/data/site.js` поменяйте домен (см. выше) и закоммитьте.
2. Из папки проекта в терминале:

```bash
git init
git add .
git commit -m "Agenda site"
git branch -M main
git remote add origin https://github.com/ВАШ-ЛОГИН/agenda-site.git
git push -u origin main
```

3. На GitHub: Settings → Pages → Source: **«GitHub Actions»** → Save
   (это важно — не «Deploy from a branch»).
4. Смотрите вкладку Actions: через ~1 минуту сборка позеленеет и сайт откроется.
5. Дальше любое обновление = правка `src/` → `git add . && git commit -m "..." && git push`
   — сайт обновится сам, локальная сборка не нужна.

Кастомный домен (после покупки): Settings → Pages → Custom domain → введите домен,
у регистратора добавьте A-записи на `185.199.108.153`, `185.199.109.153`,
`185.199.110.153`, `185.199.111.153` и CNAME `www` → `ЛОГИН.github.io`,
затем в `src/data/site.js` верните домен и пересоберите.

## Файлы для правки без пересборки (быстрые правки текста прямо в HTML)

`dist/**/*.html` — обычные HTML-файлы, тексты можно править и вручную,
но при пересборке они будут перезаписаны из `src/`.
