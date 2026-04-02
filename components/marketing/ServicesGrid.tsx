import { services } from '@/data/mock';

export function ServicesGrid() {
  return (
    <section className="section" id="servicios">
      <div className="container">
        <span className="badge">Catálogo de servicios</span>
        <h2 className="section-title">Servicios listos para una experiencia de soporte moderna</h2>
        <p className="section-subtitle">Esta propuesta conserva el estilo verde/amarillo del sitio original, pero lo lleva a una plataforma más robusta: con foco en solicitud, operación y pagos.</p>
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
