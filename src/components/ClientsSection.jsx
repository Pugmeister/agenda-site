/* Секция «Клиенты»: тёмная карточка. full — расширенный вариант для страницы /clients/ */
function ClientsSection({ full }) {
  return (
    <section className={'section-pad' + (full ? ' clients-page' : '')} id="clients">
      <div className="wrap">
        <Reveal variant="reveal-s">
          <div className="clients-card">
            <span className="label">Наши клиенты</span>
            <h2 className="h2">От врачей из списка <em>Forbes</em> до онлайн-школ и брендов</h2>
            <p>{CLIENTS_INTRO}</p>
            {full && CLIENTS_EXTRA.map((t, i) => <p key={i}>{t}</p>)}
            <ClientsField />
            {!full && (
              <div className="card-link">
                <a className="btn btn-light" href={A('/clients/')}>Подробнее о клиентах <Arrow /></a>
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
