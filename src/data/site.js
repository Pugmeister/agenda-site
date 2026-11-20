/* ==== Общие настройки сайта. Поменяйте domain на свой домен после покупки ==== */
const SITE = {
  name: 'Agenda',
  domain: 'https://agenda-site.ru', // ← ЗАМЕНИТЬ на реальный домен (влияет на canonical, sitemap, og:url)
  description: 'Agenda: Севастьянова Александра и Мельников Артём. Привлечение клиентов через соцсети, блогеров и рекламу (Meta, Telegram Ads, VK, Яндекс Директ), разработка сайтов, техническое SEO и веб-аналитика.',
  nav: [
    { href: '/services/', label: 'Услуги' },
    { href: '/cases/', label: 'Кейсы' },
    { href: '/clients/', label: 'Клиенты' },
    { href: '/about/', label: 'О нас' },
    { href: '/contacts/', label: 'Контакты' },
  ],
  contacts: [
    {
      name: 'Севастьянова Александра',
      role: 'маркетинг и стратегия',
      telDisplay: '+7 964 899-70-71',
      tel: '+79648997071',
      nick: '@aleks_se',
      tg: 'https://t.me/aleks_se',
      wa: 'https://wa.me/79648997071',
    },
    {
      name: 'Мельников Артём',
      role: 'разработка и аналитика',
      telDisplay: '+7 989 293 12 50',
      tel: '+79892931250',
      nick: '@pugmeiister',
      tg: 'https://t.me/pugmeiister',
      wa: 'https://wa.me/79892931250',
    },
  ],
  stats: [
    { value: 10, suffix: '+', label: 'лет опыта в маркетинге и онлайн-бизнесе' },
    { value: 300000, suffix: '+', label: 'подписчиков привлечено для клиентов' },
    { value: 200000, suffix: ' ₽/мес', label: 'рекламных бюджетов под управлением' },
    { value: 50, suffix: '+', label: 'рекламных воронок разработано и протестировано' },
  ],
};

/* Префиксы путей: __P__ задаётся сборщиком для каждой страницы ('' , '../', '../../') */
function A(p) {
  const r = (typeof __P__ !== 'undefined' ? __P__ : '') + String(p).replace(/^\//, '');
  return r === '' ? '.' : r; // '.' = текущий раздел (корень сайта)
}
function R(p) { return (typeof __P__ !== 'undefined' ? __P__ : '') + 'assets/' + p; }
