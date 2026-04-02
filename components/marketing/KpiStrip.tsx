import type { Kpi } from '@/lib/types';

export function KpiStrip({ items }: { items: Kpi[] }) {
  return (
    <section className="section" style={{ paddingTop: '1rem' }}>
      <div className="container kpi-strip">
        {items.map((item) => (
          <article key={item.label} className="card stat-card">
            <div className="badge">Indicador visual</div>
            <div className="kpi-value">{item.value}</div>
            <div className="kpi-label">{item.label}</div>
            <p style={{ color: 'var(--muted)', marginBottom: 0 }}>{item.helper}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
