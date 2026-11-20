/* Детальная страница кейса: тело кейса + визуал + навигация между кейсами */
function CaseBody({ c }) {
  return (
    <div className="case-body">
      <h2 className="h3-sub">Задача проекта</h2>
      <p className="case-goal big">{c.goal}</p>
      <h2 className="h3-sub">Что делали</h2>
      <ul className="case-points">
        {c.points.map((pt, k) => <li key={k}><i>✦</i>{pt}</li>)}
      </ul>
      <h2 className="h3-sub">Результаты</h2>
      <CaseStats stats={c.stats} />
    </div>
  );
}

function CaseDetail({ c }) {
  const idx = CASES_DATA.findIndex((x) => x.slug === c.slug);
  const next = CASES_DATA[(idx + 1) % CASES_DATA.length];
  const prev = CASES_DATA[(idx - 1 + CASES_DATA.length) % CASES_DATA.length];
  return (
    <React.Fragment>
      <div className="case-detail wrap">
        <CaseBody c={c} />
        <div className="case-detail-visual">
          <span className="case-num" aria-hidden="true">{String(idx + 1).padStart(2, '0')}</span>
          <CaseVisual c={c} />
        </div>
      </div>

      <section className="wrap">
        <Reveal className="next-case" delay={80}>
          <a href={A('/cases/' + prev.slug + '/')} className="next-case-link">
            <span className="nc-label"><ArrowLeft /> Предыдущий кейс</span>
            <b>{prev.title}</b>
          </a>
          <a href={A('/cases/' + next.slug + '/')} className="next-case-link right">
            <span className="nc-label">Следующий кейс <Arrow /></span>
            <b>{next.title}</b>
          </a>
        </Reveal>
        <Reveal className="center-cta" delay={120}>
          <a className="btn btn-primary" href={A('/contacts/')}>Хочу такой же результат <Arrow /></a>
        </Reveal>
      </section>
    </React.Fragment>
  );
}
