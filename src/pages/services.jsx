/* Страница услуг /services/ */
function ServicesPage() {
  return (
    <React.Fragment>
      <PageHero
        crumbs={[{ href: '/', label: 'Главная' }, { label: 'Услуги' }]}
        label="Услуги"
        title={<>Чем мы можем <em>быть полезны</em></>}
        sub="Полный цикл онлайн-продвижения: от стратегии и закупки трафика до сайтов, аналитики и автоматизации процессов."
      />
      <section className="section-pad-top">
        <div className="wrap">
          <ServicesGrid />
        </div>
      </section>
      <Marquee />
      <ContactsBlock />
    </React.Fragment>
  );
}
