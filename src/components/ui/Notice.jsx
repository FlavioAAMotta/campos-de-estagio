export default function Notice({ children, tone = 'info' }) {
  return <div className={`notice notice--${tone}`}>{children}</div>;
}
