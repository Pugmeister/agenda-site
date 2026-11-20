/* Страница «О нас» /about/ */
function AboutPage() {
  return (
    <React.Fragment>
      <PageHero
        crumbs={[{ href: '/', label: 'Главная' }, { label: 'О нас' }]}
        label="О нас"
        title={<>Севастьянова Александра <em>и</em> Мельников Артём</>}
        sub="Дуэт «Agenda»: маркетинг и управление с опытом 10+ лет в онлайн-бизнесе плюс веб-разработка, SEO и аналитика. Один подрядчик — вместо двух незнакомых друг с другом."
      />
      <TeamSection full />
      <Stats />
    </React.Fragment>
  );
}
