import Link from 'next/link';
import { ServicesGrid } from '@/components/marketing/ServicesGrid';
import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';

export default function ServicesPage() {
  return (
    <>
      <Header />
      <section className="section">
        <div className="container card-soft" style={{ padding: '2rem' }}>
          <span className="badge">Servicios tecnológicos</span>
          <h1 className="section-title">Un catálogo preparado para convertirse en tickets y pagos</h1>
          <p className="section-subtitle">En esta versión el frontend ya separa la presentación pública de la operación real del servicio. Eso facilita después la conexión con Firebase, reglas por rol y pasarela de pagos.</p>
          <div style={{ display: 'flex', gap: '.75rem', marginTop: '1.25rem', flexWrap: 'wrap' }}>
            <Link href="/solicitudes/nueva" className="btn btn-primary">Solicitar ahora</Link>
            <Link href="/dashboard/cliente" className="btn btn-secondary">Ver flujo del cliente</Link>
          </div>
        </div>
      </section>
      <ServicesGrid />
      <Footer />
    </>
  );
}
