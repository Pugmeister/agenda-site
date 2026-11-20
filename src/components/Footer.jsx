/* Футер */
function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-in">
        <a className="logo" href={A('/')}>agenda<b>.</b></a>
        <nav className="footer-nav" aria-label="Навигация в футере">
          {SITE.nav.map((n) => <a key={n.href} href={A(n.href)}>{n.label}</a>)}
        </nav>
        <small>© 2026 Agenda · Севастьянова Александра · Мельников Артём</small>
      </div>
    </footer>
  );
}
