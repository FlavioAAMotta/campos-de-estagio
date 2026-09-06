export default function StatCard({ label, value = '—', description }) {
  return (
    <div className="card stat-card">
      <span className="eyebrow">{label}</span>
      <strong>{value}</strong>
      {description && <span className="muted">{description}</span>}
    </div>
  );
}
