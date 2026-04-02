import Link from 'next/link';
import { Headset } from 'lucide-react';

export function Header() {
  return (
    <header className="navbar">
      <div className="container navbar-inner">
        <Link href="/" className="brand">
          <span className="brand-mark"><Headset size={22} /></span>
          <span>Epic Services</span>
        </Link>
        <nav className="nav-links" aria-label="Principal">
          <Link href="/">Inicio</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/contacto">Contacto</Link>
          <Link href="/dashboard/cliente">Cliente</Link>
          <Link href="/dashboard/tecnico">Técnico</Link>
          <Link href="/dashboard/admin">Admin</Link>
        </nav>
        <div style={{ display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
          <Link href="/login" className="btn btn-secondary">Ingresar</Link>
          <Link href="/registro" className="btn btn-primary">Solicitar servicio</Link>
        </div>
      </div>
    </header>
  );
}
