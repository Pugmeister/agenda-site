/* Шапка сайта: логотип, якоря-страницы, CTA, бургер, прогресс-бар чтения */
function Header({ active }) {
  return (
    <header className="header">
      <div className="wrap header-in">
        <a className="logo" href={A('/')} aria-label="Agenda — на главную">agenda<b>.</b></a>
        <nav className="nav" aria-label="Основная навигация">
          {SITE.nav.map((n) => (
            <a key={n.href} href={A(n.href)} aria-current={active === n.href ? 'page' : undefined}>{n.label}</a>
          ))}
        </nav>
        <a className="btn btn-primary header-cta" href={A('/contacts/')}>Обсудить проект</a>
        <button className="burger" id="burger" type="button" aria-label="Открыть меню" aria-expanded="false" aria-controls="mobile-menu">
          <span /><span /><span />
        </button>
      </div>
      <div className="progress" id="progress" />
    </header>
  );
}
