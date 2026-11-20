/* Карточка участника команды */
function TeamCard({ m, i }) {
  return (
    <Reveal className="team-card" delay={i * 120}>
      <div className="team-photo">
        <img src={R('img/' + m.img)} alt={m.alt} loading="lazy" style={{ objectPosition: m.pos }} />
      </div>
      <span className="team-role">{m.role}</span>
      <h3>{m.name}</h3>
      <p className="tc-desc">{m.desc}</p>
      <ul className="team-list">
        {m.points.map(([b, t], k) => (
          <li key={k}><i>✦</i><span><b>{b}</b> {t}</span></li>
        ))}
      </ul>
    </Reveal>
  );
}
