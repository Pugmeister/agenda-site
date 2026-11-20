/* ==== Реестр маршрутов: здесь живут meta-данные всех страниц (SEO) и JSON-LD.
   Новая страница = новый объект в AGENDA_PAGES + jsx-файл со страницей ==== */

const ORG = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Agenda',
  url: SITE.domain + '/',
  description: SITE.description,
  areaServed: 'RU',
  knowsLanguage: 'ru',
  telephone: SITE.contacts.map((c) => c.telDisplay),
  employee: SITE.contacts.map((c) => ({
    '@type': 'Person',
    name: c.name,
    jobTitle: c.role,
    telephone: c.telDisplay,
  })),
};

function breadcrumbSchema(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.label,
      item: it.href ? SITE.domain + it.href : undefined,
    })).filter((x) => x.item),
  };
}

function caseSchema(c) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'Кейс: ' + c.title,
    description: c.short,
    url: SITE.domain + '/cases/' + c.slug + '/',
    image: SITE.domain + '/assets/img/' + c.image,
    provider: { '@type': 'Organization', name: 'Agenda', url: SITE.domain + '/' },
    areaServed: 'RU',
  };
}

const CASE_ROUTES = CASES_DATA.map((c) => ({
  route: 'cases/' + c.slug + '/',
  depth: 2,
  title: c.title + ' — кейс | Agenda',
  desc: c.short,
  ogType: 'article',
  ogImage: '/assets/img/' + c.image,
  el: <CaseDetailPage c={c} />,
  jsonld: [
    ORG,
    caseSchema(c),
    breadcrumbSchema([
      { href: '/', label: 'Главная' },
      { href: '/cases/', label: 'Кейсы' },
      { label: c.title },
    ]),
  ],
}));

const AGENDA_PAGES = [
  {
    route: '', depth: 0, preload: true, ogType: 'website',
    title: 'Agenda — маркетинг и системное продвижение онлайн-бизнеса',
    desc: SITE.description,
    el: <HomePage />,
    jsonld: [ORG, {
      '@context': 'https://schema.org', '@type': 'WebSite',
      name: 'Agenda', url: SITE.domain + '/', inLanguage: 'ru',
    }],
  },
  {
    route: 'services/', depth: 1, ogType: 'website',
    title: 'Услуги: реклама, трафик, сайты и аналитика | Agenda',
    desc: 'Таргетированная реклама, Telegram Ads, Яндекс Директ, реклама у блогеров и посевы, разработка сайтов, SEO, веб-аналитика и маркировка рекламы.',
    el: <ServicesPage />,
    jsonld: [ORG, breadcrumbSchema([{ href: '/', label: 'Главная' }, { label: 'Услуги' }])],
  },
  {
    route: 'cases/', depth: 1, ogType: 'website',
    title: 'Кейсы: привлечение клиентов, подписчиков и продаж | Agenda',
    desc: 'Реальные кейсы Agenda: 300 000+ подписчиков для коуча, инфлюенс-маркетинг для BIOCERA, воронка в Telegram для нутрициолога. Цифры, стратегии, результаты.',
    el: <CasesPage />,
    jsonld: [ORG, breadcrumbSchema([{ href: '/', label: 'Главная' }, { label: 'Кейсы' }])],
  },
  ...CASE_ROUTES,
  {
    route: 'clients/', depth: 1, ogType: 'website',
    title: 'Наши клиенты: онлайн-школы, эксперты, товарный бизнес | Agenda',
    desc: 'Клиенты Agenda: онлайн-школы, врачи из списка Forbes, психологи, коучи, астрологи, а также товарный бизнес с Wildberries и Ozon.',
    el: <ClientsPage />,
    jsonld: [ORG, breadcrumbSchema([{ href: '/', label: 'Главная' }, { label: 'Клиенты' }])],
  },
  {
    route: 'about/', depth: 1, ogType: 'website',
    title: 'О нас: Севастьянова Александра и Мельников Артём | Agenda',
    desc: 'Agenda — дуэт экспертов: маркетинг и управление с 10+ годами в онлайн-бизнесе и веб-разработка с SEO и аналитикой. Подход, принципы, цифры.',
    el: <AboutPage />,
    jsonld: [ORG, breadcrumbSchema([{ href: '/', label: 'Главная' }, { label: 'О нас' }])],
  },
  {
    route: 'contacts/', depth: 1, ogType: 'website',
    title: 'Контакты: обсудим ваш проект | Agenda',
    desc: 'Телефоны и мессенджеры Agenda: Александра +7 964 899-70-71 (@aleks_se), Артём +7 989 293 12 50 (@pugmeiister). Telegram, WhatsApp, MAX.',
    el: <ContactsPage />,
    jsonld: [ORG, breadcrumbSchema([{ href: '/', label: 'Главная' }, { label: 'Контакты' }])],
  },
  {
    route: '404.html', depth: 0, noindex: true,
    title: '404 — страница не найдена | Agenda',
    desc: 'Страница не найдена.',
    el: <NotFoundPage />,
  },
];

__OUT__ = { AGENDA_PAGES };
