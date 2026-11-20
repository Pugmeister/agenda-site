/* Поле аватаров клиентов (плавающие кружки) + чипы ниш */
function ClientsField() {
  return (
    <React.Fragment>
      <div className="clients-chips">
        {NICHE_CHIPS.map((c) => <span key={c}>{c}</span>)}
      </div>
      <div className="av-field" aria-label="Аватары клиентов">
        {AVATARS.map((a, i) => (
          <div
            key={i}
            className="av"
            style={{
              left: a.l + '%', top: a.t + '%', width: a.s + 'px', height: a.s + 'px',
              animationDuration: (5.2 + (i % 4)) + 's', animationDelay: a.d + 's',
            }}
          >
            <img src={R('img/' + a.src)} alt={a.alt} loading="lazy" />
          </div>
        ))}
      </div>
    </React.Fragment>
  );
}
