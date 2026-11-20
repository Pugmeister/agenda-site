/* Счётчик: в HTML сразу финальное значение (его видит поисковик и пользователи без JS),
   при включённом JS site.js анимирует от нуля при появлении на экране. */
function Counter({ value, suffix = '' }) {
  const txt = value.toLocaleString('ru-RU') + suffix;
  return <b data-counter="1" data-target={value} data-suffix={suffix}>{txt}</b>;
}
