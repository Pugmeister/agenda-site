/* Страница клиентов /clients/ */
function ClientsPage() {
  return (
    <React.Fragment>
      <PageHero
        crumbs={[{ href: '/', label: 'Главная' }, { label: 'Клиенты' }]}
        label="Клиенты"
        title={<>С кем мы <em>работаем</em></>}
      />
      <section className="section-pad-top">
        <div className="wrap">
          <Reveal variant="reveal-s">
            <div className="clients-card">
              <p className="clients-lead">{CLIENTS_INTRO}</p>
              {CLIENTS_EXTRA.map((t, i) => <p key={i}>{t}</p>)}
              <ClientsField />
            </div>
          </Reveal>
        </div>
      </section>
      <TeamSection />
    </React.Fragment>
  );
}
