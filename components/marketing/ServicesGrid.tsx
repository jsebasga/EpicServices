import { services } from '@/data/mock';

export function ServicesGrid() {
  return (
    <section className="section" id="servicios">
      <div className="container">
      <span className="badge">Catálogo de servicios</span>
        <h2 className="section-title">Servicios pensados para resolver tus necesidades técnicas</h2>
        <p className="section-subtitle">
          Encuentra opciones de soporte, mantenimiento, configuración y conectividad para crear solicitudes claras y dar seguimiento a cada caso desde la plataforma.
        </p>
        <div className="grid-3" style={{ marginTop: '1.8rem' }}>
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <article key={service.title} className="card service-card">
                <div className="service-icon"><Icon size={26} /></div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="service-tag">{service.tag}</span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
