import { KpiCards } from '@/components/dashboard/KpiCards';
import { RequestsTable } from '@/components/dashboard/RequestsTable';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { adminKpis } from '@/data/mock';

export default function AdminDashboard() {
  return (
    <DashboardLayout title="Portal administrativo" subtitle="Vista central para operación, asignación, pagos y control visual del negocio." currentPath="/dashboard/admin" action={<button className="btn btn-primary">Crear categoría de servicio</button>}>
      <KpiCards items={adminKpis} />
      <div className="grid-2" style={{ marginTop: '1.2rem' }}>
        <section className="card" style={{ padding: '1.35rem' }}>
          <strong style={{ fontSize: '1.05rem' }}>Control operativo</strong>
          <div style={{ display: 'grid', gap: '.9rem', marginTop: '1rem' }}>
            <div className="card" style={{ padding: '1rem' }}><strong>18 tickets sin técnico</strong><p style={{ color: 'var(--muted)', margin: '.35rem 0 0' }}>Conviene resaltar esto visualmente en producción con alertas y filtros.</p></div>
            <div className="card" style={{ padding: '1rem' }}><strong>7 pagos por validar</strong><p style={{ color: 'var(--muted)', margin: '.35rem 0 0' }}>Pendientes de conciliación contra la pasarela.</p></div>
            <div className="card" style={{ padding: '1rem' }}><strong>Top categoría</strong><p style={{ color: 'var(--muted)', margin: '.35rem 0 0' }}>Soporte remoto prioritario · 34% del volumen semanal</p></div>
          </div>
        </section>
        <section className="card" style={{ padding: '1.35rem' }}>
          <strong style={{ fontSize: '1.05rem' }}>Flujo financiero</strong>
          <div style={{ display: 'grid', gap: '.9rem', marginTop: '1rem' }}>
            <div className="card" style={{ padding: '1rem' }}><strong>Recaudo bruto</strong><p style={{ color: 'var(--muted)', margin: '.35rem 0 0' }}>$31.540.000</p></div>
            <div className="card" style={{ padding: '1rem' }}><strong>Comisión plataforma</strong><p style={{ color: 'var(--muted)', margin: '.35rem 0 0' }}>$4.731.000</p></div>
            <div className="card" style={{ padding: '1rem' }}><strong>Por pagar a técnicos</strong><p style={{ color: 'var(--muted)', margin: '.35rem 0 0' }}>$18.060.000</p></div>
          </div>
        </section>
      </div>
      <RequestsTable title="Vista general de tickets" />
    </DashboardLayout>
  );
}
