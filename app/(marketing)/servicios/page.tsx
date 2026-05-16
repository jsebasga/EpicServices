import { CreateRequestLink } from '@/components/shared/CreateRequestLink';
import { ServicesGrid } from '@/components/marketing/ServicesGrid';
import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';

export default function ServicesPage() {
  return (
    <>
      <Header />
      <section className="section">
      <div className="container card-soft" style={{ padding: '2rem' }}>
      <span className="badge">Servicios técnicos</span>

      <h1 className="section-title">
        Soluciones técnicas para mantener tu operación funcionando
      </h1>

      <p className="section-subtitle">
        Encuentra el tipo de soporte que necesitas, crea una solicitud clara y permite que el equipo gestione tu caso con seguimiento organizado.
      </p>
      
      <div className="service-highlights">
        <div className="service-highlight-item">
          <strong>Elige el servicio adecuado</strong>
          <span>Selecciona la categoría que mejor describe tu necesidad técnica.</span>
        </div>

        <div className="service-highlight-item">
          <strong>Describe tu caso con claridad</strong>
          <span>Agrega prioridad, canal de atención, ciudad, horario y detalles del problema.</span>
        </div>

        <div className="service-highlight-item">
          <strong>Haz seguimiento del avance</strong>
          <span>Consulta el estado de tu solicitud y revisa las actualizaciones del equipo.</span>
        </div>
      </div>
      
          <div style={{ display: 'flex', gap: '.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <CreateRequestLink />
          </div>
        </div>
      </section>
      <ServicesGrid />
      <Footer />
    </>
  );
}
