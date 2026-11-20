/* Визуал кейса: телефон-мокап или карточка поста */
function CaseVisual({ c }) {
  const img = <img src={R('img/' + c.image)} alt={c.imgAlt} loading="lazy" />;
  if (c.visual === 'post') {
    return <div className="post-card">{img}</div>;
  }
  return <div className="phone">{img}</div>;
}
