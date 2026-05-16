'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { KeyRound, LogOut } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { getDashboardPathByRole } from '@/lib/auth/roleRedirect';
import { logout } from '@/services/authService';
import { ThemeToggle } from '@/components/shared/ThemeToggle';

type DashboardLayoutProps = {
  title: string;
  subtitle: string;
  currentPath: string;
  children: React.ReactNode;
  action?: React.ReactNode;
};

const publicNav = [
  { href: '/', label: 'Inicio' },
  { href: '/servicios', label: 'Servicios' },
  { href: '/contacto', label: 'Contacto' }
];

const roleNav = {
  client: { href: '/dashboard/cliente', label: 'Mi portal' },
  technician: { href: '/dashboard/tecnico', label: 'Atención técnica' },
  admin: { href: '/dashboard/admin', label: 'Administración' }
};

export function DashboardLayout({
  title,
  subtitle,
  currentPath,
  children,
  action
}: DashboardLayoutProps) {
  const router = useRouter();
  const { profile } = useAuth();
  const firstName = profile?.name?.split(' ')[0] ?? 'Usuario';

  const dashboardItem = profile ? roleNav[profile.role] : null;
  const nav = dashboardItem ? [...publicNav, dashboardItem] : publicNav;

  async function handleLogout() {
    try {
      await logout();
      window.location.href = '/';
    } catch (error) {
      console.error('Error closing session:', error);
    }
  }

  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
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

        <nav>
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={currentPath === item.href ? 'active' : ''}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="sidebar-footer">
          <div className="sidebar-theme-row">
              <span>Hola, {firstName}</span>
          </div>
          <div className="sidebar-theme-row">
            <span>Apariencia</span>
            <ThemeToggle />
          </div>
          <Link href="/dashboard/cambiar-contrasena" className="btn btn-secondary sidebar-account-action">
            <KeyRound size={18} />
            Cambiar contraseña
          </Link>

          <button
            type="button"
            className="btn sidebar-logout"
            onClick={handleLogout}
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <div className="page-heading">
          <div>
            <h1 style={{ margin: '0 0 .55rem', fontSize: 'clamp(2rem, 3vw, 3rem)' }}>
              {title}
            </h1>
            <p style={{ color: 'var(--muted)', margin: 0 }}>
              {subtitle}
            </p>
          </div>

          {action}
        </div>

        {children}
      </main>
    </div>
  );
}