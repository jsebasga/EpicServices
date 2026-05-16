const steps = [
  { title: 'Solicitud registrada', text: 'El cliente describe la necesidad, define prioridad y agrega información de apoyo.' },
  { title: 'Revisión del caso', text: 'El equipo analiza la información para clasificar la solicitud y definir el siguiente paso.' },
  { title: 'Asignación de responsable', text: 'Se asigna un técnico según disponibilidad, tipo de servicio y nivel de prioridad.' },
  { title: 'Atención en curso', text: 'El técnico registra avances, comentarios y evidencias durante la atención del caso.' },
  { title: 'Validación del resultado', text: 'El cliente revisa la solución o puede solicitar ajustes antes del cierre.' },
  { title: 'Solicitud cerrada', text: 'El caso queda finalizado con historial, comentarios y trazabilidad completa.' }
];

export function TimelineCard() {
  return (
    <section className="card" style={{ padding: '1.35rem' }}>
      <strong style={{ fontSize: '1.05rem' }}>Cómo avanza una solicitud</strong>
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
