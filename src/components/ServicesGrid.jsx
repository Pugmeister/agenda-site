/* Сетка услуг (страница /services/) */
function ServicesGrid() {
  return (
    <div className="services-grid">
      {SERVICES_DATA.map((s, i) => (
        <Reveal className="service-card" key={s.name} delay={(i % 3) * 80}>
          <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
          <h3>{s.name}</h3>
          <p>{s.desc}</p>
        </Reveal>
      ))}
    </div>
  );
}
