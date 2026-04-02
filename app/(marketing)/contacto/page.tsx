import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';

export default function ContactPage() {
  return (
    <>
      <Header />
      <section className="section">
        <div className="container grid-2">
          <article className="card-soft" style={{ padding: '2rem' }}>
            <span className="badge">Contacto</span>
            <h1 className="section-title">Hagamos que el soporte se vea profesional</h1>
            <p className="section-subtitle">El diseño propuesto busca que la mesa de ayuda transmita orden, confianza y facilidad de pago.</p>
            <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
              <div className="card" style={{ padding: '1rem' }}><strong>Correo:</strong> hola@epicservices.co</div>
              <div className="card" style={{ padding: '1rem' }}><strong>WhatsApp:</strong> +57 300 000 0000</div>
              <div className="card" style={{ padding: '1rem' }}><strong>Horario:</strong> Lunes a sábado · 7:00 AM a 7:00 PM</div>
            </div>
          </article>
          <article className="card" style={{ padding: '1.5rem' }}>
            <strong style={{ fontSize: '1.15rem' }}>Déjanos tus datos</strong>
            <form className="form-grid" style={{ marginTop: '1rem' }}>
              <div className="field"><label>Nombre</label><input placeholder="Tu nombre" /></div>
              <div className="field"><label>Correo</label><input placeholder="tu@correo.com" type="email" /></div>
              <div className="field"><label>Empresa</label><input placeholder="Opcional" /></div>
              <div className="field"><label>Tipo de consulta</label><select defaultValue="demo"><option value="demo">Quiero una demo</option><option value="support">Necesito soporte</option><option value="quote">Quiero cotización</option></select></div>
              <div className="field" style={{ gridColumn: '1 / -1' }}><label>Mensaje</label><textarea placeholder="Cuéntanos qué te gustaría resolver" /></div>
              <div style={{ gridColumn: '1 / -1' }}><button type="button" className="btn btn-primary">Enviar</button></div>
            </form>
          </article>
        </div>
      </section>
      <Footer />
    </>
  );
}
