/* Бегущая строка услуг (CSS-анимация, пауза при наведении) */
function Marquee() {
  const row = SERVICES_DATA.map((s, i) => <span key={i}>{s.name}<i>✦</i></span>);
  return (
    <div className="marquee-wrap" aria-hidden="true">
      <div className="marquee">
        <div className="marquee-track">
          <div className="marquee-group">{row}</div>
          <div className="marquee-group">{row}</div>
        </div>
      </div>
    </div>
  );
}
