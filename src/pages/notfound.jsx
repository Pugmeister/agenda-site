/* 404 */
function NotFoundPage() {
  return (
    <section className="notfound">
      <div className="wrap">
        <span className="notfound-num" aria-hidden="true">404</span>
        <h1 className="h1">Страница не найдена</h1>
        <p className="section-sub">Возможно, страницу переместили или в адресе опечатка.</p>
        <a className="btn btn-primary" href={A('/')}>На главную <Arrow /></a>
      </div>
    </section>
  );
}
