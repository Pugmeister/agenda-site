/* Секция «Команда». full — расширенный вариант для страницы /about/ */
function TeamSection({ full }) {
  return (
    <section className="section-pad" id="team">
      <div className="wrap">
        <Reveal className="section-head">
          <span className="label">Команда</span>
          <h2 className="h2">Два направления — <em>одна система</em></h2>
          <p className="section-sub">
            Маркетинг приводит трафик и клиентов, разработка и аналитика превращают его
            в измеримый результат для бизнеса.
          </p>
        </Reveal>
        <div className="team-grid">
          {TEAM_DATA.map((m, i) => <TeamCard key={m.name} m={m} i={i} />)}
        </div>
        {full && (
          <Reveal className="principles-wrap" delay={100}>
            <h3 className="h3-sub">Как мы работаем</h3>
            <div className="principles">
              {PRINCIPLES.map((p, i) => (
                <div className="principle" key={i}>
                  <span className="principle-num">{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <h4>{p.title}</h4>
                    <p>{p.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        )}
        {!full && (
          <Reveal className="center-cta" delay={100}>
            <a className="btn btn-ghost" href={A('/about/')}>Подробнее о нас <Arrow /></a>
          </Reveal>
        )}
      </div>
    </section>
  );
}
