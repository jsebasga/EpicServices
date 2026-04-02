const steps = [
  { title: 'Solicitud creada', text: 'Cliente adjunta descripción, prioridad y archivos.' },
  { title: 'Cotización aprobada', text: 'La plataforma muestra subtotal, comisión y total a pagar.' },
  { title: 'Pago confirmado', text: 'Se habilita asignación técnica y reserva del servicio.' },
  { title: 'Trabajo en progreso', text: 'El técnico sube evidencias y actualiza estatus.' },
  { title: 'Cierre y calificación', text: 'Se valida entrega y se prepara liberación del pago.' }
];

export function TimelineCard() {
  return (
    <section className="card" style={{ padding: '1.35rem' }}>
      <strong style={{ fontSize: '1.05rem' }}>Flujo visual del servicio</strong>
      <div style={{ display: 'grid', gap: '1rem', marginTop: '1rem' }}>
        {steps.map((step, index) => (
          <div key={step.title} style={{ display: 'grid', gridTemplateColumns: '40px 1fr', gap: '.8rem', alignItems: 'start' }}>
            <div className="service-icon" style={{ width: 40, height: 40 }}>{index + 1}</div>
            <div><strong>{step.title}</strong><p style={{ margin: '.3rem 0 0', color: 'var(--muted)' }}>{step.text}</p></div>
          </div>
        ))}
      </div>
    </section>
  );
}
