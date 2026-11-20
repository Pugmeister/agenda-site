/* Hero главной страницы */
function Hero() {
  return (
    <section className="hero" id="top">
      <div className="wrap hero-grid">
        <div className="hero-copy">
          <div className="hero-label hero-fade"><i />Маркетинг · Реклама · Разработка</div>
          <h1>
            <span className="hl"><span>Привет!</span></span>
            <span className="hl"><span>Мы — <em>Agenda</em>.</span></span>
          </h1>
          <p className="hero-sub hero-fade">
            Севастьянова Александра и Мельников Артём. Помогаем компаниям привлекать клиентов,
            выстраивать системное продвижение онлайн и эффективнее использовать рекламные бюджеты.
          </p>
          <div className="hero-cta hero-fade d2">
            <a className="btn btn-primary" href={A('/contacts/')}>Обсудить проект <Arrow /></a>
            <a className="btn btn-ghost" href={A('/cases/')}>Смотреть кейсы</a>
          </div>
          <div className="hero-tools hero-fade d3">
            <span>Meta Ads</span><span>Telegram Ads</span><span>VK Реклама</span>
            <span>Яндекс Директ</span><span>MAX</span><span>SEO</span>
          </div>
        </div>

        <div className="hero-visual hero-fade d2" aria-label="Фотографии Александры и Артёма">
          <div className="blob" aria-hidden="true" />
          <figure className="photo-card main" data-px="10">
            <img src={R('img/alex.jpg')} alt="Севастьянова Александра — эксперт по маркетингу" fetchpriority="high" />
            <figcaption>Александра — стратегия</figcaption>
          </figure>
          <figure className="photo-card second" data-px="20">
            <img src={R('img/artem.jpg')} alt="Мельников Артём — разработка и аналитика" />
            <figcaption>Артём — разработка</figcaption>
          </figure>
          <div className="float-chip c1" data-px="30"><b>10+ лет</b><small>в маркетинге</small></div>
          <div className="float-chip c2" data-px="16"><b>300 000+</b><small>подписчиков у клиентов</small></div>
        </div>
      </div>
      <div className="scroll-hint" aria-hidden="true">листай <i /></div>
    </section>
  );
}
