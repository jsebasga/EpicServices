'use client';

import { useEffect, useMemo, useState } from 'react';
import { KpiCards } from '@/components/dashboard/KpiCards';
import { TicketModal } from '@/components/dashboard/TicketModal';
import { TicketStatusBadge } from '@/components/dashboard/TicketStatusBadge';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  addTicketComment,
  assignTicketToTechnician,
  getAllTickets,
  getAverageDailyTickets,
  getTicketComments,
  getTicketHistory,
  getTodayTicketsCount,
  updateTicketStatus
} from '@/services/ticketService';
import {
  getActiveUsersCount,
  getTechnicians
} from '@/services/userService';
import type { UserProfile } from '@/lib/auth/authTypes';
import type { Ticket as FirestoreTicket } from '@/lib/tickets/ticketTypes';
import type { RequestRow, Ticket as UiTicket } from '@/lib/types';
import type { LocalTicketComment, TicketStatus } from '@/lib/ticketUtils';

type SelectedTicketState = {
  firestoreTicket: FirestoreTicket;
  row: RequestRow;
  modalTicket: UiTicket;
  comments: LocalTicketComment[];
};

const NEW_STATUSES = ['new'];
const ACTIVE_STATUSES = ['assigned', 'in_progress'];
const CLOSED_STATUSES = ['completed', 'cancelled'];

function formatDate(date?: Date | null) {
  if (!date) {
    return 'Sin registro';
  }

  return new Intl.DateTimeFormat('es-CO', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date);
}

function formatMinutes(minutes: number) {
  if (!minutes) {
    return '0h 00m';
  }

  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  return `${hours}h ${remainingMinutes.toString().padStart(2, '0')}m`;
}

function mapTicketToRow(ticket: FirestoreTicket): RequestRow {
  return {
    id: ticket.code,
    client: ticket.clientName,
    service: ticket.serviceName,
    technician: ticket.technicianName || 'Sin asignar',
    status: ticket.status as TicketStatus,
    amount: formatMinutes(ticket.timeSpentMinutes),
    eta: formatDate(ticket.updatedAt)
  };
}

function mapTicketToModalTicket(
  ticket: FirestoreTicket,
  history: UiTicket['history']
): UiTicket {
  return {
    id: ticket.code,
    title: ticket.title,
    description: ticket.description,
    clientId: ticket.clientId,
    clientName: ticket.clientName,
    serviceName: ticket.serviceName,
    category: ticket.category,
    technicianId: ticket.technicianId,
    technicianName: ticket.technicianName,
    status: ticket.status,
    priority: ticket.priority,
    channel: ticket.channel,
    city: ticket.city,
    preferredSchedule: ticket.preferredSchedule,
    timeSpent: formatMinutes(ticket.timeSpentMinutes),
    createdAt: formatDate(ticket.createdAt),
    updatedAt: formatDate(ticket.updatedAt),
    comments: [],
    attachments: [],
    history
  };
}

function mapComments(
  comments: Awaited<ReturnType<typeof getTicketComments>>
): LocalTicketComment[] {
  return comments.map((comment) => ({
    id: comment.id,
    author: comment.authorName,
    date: formatDate(comment.createdAt),
    text: comment.message
  }));
}

function mapHistory(
  history: Awaited<ReturnType<typeof getTicketHistory>>
): UiTicket['history'] {
  return history.map((item) => ({
    id: item.id,
    ticketId: '',
    title: item.title,
    description: item.description,
    createdAt: formatDate(item.createdAt)
  }));
}

export function AdminTicketsDashboard() {
  const { profile } = useAuth();

  const [tickets, setTickets] = useState<FirestoreTicket[]>([]);
  const [technicians, setTechnicians] = useState<UserProfile[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SelectedTicketState | null>(null);

  const [activeUsersCount, setActiveUsersCount] = useState(0);
  const [todayTicketsCount, setTodayTicketsCount] = useState(0);
  const [averageDailyTickets, setAverageDailyTickets] = useState(0);

  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadData() {
    if (!profile) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const [
        allTickets,
        activeTechnicians,
        usersCount,
        todayCount,
        dailyAverage
      ] = await Promise.all([
        getAllTickets(),
        getTechnicians(),
        getActiveUsersCount(),
        getTodayTicketsCount(),
        getAverageDailyTickets(7)
      ]);

      setTickets(allTickets);
      setTechnicians(activeTechnicians);
      setActiveUsersCount(usersCount);
      setTodayTicketsCount(todayCount);
      setAverageDailyTickets(dailyAverage);
    } catch (loadError) {
      console.error(loadError);
      setError('No pudimos cargar la información administrativa. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [profile?.uid]);

  const newTickets = useMemo(
    () => tickets.filter((ticket) => NEW_STATUSES.includes(ticket.status)),
    [tickets]
  );

  const activeTickets = useMemo(
    () => tickets.filter((ticket) => ACTIVE_STATUSES.includes(ticket.status)),
    [tickets]
  );

  const finishedTickets = useMemo(
    () => tickets.filter((ticket) => CLOSED_STATUSES.includes(ticket.status)),
    [tickets]
  );

  const kpis = useMemo(() => {
    const totalMinutes = tickets.reduce(
      (total, ticket) => total + ticket.timeSpentMinutes,
      0
    );

    const averageMinutes = tickets.length
      ? Math.round(totalMinutes / tickets.length)
      : 0;

      const ratedTickets = tickets.filter(
        (ticket) => typeof ticket.rating === 'number' && ticket.rating > 0
      );
      
      const averageRating = ratedTickets.length
        ? (
            ratedTickets.reduce(
              (total, ticket) => total + (ticket.rating ?? 0),
              0
            ) / ratedTickets.length
          ).toFixed(1)
        : 'Sin calificar';

    return [
      {
        label: 'Tickets por asignar',
        value: newTickets.length.toString().padStart(2, '0'),
        helper: 'Solicitudes nuevas que requieren revisión'
      },
      {
        label: 'Tickets en atención',
        value: activeTickets.length.toString().padStart(2, '0'),
        helper: 'Casos activos con seguimiento operativo'
      },
      {
        label: 'Tickets cerrados',
        value: finishedTickets.length.toString().padStart(2, '0'),
        helper: 'Solicitudes finalizadas o canceladas'
      },
      {
        label: 'Tiempo promedio',
        value: formatMinutes(averageMinutes),
        helper: 'Promedio general de atención por ticket'
      },
      {
        label: 'Satisfacción promedio',
        value: averageRating,
        helper: 'Promedio real de calificaciones de clientes'
      },
      {
        label: 'Técnicos activos',
        value: technicians.length.toString().padStart(2, '0'),
        helper: 'Responsables disponibles para asignación'
      },
      {
        label: 'Usuarios activos',
        value: activeUsersCount.toString().padStart(2, '0'),
        helper: 'Usuarios activos registrados en la plataforma'
      },
      {
        label: 'Solicitudes diarias',
        value: averageDailyTickets.toString().padStart(2, '0'),
        helper: `Promedio diario de los últimos 7 días · Hoy: ${todayTicketsCount}`
      }
    ];
  }, [
    tickets,
    newTickets,
    activeTickets,
    finishedTickets,
    technicians,
    activeUsersCount,
    todayTicketsCount,
    averageDailyTickets
  ]);

  async function handleOpenTicket(ticket: FirestoreTicket) {
    setModalLoading(true);
    setError('');

    try {
      const [comments, history] = await Promise.all([
        getTicketComments(ticket.id),
        getTicketHistory(ticket.id)
      ]);

      const row = mapTicketToRow(ticket);
      const mappedHistory = mapHistory(history);

      setSelectedTicket({
        firestoreTicket: ticket,
        row,
        modalTicket: mapTicketToModalTicket(ticket, mappedHistory),
        comments: mapComments(comments)
      });
    } catch (modalError) {
      console.error(modalError);
      setError('No pudimos cargar el detalle del ticket.');
    } finally {
      setModalLoading(false);
    }
  }

  async function handleAssignTicket(ticket: FirestoreTicket, technicianId: string) {
    if (!profile || !technicianId) {
      return;
    }

    setError('');

    const technician = technicians.find((item) => item.uid === technicianId);

    if (!technician) {
      setError('No encontramos el técnico seleccionado.');
      return;
    }

    try {
      await assignTicketToTechnician({
        ticketId: ticket.id,
        technicianId: technician.uid,
        technicianName: technician.name,
        assignedBy: profile
      });

      await loadData();
    } catch (assignError) {
      console.error(assignError);
      setError('No pudimos asignar el ticket. Intenta nuevamente.');
    }
  }

  async function handleAddComment(_ticketId: string, comment: string) {
    if (!selectedTicket || !profile) {
      return;
    }

    setError('');

    try {
      await addTicketComment({
        ticketId: selectedTicket.firestoreTicket.id,
        author: profile,
        message: comment
      });

      const comments = await getTicketComments(selectedTicket.firestoreTicket.id);

      setSelectedTicket((currentValue) => {
        if (!currentValue) {
          return currentValue;
        }

        return {
          ...currentValue,
          comments: mapComments(comments)
        };
      });

      await loadData();
    } catch (commentError) {
      console.error(commentError);
      setError('No pudimos guardar el comentario. Intenta nuevamente.');
    }
  }

  async function handleUpdateStatus(_ticketId: string, status: TicketStatus) {
    if (!selectedTicket || !profile) {
      return;
    }

    setError('');

    try {
      await updateTicketStatus({
        ticketId: selectedTicket.firestoreTicket.id,
        status: status as FirestoreTicket['status'],
        updatedBy: profile
      });

      await loadData();
      setSelectedTicket(null);
    } catch (statusError) {
      console.error(statusError);
      setError('No pudimos actualizar el estado del ticket. Intenta nuevamente.');
    }
  }

  function renderTable(params: {
    title: string;
    tableTickets: FirestoreTicket[];
    showAssign?: boolean;
  }) {
    return (
      <section className="card" style={{ padding: '1rem', marginTop: '1.2rem' }}>
        <div style={{ padding: '.35rem .5rem 1rem' }}>
          <strong style={{ fontSize: '1.05rem' }}>{params.title}</strong>
        </div>

        {params.tableTickets.length === 0 ? (
          <p style={{ color: 'var(--muted)', margin: 0, padding: '.5rem' }}>
            No hay tickets para mostrar en esta sección.
          </p>
        ) : (
          <div className="table-wrap">
            <table className="table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Servicio</th>
                  <th>Responsable</th>
                  <th>Estado</th>
                  <th>Tiempo registrado</th>
                  <th>Último cambio</th>
                  {params.showAssign && <th>Asignar a</th>}
                </tr>
              </thead>

              <tbody>
                {params.tableTickets.map((ticket) => {
                  const row = mapTicketToRow(ticket);

                  return (
                    <tr
                      key={ticket.id}
                      className="clickable-row"
                      onClick={() => handleOpenTicket(ticket)}
                    >
                      <td>
                        <strong>{row.id}</strong>
                      </td>

                      <td>{row.client}</td>
                      <td>{row.service}</td>
                      <td>{row.technician}</td>

                      <td>
                        <TicketStatusBadge status={row.status} />
                      </td>

                      <td>{row.amount}</td>
                      <td>{row.eta}</td>

                      {params.showAssign && (
                        <td onClick={(event) => event.stopPropagation()}>
                          <select
                            className="table-select"
                            defaultValue=""
                            onChange={(event) =>
                              handleAssignTicket(ticket, event.target.value)
                            }
                          >
                            <option value="" disabled>
                              Elegir técnico
                            </option>

                            {technicians.map((technician) => (
                              <option key={technician.uid} value={technician.uid}>
                                {technician.name}
                              </option>
                            ))}
                          </select>
                        </td>
                      )}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    );
  }

  return (
    <DashboardLayout
      title="Panel de administración"
      subtitle="Supervisa la operación, revisa tickets nuevos, asigna responsables y consulta el estado general de las solicitudes."
      currentPath="/dashboard/admin"
    >
      {error && (
        <p className="auth-message auth-message-error" style={{ marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      {loading ? (
        <section className="card" style={{ padding: '1rem' }}>
          <h3>Cargando operación...</h3>
          <p style={{ color: 'var(--muted)', marginBottom: 0 }}>
            Estamos consultando tickets, técnicos y métricas.
          </p>
        </section>
      ) : (
        <>
          <KpiCards items={kpis} />

          {renderTable({
            title: 'Tickets pendientes de asignación',
            tableTickets: newTickets,
            showAssign: true
          })}

          {renderTable({
            title: 'Tickets actualmente en atención',
            tableTickets: activeTickets
          })}

          {renderTable({
            title: 'Historial de tickets finalizados',
            tableTickets: finishedTickets
          })}
        </>
      )}

      {modalLoading && (
        <p className="auth-message" style={{ marginTop: '1rem' }}>
          Cargando detalle del ticket...
        </p>
      )}

      {selectedTicket && (
        <TicketModal
          ticket={selectedTicket.modalTicket}
          row={selectedTicket.row}
          comments={selectedTicket.comments}
          onClose={() => setSelectedTicket(null)}
          onAddComment={handleAddComment}
          onUpdateStatus={handleUpdateStatus}
        />
      )}
    </DashboardLayout>
  );
}