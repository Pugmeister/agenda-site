/* Компактные карточки кейсов для страницы /cases/ */
function CasesGrid({ cases }) {
  return (
    <div className="cases-grid">
      {cases.map((c, i) => (
        <Reveal as="article" className="case-mini" key={c.slug} delay={(i % 2) * 90}>
          <a className="case-mini-visual" href={A('/cases/' + c.slug + '/')} aria-label={'Кейс: ' + c.title}>
            <CaseVisual c={c} />
          </a>
          <div className="case-mini-body">
            <div className="case-tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
            <h3><a href={A('/cases/' + c.slug + '/')}>{c.title}</a></h3>
            <p>{c.short}</p>
            <span className="more">Смотреть кейс <Arrow /></span>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
