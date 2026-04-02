import Link from 'next/link';
import { Headset, LayoutDashboard, ListChecks, Settings, Wallet } from 'lucide-react';

const nav = [
  { href: '/dashboard/cliente', label: 'Cliente' },
  { href: '/dashboard/tecnico', label: 'Técnico' },
  { href: '/dashboard/admin', label: 'Admin' },
  { href: '/solicitudes/nueva', label: 'Nueva solicitud' }
];

export function DashboardLayout({ title, subtitle, currentPath, children, action }: { title: string; subtitle: string; currentPath: string; children: React.ReactNode; action?: React.ReactNode; }) {
  return (
    <div className="dashboard-shell">
      <aside className="sidebar">
        <Link href="/" className="brand">
          <span className="brand-mark"><Headset size={22} /></span>
          <span>Epic Services</span>
        </Link>
        <nav>
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className={currentPath === item.href ? 'active' : ''}>{item.label}</Link>
          ))}
        </nav>
        <div className="card" style={{ padding: '1rem', marginTop: '1.5rem' }}>
          <div style={{ display: 'grid', gap: '.85rem' }}>
            <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center' }}>
              <div className="service-icon" style={{ width: 46, height: 46 }}><LayoutDashboard size={20} /></div>
              <div><strong>Frontend visual</strong><p style={{ margin: '.2rem 0 0', color: 'var(--muted)' }}>Listo para conectar con Firebase</p></div>
            </div>
            <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center' }}>
              <div className="service-icon" style={{ width: 46, height: 46 }}><Wallet size={20} /></div>
              <div><strong>Pagos</strong><p style={{ margin: '.2rem 0 0', color: 'var(--muted)' }}>Vista preparada para marketplace</p></div>
            </div>
            <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center' }}>
              <div className="service-icon" style={{ width: 46, height: 46 }}><ListChecks size={20} /></div>
              <div><strong>Tickets</strong><p style={{ margin: '.2rem 0 0', color: 'var(--muted)' }}>Flujo de estados bien visible</p></div>
            </div>
            <div style={{ display: 'flex', gap: '.8rem', alignItems: 'center' }}>
              <div className="service-icon" style={{ width: 46, height: 46 }}><Settings size={20} /></div>
              <div><strong>Escalable</strong><p style={{ margin: '.2rem 0 0', color: 'var(--muted)' }}>Base limpia para backend</p></div>
            </div>
          </div>
        </div>
      </aside>
      <main className="dashboard-main">
        <div className="page-heading">
          <div>
            <span className="badge">Demo visual del portal</span>
            <h1 style={{ margin: '.9rem 0 .55rem', fontSize: 'clamp(2rem, 3vw, 3rem)' }}>{title}</h1>
            <p style={{ color: 'var(--muted)', margin: 0 }}>{subtitle}</p>
          </div>
          {action}
        </div>
        {children}
      </main>
    </div>
  );
}
