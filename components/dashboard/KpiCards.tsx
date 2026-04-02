import type { Kpi } from '@/lib/types';

export function KpiCards({ items }: { items: Kpi[] }) {
  return (
    <section className="metric-grid">
      {items.map((item) => (
        <article key={item.label} className="card dashboard-card">
          <div className="badge">Métrica</div>
          <div className="kpi-value">{item.value}</div>
          <strong>{item.label}</strong>
          <p style={{ marginBottom: 0 }}>{item.helper}</p>
        </article>
      ))}
    </section>
  );
}
