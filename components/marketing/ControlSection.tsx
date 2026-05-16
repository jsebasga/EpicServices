import { CreateRequestLink } from '@/components/shared/CreateRequestLink';

export function ControlSection() {
  return (
    <section className="container section">
      <div className="card-soft" style={{ padding: '2rem' }}>
        <span className="badge">Gestión de servicios</span>

        <h2 className="section-title">
          Empieza creando tu primera solicitud técnica
        </h2>

        <p className="section-description">
          Describe el problema, indica la prioridad y permite que el equipo revise tu caso para darle seguimiento de forma organizada.
        </p>

        <div className="quick-flow">
          <div className="quick-flow-item">
            <strong>Describe tu necesidad</strong>
            <span>Registra el tipo de servicio, la prioridad y los detalles principales del caso.</span>
          </div>

          <div className="quick-flow-item">
            <strong>Haz seguimiento</strong>
            <span>Consulta el avance de la solicitud y revisa los cambios de estado del ticket.</span>
          </div>

          <div className="quick-flow-item">
            <strong>Centraliza la información</strong>
            <span>Conserva comentarios, archivos y actualizaciones dentro de una misma solicitud.</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '.85rem', flexWrap: 'wrap', marginTop: '1.4rem' }}>
          <CreateRequestLink />
        </div>
      </div>
    </section>
  );
}