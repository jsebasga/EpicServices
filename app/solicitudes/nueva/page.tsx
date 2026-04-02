import Link from 'next/link';

export default function NewRequestPage() {
  return (
    <section className="section">
      <div className="container grid-2">
        <article className="card-soft" style={{ padding: '2rem' }}>
          <span className="badge">Nueva solicitud</span>
          <h1 className="section-title" style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)' }}>Formulario base para crear tickets tecnológicos</h1>
          <p className="section-subtitle">Esta pantalla ya deja listo el recorrido visual. Después se puede conectar a Firestore, Storage y reglas por rol.</p>
          <div style={{ display: 'grid', gap: '1rem', marginTop: '1.5rem' }}>
            <div className="card" style={{ padding: '1rem' }}><strong>Paso 1</strong><p style={{ color: 'var(--muted)', margin: '.35rem 0 0' }}>Elegir categoría, prioridad y canal (remoto o presencial).</p></div>
            <div className="card" style={{ padding: '1rem' }}><strong>Paso 2</strong><p style={{ color: 'var(--muted)', margin: '.35rem 0 0' }}>Explicar el problema y adjuntar evidencias.</p></div>
            <div className="card" style={{ padding: '1rem' }}><strong>Paso 3</strong><p style={{ color: 'var(--muted)', margin: '.35rem 0 0' }}>Recibir cotización, aprobar y pagar.</p></div>
          </div>
        </article>
        <article className="card" style={{ padding: '1.5rem' }}>
          <form className="form-grid">
            <div className="field"><label>Título de la solicitud</label><input placeholder="Ej. Red inestable en oficina" /></div>
            <div className="field"><label>Categoría</label><select defaultValue="network"><option value="remote">Soporte remoto</option><option value="maintenance">Mantenimiento</option><option value="install">Instalación y configuración</option><option value="network">Redes y conectividad</option><option value="mobile">Mesa de ayuda móvil</option></select></div>
            <div className="field"><label>Prioridad</label><select defaultValue="high"><option value="low">Baja</option><option value="medium">Media</option><option value="high">Alta</option><option value="urgent">Urgente</option></select></div>
            <div className="field"><label>Canal</label><select defaultValue="onsite"><option value="remote">Remoto</option><option value="onsite">Presencial</option></select></div>
            <div className="field" style={{ gridColumn: '1 / -1' }}><label>Descripción</label><textarea placeholder="Describe el problema, cuándo empezó y qué impacto tiene" /></div>
            <div className="field"><label>Ciudad</label><input placeholder="Bogotá" /></div>
            <div className="field"><label>Horario preferido</label><input placeholder="Ej. 2:00 PM a 5:00 PM" /></div>
            <div className="field" style={{ gridColumn: '1 / -1' }}><label>Adjuntos</label><input type="file" /></div>
            <div style={{ gridColumn: '1 / -1', display: 'flex', gap: '.8rem', flexWrap: 'wrap' }}>
              <button type="button" className="btn btn-primary">Enviar solicitud</button>
              <Link href="/dashboard/cliente" className="btn btn-secondary">Volver al portal</Link>
            </div>
          </form>
        </article>
      </div>
    </section>
  );
}
