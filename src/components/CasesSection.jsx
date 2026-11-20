/* Секция кейсов на главной: три featured-кейса + ссылка на все */
function CasesSection() {
  return (
    <section className="section-pad" id="cases">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="label">Кейсы</span>
          <h2 className="h2">Реальные проекты <em>и цифры</em></h2>
          <p className="section-sub">
            Данные кейсы — лишь часть реализованных проектов: за рамками портфолио остался
            значительный объём задач из разных ниш и с разными целями.
          </p>
        </Reveal>
        <div className="cases-list">
          {CASES_DATA.map((c, i) => <CaseCard key={c.slug} c={c} i={i} />)}
        </div>
        <Reveal className="center-cta" delay={100}>
          <a className="btn btn-ghost" href={A('/cases/')}>Все кейсы <Arrow /></a>
        </Reveal>
      </div>
    </section>
  );
}
