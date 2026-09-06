export default function EmptyState({ title, description, children }) {
  return (
    <div className="empty-state">
      <span className="empty-state__icon" aria-hidden="true">
        ◇
      </span>
      <h3>{title}</h3>
      {description && <p>{description}</p>}
      {children}
    </div>
  );
}
