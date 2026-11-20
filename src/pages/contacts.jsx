/* Страница контактов /contacts/ */
function ContactsPage() {
  return (
    <React.Fragment>
      <PageHero
        crumbs={[{ href: '/', label: 'Главная' }, { label: 'Контакты' }]}
        label="Контакты"
        title={<>Давайте <em>обсудим</em> ваш проект</>}
        sub="Позвоните или напишите в мессенджер — коротко расскажем, как решали похожие задачи, и что можно сделать в вашем случае."
      />
      <ContactsBlock />
    </React.Fragment>
  );
}
