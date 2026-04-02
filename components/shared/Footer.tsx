import Link from 'next/link';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <h4>Epic Services Help Desk</h4>
          <p>Sitio frontend base en Next.js para una mesa de ayuda tecnológica con solicitud, seguimiento y pago de servicios.</p>
        </div>
        <div>
          <h4>Navegación</h4>
          <p><Link href="/">Inicio</Link></p>
          <p><Link href="/servicios">Servicios</Link></p>
          <p><Link href="/contacto">Contacto</Link></p>
        </div>
        <div>
          <h4>Portales</h4>
          <p><Link href="/dashboard/cliente">Cliente</Link></p>
          <p><Link href="/dashboard/tecnico">Técnico</Link></p>
          <p><Link href="/dashboard/admin">Administrador</Link></p>
        </div>
        <div>
          <h4>Contacto</h4>
          <p>hola@epicservices.co</p>
          <p>+57 300 000 0000</p>
          <p>Bogotá · Soacha · Atención remota nacional</p>
        </div>
      </div>
    </footer>
  );
}
