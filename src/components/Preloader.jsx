/* Прелоадер (только на главной). Без JS скрывается CSS-анимацией. */
function Preloader() {
  return (
    <div className="preloader" aria-hidden="true">
      <div className="pre-word">
        {'agenda'.split('').map((c, i) => <span key={i} style={{ animationDelay: (i * 75) + 'ms' }}>{c}</span>)}
        <span className="pre-dot" style={{ animationDelay: '560ms' }}>.</span>
      </div>
      <div className="pre-bar"><i /></div>
    </div>
  );
}
