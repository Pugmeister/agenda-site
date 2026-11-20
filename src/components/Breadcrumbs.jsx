/* Хлебные крошки: items = [{href, label}] */
function Breadcrumbs({ items }) {
  return (
    <nav className="crumbs" aria-label="Хлебные крошки">
      {items.map((it, i) => (
        <React.Fragment key={i}>
          {i > 0 && <span aria-hidden="true">›</span>}
          {it.href
            ? <a href={A(it.href)}>{it.label}</a>
            : <span aria-current="page">{it.label}</span>}
        </React.Fragment>
      ))}
    </nav>
  );
}
