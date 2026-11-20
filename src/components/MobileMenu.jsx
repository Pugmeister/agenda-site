/* Полноэкранное мобильное меню. Логика открытия/закрытия в site.js.
   Крестик живёт внутри панели: шапка (z-index:900) ниже панели (950),
   поэтому бургер под ней не виден и не кликабелен. */
function MobileMenu() {
  return (
    <div className="mobile-menu" id="mobile-menu" role="dialog" aria-modal="true" aria-label="Меню" aria-hidden="true">
      <button className="mm-close" id="mm-close" type="button" aria-label="Закрыть меню">
        <span /><span />
      </button>
      <nav aria-label="Мобильная навигация">
        {SITE.nav.map((n, i) => (
          <a key={n.href} className="mm-link" href={A(n.href)} style={{ transitionDelay: '0ms' }}>
            <small>0{i + 1}</small>{n.label}
          </a>
        ))}
      </nav>
      <div className="mm-foot">
        {SITE.contacts.map((p) => (
          <span key={p.name}>{p.name.split(' ')[0]}: <a href={'tel:' + p.tel}>{p.telDisplay}</a></span>
        ))}
        <a href={SITE.contacts[0].tg} target="_blank" rel="noopener">Telegram {SITE.contacts[0].nick} →</a>
      </div>
    </div>
  );
}
