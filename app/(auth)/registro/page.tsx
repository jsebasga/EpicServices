import Link from 'next/link';

export default function RegisterPage() {
  return (
    <section className="section" style={{ minHeight: '100vh', display: 'grid', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: 760 }}>
        <article className="card-soft" style={{ padding: '2rem' }}>
          <span className="badge">Registro</span>
          <h1 style={{ margin: '1rem 0 .5rem' }}>Crea tu cuenta y solicita servicios</h1>
          <p style={{ color: 'var(--muted)' }}>Formulario inicial del cliente. Luego se puede extender con técnicos y validaciones.</p>
          <form className="form-grid" style={{ marginTop: '1.4rem' }}>
            <div className="field"><label>Nombre completo</label><input placeholder="Nombre y apellido" /></div>
            <div className="field"><label>Correo</label><input type="email" placeholder="correo@dominio.com" /></div>
            <div className="field"><label>Celular</label><input placeholder="+57 300 000 0000" /></div>
            <div className="field"><label>Tipo de cuenta</label><select defaultValue="client"><option value="client">Cliente</option><option value="technician">Técnico</option></select></div>
            <div className="field"><label>Contraseña</label><input type="password" placeholder="••••••••" /></div>
            <div className="field"><label>Confirmar contraseña</label><input type="password" placeholder="••••••••" /></div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '.8rem', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-primary">Crear cuenta</button>
              <Link href="/login" className="btn btn-secondary">Ya tengo cuenta</Link>
            </div>
          </form>
        </article>
      </div>
    </section>
  );
}
