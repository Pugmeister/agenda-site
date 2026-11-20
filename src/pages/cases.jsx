/* Страница всех кейсов /cases/ */
function CasesPage() {
  return (
    <React.Fragment>
      <PageHero
        crumbs={[{ href: '/', label: 'Главная' }, { label: 'Кейсы' }]}
        label="Кейсы"
        title={<>Реальные проекты <em>и цифры</em></>}
        sub="Данные кейсы — лишь часть реализованных проектов: за рамками портфолио остался значительный объём задач из разных ниш и с разными целями."
      />
      <section className="section-pad-top">
        <div className="wrap">
          <CasesGrid cases={CASES_DATA} />
        </div>
      </section>
      <ClientsSection />
    </React.Fragment>
  );
}
