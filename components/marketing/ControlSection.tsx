import Link from 'next/link';

export function ControlSection() {
  return (
    <section className="section">
      <div className="container grid-2" style={{ alignItems: 'start' }}>
        <article className="card-soft feature-card">
          <span className="badge">Cliente</span>
          <h3>Solicitud + aprobación + pago</h3>
          <p>El cliente ve cotizaciones, fechas estimadas, progreso, archivos y evidencias. La visual se plantea para que el pago se convierta en un paso natural del flujo, no en un proceso aparte.</p>
          <ul style={{ color: 'var(--muted)', lineHeight: 1.8, paddingLeft: '1.25rem' }}>
            <li>Formulario segmentado por categoría y urgencia</li>
            <li>Timeline visible con hitos y comentarios</li>
            <li>Resumen financiero antes y después del pago</li>
          </ul>
        </article>
        <article className="card-soft feature-card">
          <span className="badge">Operación</span>
          <h3>Técnicos y administración con foco en productividad</h3>
          <p>El técnico necesita una agenda útil, estados accionables y un panel claro de ingresos. La administración necesita métricas, asignación y control de liberación de fondos.</p>
          <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap', marginTop: '1rem' }}>
            <Link href="/dashboard/tecnico" className="btn btn-secondary">Ver portal técnico</Link>
            <Link href="/dashboard/admin" className="btn btn-primary">Ver portal admin</Link>
          </div>
        </article>
      </div>
    </section>
  );
}
