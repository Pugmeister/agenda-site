/* Шапка внутренних страниц: крошки + label + h1 + подзаголовок */
function PageHero({ crumbs, label, title, sub }) {
  return (
    <section className="page-hero">
      <div className="wrap">
        {crumbs && <Breadcrumbs items={crumbs} />}
        <Reveal>
          <span className="label">{label}</span>
          <h1 className="h1">{title}</h1>
          {sub && <p className="section-sub">{sub}</p>}
        </Reveal>
      </div>
    </section>
  );
}
