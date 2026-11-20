/* Большая карточка кейса (главная страница): текст + визуал, ведёт на детальную страницу */
function CaseCard({ c, i }) {
  const href = A('/cases/' + c.slug + '/');
  return (
    <Reveal as="article" className={'case-card' + (i % 2 ? ' flip' : '')} delay={80}>
      <div className="case-body">
        <div className="case-tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
        <h3><a href={href}>{c.title}</a></h3>
        <p className="case-sub">{c.short}</p>
        <p className="case-goal">{c.goal}</p>
        <ul className="case-points">
          {c.points.map((pt, k) => <li key={k}><i>✦</i>{pt}</li>)}
        </ul>
        <CaseStats stats={c.stats} />
        <div className="case-link">
          <a className="btn btn-ghost" href={href}>Смотреть кейс <Arrow /></a>
        </div>
      </div>
      <div className="case-visual">
        <span className="case-num" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
        <CaseVisual c={c} />
      </div>
    </Reveal>
  );
}
