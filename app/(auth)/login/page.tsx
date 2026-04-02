import Link from 'next/link';

export default function LoginPage() {
  return (
    <section className="section" style={{ minHeight: '100vh', display: 'grid', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: 540 }}>
        <article className="card-soft" style={{ padding: '2rem' }}>
          <span className="badge">Acceso</span>
          <h1 style={{ margin: '1rem 0 .5rem' }}>Ingresa a la plataforma</h1>
          <p style={{ color: 'var(--muted)' }}>Pantalla visual lista para conectar con Firebase Authentication.</p>
          <form style={{ display: 'grid', gap: '1rem', marginTop: '1.4rem' }}>
            <div className="field"><label>Correo electrónico</label><input type="email" placeholder="nombre@empresa.com" /></div>
            <div className="field"><label>Contraseña</label><input type="password" placeholder="••••••••" /></div>
            <button type="button" className="btn btn-primary">Ingresar</button>
          </form>
          <div style={{ marginTop: '1rem', color: 'var(--muted)' }}>¿Aún no tienes cuenta? <Link href="/registro" className="link-inline">Regístrate</Link></div>
        </article>
      </div>
    </section>
  );
}
