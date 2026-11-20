/* Блок ключевых цифр */
function Stats() {
  return (
    <section className="section-pad" aria-label="Ключевые цифры">
      <div className="wrap">
        <div className="stats-grid">
          {SITE.stats.map((s, i) => (
            <Reveal key={i} className="stat" delay={i * 90}>
              <Counter value={s.value} suffix={s.suffix} />
              <span>{s.label}</span>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
