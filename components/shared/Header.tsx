'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/auth/AuthProvider';
import { getDashboardPathByRole } from '@/lib/auth/roleRedirect';
import { logout } from '@/services/authService';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

export function Header() {
  const router = useRouter();
  const { isAuthenticated, profile, loading } = useAuth();
  const firstName = profile?.name?.split(' ')[0] ?? 'Usuario';

  async function handleLogout() {
    try {
      await logout();
      router.push('/');
    } catch (error) {
      console.error('Error closing session:', error);
    }
  }

  function handleGoToPortal() {
    router.push(getDashboardPathByRole(profile?.role));
  }

  return (
    <header className="navbar">
      <div className="container navbar-inner">
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

        <nav className="nav-links">
          <Link href="/">Inicio</Link>
          <Link href="/servicios">Servicios</Link>
          <Link href="/contacto">Contacto</Link>
        </nav>

        <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center' }}>
          {isAuthenticated && !loading && (
            <div className="sidebar-theme-row">
            <span>Hola, {firstName}</span>
            </div>
          )}

          <ThemeToggle />

          {loading ? (
            <>
              <button type="button" className="btn btn-secondary" disabled>
                Cargando...
              </button>

              <button type="button" className="btn btn-primary" disabled>
                Cargando...
              </button>
            </>
          ) : isAuthenticated ? (
            <>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleGoToPortal}
              >
                Ir al portal
              </button>

              <button
                type="button"
                className="btn btn-danger"
                onClick={handleLogout}
              >
                Cerrar sesión
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="btn btn-secondary">
                Ingresar
              </Link>

              <Link href="/registro" className="btn btn-primary">
                Crear cuenta
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}