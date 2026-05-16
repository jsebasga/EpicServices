import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <Link href="/" className="brand">
            <span className="brand-mark brand-logo-wrapper">
              <img
                src="/images/logo-icon.png"
                alt="Epic Services"
                className="brand-logo-img"
              />
            </span>
            <span>Epic Services</span>
          </Link>

          <p style={{ marginTop: '1rem' }}>
            Plataforma para crear, organizar y hacer seguimiento a solicitudes técnicas de forma clara y centralizada.
          </p>
        </div>

        <div>
          <h4>Navegación</h4>
          <Link href="/">Inicio</Link>
          <br />
          <Link href="/servicios">Servicios</Link>
          <br />
          <Link href="/contacto">Contacto</Link>
          <br />
          <Link href="/login">Ingresar</Link>
        </div>

        <div>
          <h4>Servicios</h4>
          <Link href="/servicios">Soporte remoto</Link>
          <br />
          <Link href="/servicios">Mantenimiento de equipos</Link>
          <br />
          <Link href="/servicios">Redes y conectividad</Link>
          <br />
          <Link href="/servicios">Seguridad y respaldo</Link>
        </div>

        <div>
          <h4>Contacto</h4>
          <p>
            ¿Necesitas orientación o quieres crear una solicitud técnica?
          </p>

          <Link href="/solicitudes/nueva" className="link-inline">
            Crear una solicitud
          </Link>

          <p style={{ marginTop: '1rem' }}>
            +57 319 405 0300
            <br />
            soporte@epicservices.com
          </p>
        </div>
      </div>

      <div className="container footer-bottom">
        <span>© 2026 Epic Services. Todos los derechos reservados.</span>
      </div>
    </footer>
  );
}