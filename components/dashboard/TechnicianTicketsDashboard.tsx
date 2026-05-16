'use client';

import { useEffect, useMemo, useState } from 'react';
import { KpiCards } from '@/components/dashboard/KpiCards';
import { TicketActions } from '@/components/dashboard/TicketActions';
import { TicketModal } from '@/components/dashboard/TicketModal';
import { TicketStatusBadge } from '@/components/dashboard/TicketStatusBadge';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  addTicketComment,
  completeTicket,
  getNewTickets,
  getTechnicianTickets,
  getTicketComments,
  getTicketHistory,
  takeTicket,
  updateTicketStatus
} from '@/services/ticketService';
import type { Ticket as FirestoreTicket } from '@/lib/tickets/ticketTypes';
import type { RequestRow, Ticket as UiTicket } from '@/lib/types';
import type { LocalTicketComment, TicketStatus } from '@/lib/ticketUtils';

type SelectedTicketState = {
  firestoreTicket: FirestoreTicket;
  row: RequestRow;
  modalTicket: UiTicket;
  comments: LocalTicketComment[];
};

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

function mapComments(comments: Awaited<ReturnType<typeof getTicketComments>>): LocalTicketComment[] {
  return comments.map((comment) => ({
    id: comment.id,
    author: comment.authorName,
    date: formatDate(comment.createdAt),
    text: comment.message
  }));
}

function mapHistory(history: Awaited<ReturnType<typeof getTicketHistory>>): UiTicket['history'] {
  return history.map((item) => ({
    id: item.id,
    ticketId: '',
    title: item.title,
    description: item.description,
    createdAt: formatDate(item.createdAt)
  }));
}

export function TechnicianTicketsDashboard() {
  const { profile } = useAuth();

  const [newTickets, setNewTickets] = useState<FirestoreTicket[]>([]);
  const [technicianTickets, setTechnicianTickets] = useState<FirestoreTicket[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<SelectedTicketState | null>(null);

  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [error, setError] = useState('');

  async function loadTickets() {
    if (!profile) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      const [availableTickets, assignedTickets] = await Promise.all([
        getNewTickets(),
        getTechnicianTickets(profile.uid)
      ]);

      setNewTickets(availableTickets);
      setTechnicianTickets(assignedTickets);
    } catch (loadError) {
      console.error(loadError);
      setError('No pudimos cargar los tickets del técnico. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTickets();
  }, [profile?.uid]);

  const assignedTickets = useMemo(
    () => technicianTickets.filter((ticket) => ACTIVE_STATUSES.includes(ticket.status)),
    [technicianTickets]
  );

  const resolvedTickets = useMemo(
    () => technicianTickets.filter((ticket) => CLOSED_STATUSES.includes(ticket.status)),
    [technicianTickets]
  );

  const kpis = useMemo(() => {
    const totalResolvedMinutes = resolvedTickets.reduce(
      (total, ticket) => total + ticket.timeSpentMinutes,
      0
    );

    const averageResolvedMinutes = resolvedTickets.length
      ? Math.round(totalResolvedMinutes / resolvedTickets.length)
      : 0;

      const ratedTickets = technicianTickets.filter(
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
        label: 'Tickets en atención',
        value: assignedTickets.length.toString().padStart(2, '0'),
        helper: 'Solicitudes activas que requieren seguimiento'
      },
      {
        label: 'Tickets resueltos',
        value: resolvedTickets.length.toString().padStart(2, '0'),
        helper: 'Servicios finalizados con registro de cierre'
      },
      {
        label: 'Tiempo promedio',
        value: formatMinutes(averageResolvedMinutes),
        helper: 'Tiempo promedio invertido por solicitud'
      },
      {
        label: 'Calificación',
        value: averageRating,
        helper: 'Promedio real de valoración recibida por clientes'
      }
    ];
}, [assignedTickets, resolvedTickets, technicianTickets]);

  async function handleOpenTicket(ticket: FirestoreTicket) {
    setModalLoading(true);

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

  async function handleTakeTicket(ticketId: string) {
    if (!profile) {
      return;
    }

    const ticket = newTickets.find((item) => item.code === ticketId || item.id === ticketId);

    if (!ticket) {
      return;
    }

    await takeTicket({
      ticketId: ticket.id,
      technician: profile
    });

    await loadTickets();
  }

  async function handleCompleteTicket(ticketId: string) {
    if (!profile) {
      return;
    }

    const ticket = assignedTickets.find((item) => item.code === ticketId || item.id === ticketId);

    if (!ticket) {
      return;
    }

    await completeTicket({
      ticketId: ticket.id,
      technician: profile
    });

    await loadTickets();
  }

  async function handleAddComment(_ticketId: string, comment: string) {
    if (!selectedTicket || !profile) {
      return;
    }

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

    await loadTickets();
  }

  async function handleUpdateStatus(_ticketId: string, status: TicketStatus) {
    if (!selectedTicket || !profile) {
      return;
    }

    await updateTicketStatus({
      ticketId: selectedTicket.firestoreTicket.id,
      status: status as FirestoreTicket['status'],
      updatedBy: profile
    });

    await loadTickets();
    setSelectedTicket(null);
  }

  function renderTable(params: {
    title: string;
    tableTickets: FirestoreTicket[];
    actionType?: 'take' | 'resolve';
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
                  {params.actionType && (
                    <th>{params.actionType === 'take' ? 'Aceptar ticket' : 'Resolver'}</th>
                  )}
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
                      <td><strong>{row.id}</strong></td>
                      <td>{row.client}</td>
                      <td>{row.service}</td>
                      <td>{row.technician}</td>
                      <td>
                        <TicketStatusBadge status={row.status} />
                      </td>
                      <td>{row.amount}</td>
                      <td>{row.eta}</td>

                      {params.actionType === 'take' && (
                        <td>
                          <TicketActions
                            type="take"
                            ticketId={ticket.id}
                            onUpdateStatus={() => handleTakeTicket(ticket.id)}
                          />
                        </td>
                      )}

                      {params.actionType === 'resolve' && (
                        <td>
                          <TicketActions
                            type="resolve"
                            ticketId={ticket.id}
                            onUpdateStatus={() => handleCompleteTicket(ticket.id)}
                          />
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
      title="Panel de atención técnica"
      subtitle="Revisa nuevos tickets, gestiona los servicios asignados y actualiza el avance de cada solicitud."
      currentPath="/dashboard/tecnico"
    >
      {error && (
        <p className="auth-message auth-message-error" style={{ marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      {loading ? (
        <section className="card" style={{ padding: '1rem' }}>
          <h3>Cargando tickets...</h3>
          <p style={{ color: 'var(--muted)', marginBottom: 0 }}>
            Estamos consultando los casos disponibles.
          </p>
        </section>
      ) : (
        <>
          <KpiCards items={kpis} />

          {renderTable({
            title: 'Nuevos tickets disponibles',
            tableTickets: newTickets,
            actionType: 'take'
          })}

          {renderTable({
            title: 'Tickets asignados a mi atención',
            tableTickets: assignedTickets,
            actionType: 'resolve'
          })}

          {renderTable({
            title: 'Historial de tickets resueltos',
            tableTickets: resolvedTickets
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