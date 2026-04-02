import Link from 'next/link';
import { ArrowRight, BadgeCheck, CalendarCheck2, CreditCard, FolderKanban } from 'lucide-react';

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="badge">Mesa de ayuda con gestión visual, seguimiento y cobro integrado</span>
          <h1>Solicita, paga y <span className="text-gradient">controla tus servicios</span> tecnológicos</h1>
          <p>
            Epic Services se rediseña como una plataforma moderna para clientes, técnicos y administración.
            El objetivo es que el usuario pueda pedir soporte, aprobar cotizaciones, pagar y seguir cada ticket
            con una experiencia clara y profesional.
          </p>
          <div className="check-list">
            <div className="check-item"><span className="icon-bubble"><CalendarCheck2 size={18} /></span> Solicitud guiada por tipo de servicio y prioridad</div>
            <div className="check-item"><span className="icon-bubble"><FolderKanban size={18} /></span> Timeline de estados, SLA, evidencias y entregables</div>
            <div className="check-item"><span className="icon-bubble"><CreditCard size={18} /></span> Flujo preparado para cotización, pago y liquidación a técnicos</div>
          </div>
          <div style={{ display: 'flex', gap: '.85rem', flexWrap: 'wrap' }}>
            <Link href="/solicitudes/nueva" className="btn btn-primary">Crear solicitud <ArrowRight size={18} /></Link>
            <Link href="/dashboard/admin" className="btn btn-secondary">Ver dashboard visual</Link>
          </div>
        </div>
        <div className="card-soft hero-panel">
          <div className="hero-visual">
            <div className="hero-shot" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80')" }} />
            <div style={{ display: 'grid', gap: '1rem' }}>
              <div className="hero-stat">
                <span className="badge"><BadgeCheck size={16} /> Estado en tiempo real</span>
                <h3>Control completo del ticket</h3>
                <p style={{ color: 'var(--muted)', marginBottom: '.9rem' }}>Cada solicitud puede avanzar desde cotización hasta entrega con trazabilidad clara.</p>
                <div className="progress-bar"><span style={{ width: '78%' }} /></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '.5rem', color: 'var(--muted)' }}><small>Diagnóstico</small><small>78%</small></div>
              </div>
              <div className="mini-panel">
                <h3>Resumen rápido</h3>
                <div style={{ display: 'grid', gap: '.8rem', marginTop: '.9rem' }}>
                  <div className="card" style={{ padding: '.85rem 1rem' }}><strong>Ticket SRV-1045</strong><p style={{ margin: '.3rem 0 0', color: 'var(--muted)' }}>Red corporativa · Técnico asignado · Pago confirmado</p></div>
                  <div className="card" style={{ padding: '.85rem 1rem' }}><strong>Liquidación semanal</strong><p style={{ margin: '.3rem 0 0', color: 'var(--muted)' }}>$2.480.000 disponibles para liberar</p></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
