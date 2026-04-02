import { KpiCards } from '@/components/dashboard/KpiCards';
import { RequestsTable } from '@/components/dashboard/RequestsTable';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { technicianKpis } from '@/data/mock';

export default function TechnicianDashboard() {
  return (
    <DashboardLayout title="Portal del técnico" subtitle="Interfaz para aceptar tickets, subir evidencias, controlar tiempos y visualizar ingresos." currentPath="/dashboard/tecnico" action={<button className="btn btn-primary">Actualizar disponibilidad</button>}>
      <KpiCards items={technicianKpis} />
      <div className="grid-2" style={{ marginTop: '1.2rem' }}>
        <section className="card" style={{ padding: '1.35rem' }}>
          <strong style={{ fontSize: '1.05rem' }}>Agenda de hoy</strong>
          <div style={{ display: 'grid', gap: '.9rem', marginTop: '1rem' }}>
            {[['08:30 AM', 'Soporte remoto · CRM sin acceso'], ['11:00 AM', 'Visita preventiva · 5 equipos'], ['02:00 PM', 'Revisión impresora y drivers'], ['04:30 PM', 'Entrega final · Ticket SRV-1045']].map(([hour, task]) => (
              <div key={hour} className="card" style={{ padding: '1rem' }}><strong>{hour}</strong><p style={{ margin: '.3rem 0 0', color: 'var(--muted)' }}>{task}</p></div>
            ))}
          </div>
        </section>
        <section className="card" style={{ padding: '1.35rem' }}>
          <strong style={{ fontSize: '1.05rem' }}>Wallet del técnico</strong>
          <div style={{ display: 'grid', gap: '.9rem', marginTop: '1rem' }}>
            <div className="card" style={{ padding: '1rem' }}><strong>Saldo disponible</strong><div className="kpi-value" style={{ fontSize: '2rem' }}>$1.180.000</div><p style={{ color: 'var(--muted)', margin: 0 }}>Listo para retiro o liquidación semanal</p></div>
            <div className="card" style={{ padding: '1rem' }}><strong>Por liberar</strong><p style={{ color: 'var(--muted)', margin: '.35rem 0 0' }}>$620.000 · sujeto a aprobación del cliente</p></div>
            <button className="btn btn-secondary">Solicitar retiro</button>
          </div>
        </section>
      </div>
      <RequestsTable title="Tickets asignados" />
    </DashboardLayout>
  );
}
