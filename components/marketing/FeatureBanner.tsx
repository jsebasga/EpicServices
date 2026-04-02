import { modules } from '@/data/mock';

export function FeatureBanner() {
  return (
    <section className="section" style={{ paddingTop: 0 }}>
      <div className="container card-soft surface-banner">
        <div>
          <span className="badge">Arquitectura visual del producto</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 3vw, 3rem)' }}>Tres vistas principales y un centro de control operativo</h2>
          <div className="banner-points" style={{ marginTop: '1.3rem' }}>
            {modules.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="card" style={{ padding: '1rem 1.1rem', display: 'grid', gridTemplateColumns: '52px 1fr', gap: '1rem', alignItems: 'start' }}>
                  <div className="service-icon"><Icon size={24} /></div>
                  <div><strong>{item.title}</strong><p style={{ margin: '.4rem 0 0', color: 'var(--muted)' }}>{item.description}</p></div>
                </div>
              );
            })}
          </div>
        </div>
        <div className="banner-highlight">
          <div className="mock-browser">
            <div className="mock-topbar"><span className="dot red" /><span className="dot yellow" /><span className="dot green" /></div>
            <div className="mock-content">
              <div className="card" style={{ padding: '1rem' }}>
                <strong>Ticket principal · Mantenimiento correctivo</strong>
                <p style={{ color: 'var(--muted)', margin: '.4rem 0 .8rem' }}>Estado: en progreso · Técnico: Laura Gómez · SLA restante: 01:20 h</p>
                <div className="progress-bar"><span style={{ width: '62%' }} /></div>
              </div>
              <div className="grid-2">
                <div className="card" style={{ padding: '1rem' }}><strong>Pago del cliente</strong><p style={{ color: 'var(--muted)', marginTop: '.4rem' }}>$420.000 confirmado</p></div>
                <div className="card" style={{ padding: '1rem' }}><strong>Liquidación técnico</strong><p style={{ color: 'var(--muted)', marginTop: '.4rem' }}>$336.000 pendiente de liberar</p></div>
              </div>
              <div className="card" style={{ padding: '1rem' }}><strong>Historial de servicio</strong><p style={{ color: 'var(--muted)', margin: '.35rem 0 0' }}>Solicitud creada → Cotización aprobada → Pago recibido → Técnico en sitio</p></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
