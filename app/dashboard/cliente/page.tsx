import Link from 'next/link';
import { KpiCards } from '@/components/dashboard/KpiCards';
import { RequestsTable } from '@/components/dashboard/RequestsTable';
import { TimelineCard } from '@/components/dashboard/TimelineCard';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { clientKpis } from '@/data/mock';

export default function ClientDashboard() {
  return (
    <DashboardLayout title="Portal del cliente" subtitle="Vista diseñada para que el usuario entienda fácilmente el estado de sus servicios y el flujo de pago." currentPath="/dashboard/cliente" action={<Link href="/solicitudes/nueva" className="btn btn-primary">Nueva solicitud</Link>}>
      <KpiCards items={clientKpis} />
      <div className="grid-2" style={{ marginTop: '1.2rem' }}>
        <TimelineCard />
        <section className="card" style={{ padding: '1.35rem' }}>
          <strong style={{ fontSize: '1.05rem' }}>Próximo pago / aprobación</strong>
          <div style={{ marginTop: '1rem', display: 'grid', gap: '1rem' }}>
            <div className="card" style={{ padding: '1rem' }}>
              <strong>Servicio: Diagnóstico de red oficina</strong>
              <p style={{ color: 'var(--muted)', margin: '.35rem 0 .75rem' }}>Incluye visita, pruebas de velocidad y reconfiguración</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                <span>Total: <strong>$420.000</strong></span>
                <span>Comisión plataforma: <strong>$42.000</strong></span>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '.75rem', flexWrap: 'wrap' }}>
                <button className="btn btn-primary">Aprobar y pagar</button>
                <button className="btn btn-secondary">Solicitar ajuste</button>
              </div>
            </div>
            <div className="card" style={{ padding: '1rem' }}><strong>Archivos recientes</strong><p style={{ color: 'var(--muted)', margin: '.35rem 0 0' }}>factura-preliminar.pdf · captura-red.png · acta-servicio.docx</p></div>
          </div>
        </section>
      </div>
      <RequestsTable title="Solicitudes recientes" />
    </DashboardLayout>
  );
}
