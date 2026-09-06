export default function Card({
  title,
  description,
  action,
  children,
  className = '',
}) {
  return (
    <section className={`card ${className}`}>
      {title && (
        <header className="card__header">
          <div>
            <h2>{title}</h2>
            {description && <p className="muted">{description}</p>}
          </div>
          {action}
        </header>
      )}
      <div className="card__body">{children}</div>
    </section>
  );
}
