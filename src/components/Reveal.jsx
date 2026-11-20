/* Обёртка scroll-reveal анимации: элемент появляется при попадании во viewport.
   Без JS (и для поисковика) контент виден сразу — скрытие включается классом .js на <html>. */
function Reveal({ as: Tag = 'div', className = '', delay = 0, variant = '', children, ...rest }) {
  const style = Object.assign({}, rest.style || {}, { '--d': delay + 'ms' });
  delete rest.style;
  const cls = ['reveal', variant, className].filter(Boolean).join(' ');
  return (
    <Tag className={cls} data-reveal="1" style={style} {...rest}>
      {children}
    </Tag>
  );
}
