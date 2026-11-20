/* Блок метрик кейса: цифры-счётчики и текстовые факты */
function CaseStats({ stats }) {
  return (
    <div className="case-stats">
      {stats.map((s, k) => (
        <div className="case-stat" key={k}>
          <b>{s.display !== undefined ? s.display : <Counter value={s.value} suffix={s.suffix || ''} />}</b>
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
