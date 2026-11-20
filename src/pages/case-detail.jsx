/* Детальная страница кейса /cases/<slug>/ — получает кейс из реестра маршрутов */
function CaseDetailPage({ c }) {
  return (
    <React.Fragment>
      <section className="page-hero">
        <div className="wrap">
          <Breadcrumbs items={[
            { href: '/', label: 'Главная' },
            { href: '/cases/', label: 'Кейсы' },
            { label: c.title },
          ]} />
          <Reveal>
            <div className="case-tags">{c.tags.map((t) => <span key={t}>{t}</span>)}</div>
            <h1 className="h1">{c.title}</h1>
            <p className="section-sub">{c.short}</p>
          </Reveal>
        </div>
      </section>
      <CaseDetail c={c} />
      <ClientsSection />
    </React.Fragment>
  );
}
