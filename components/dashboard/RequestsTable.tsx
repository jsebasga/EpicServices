import { requests } from '@/data/mock';

const statusMap = {
  quoted: { label: 'Cotizado', className: 'status warning' },
  paid: { label: 'Pagado', className: 'status success' },
  in_progress: { label: 'En progreso', className: 'status info' },
  pending: { label: 'Pendiente', className: 'status warning' },
  completed: { label: 'Completado', className: 'status success' },
  cancelled: { label: 'Cancelado', className: 'status danger' }
};

export function RequestsTable({ title }: { title: string }) {
  return (
    <section className="card" style={{ padding: '1rem', marginTop: '1.2rem' }}>
      <div style={{ padding: '.35rem .5rem 1rem' }}><strong style={{ fontSize: '1.05rem' }}>{title}</strong></div>
      <div className="table-wrap">
        <table className="table">
          <thead><tr><th>ID</th><th>Cliente</th><th>Servicio</th><th>Técnico</th><th>Estado</th><th>Monto</th><th>ETA</th></tr></thead>
          <tbody>
            {requests.map((row) => (
              <tr key={row.id}>
                <td><strong>{row.id}</strong></td>
                <td>{row.client}</td>
                <td>{row.service}</td>
                <td>{row.technician}</td>
                <td><span className={statusMap[row.status].className}>{statusMap[row.status].label}</span></td>
                <td>{row.amount}</td>
                <td>{row.eta}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
