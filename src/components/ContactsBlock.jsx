/* Контакты: терракотовая карточка с двумя контактами (используется на / и /contacts/) */
function ContactsBlock() {
  return (
    <section className="section-pad" id="contacts">
      <div className="wrap">
        <Reveal variant="reveal-s">
          <div className="contact-card">
            <span className="label">Контакты</span>
            <h2 className="h2">Обсудим <em style={{ color: '#FFD9C7' }}>ваш проект?</em></h2>
            <p>
              Будем рады обсудить, как наш опыт может быть полезен в рамках решения ваших задач —
              от разовой закупки трафика до системного продвижения.
            </p>
            <div className="contacts-grid">
              {SITE.contacts.map((p) => (
                <div className="person" key={p.name}>
                  <h3>{p.name}</h3>
                  <div className="p-role">{p.role}</div>
                  <div className="p-row">
                    <a className="p-tel" href={'tel:' + p.tel}>{p.telDisplay}</a>
                    <button className="copy-btn" data-copy={p.telDisplay} type="button">Копировать</button>
                  </div>
                  <div className="messengers">
                    <a href={p.tg} target="_blank" rel="noopener">Telegram <b>{p.nick}</b></a>
                    <a href={p.wa} target="_blank" rel="noopener">WhatsApp</a>
                    <span className="copy-btn" style={{ cursor: 'default' }}>WA / MAX / Tg</span>
                  </div>
                </div>
              ))}
            </div>
            <p className="contact-note">Отвечаем в мессенджерах обычно в течение дня. Пишите сразу в Telegram или WhatsApp — так быстрее.</p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
