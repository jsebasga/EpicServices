'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { KpiCards } from '@/components/dashboard/KpiCards';
import { TicketModal } from '@/components/dashboard/TicketModal';
import { TicketStatusBadge } from '@/components/dashboard/TicketStatusBadge';
import { TimelineCard } from '@/components/dashboard/TimelineCard';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { useAuth } from '@/components/auth/AuthProvider';
import {
  addTicketComment,
  getClientTickets,
  getTicketComments,
  getTicketHistory,
  rateTicket,
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

const ACTIVE_STATUSES = ['new', 'assigned', 'in_progress', 'pending', 'quoted', 'paid'];
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

    rating: ticket.rating ?? null,
    ratingComment: ticket.ratingComment ?? '',
    ratedAt: ticket.ratedAt ? formatDate(ticket.ratedAt) : '',
    ratedBy: ticket.ratedBy ?? '',

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

export function ClientTicketsDashboard() {
  const { profile } = useAuth();

  const [tickets, setTickets] = useState<FirestoreTicket[]>([]);
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
      const clientTickets = await getClientTickets(profile.uid);
      setTickets(clientTickets);
    } catch (loadError) {
      console.error(loadError);
      setError('No pudimos cargar tus solicitudes. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadTickets();
  }, [profile?.uid]);

  const activeTickets = useMemo(
    () => tickets.filter((ticket) => ACTIVE_STATUSES.includes(ticket.status)),
    [tickets]
  );

  const closedTickets = useMemo(
    () => tickets.filter((ticket) => CLOSED_STATUSES.includes(ticket.status)),
    [tickets]
  );

  const kpis = useMemo(() => {
    const activeMinutes = activeTickets.reduce(
      (total, ticket) => total + ticket.timeSpentMinutes,
      0
    );

    const totalMinutes = tickets.reduce(
      (total, ticket) => total + ticket.timeSpentMinutes,
      0
    );

    const averageActiveMinutes = activeTickets.length
      ? Math.round(activeMinutes / activeTickets.length)
      : 0;

    return [
      {
        label: 'Solicitudes en curso',
        value: activeTickets.length.toString().padStart(2, '0'),
        helper: 'Casos que están en revisión, asignación o atención'
      },
      {
        label: 'Servicios finalizados',
        value: closedTickets.length.toString().padStart(2, '0'),
        helper: 'Solicitudes cerradas con seguimiento completo'
      },
      {
        label: 'Tiempo promedio actual',
        value: formatMinutes(averageActiveMinutes),
        helper: 'Promedio invertido en solicitudes que siguen activas'
      },
      {
        label: 'Tiempo total de atención',
        value: formatMinutes(totalMinutes),
        helper: 'Tiempo acumulado en la gestión de tus solicitudes'
      }
    ];
  }, [activeTickets, closedTickets, tickets]);

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
      setError('No pudimos cargar el detalle de la solicitud.');
    } finally {
      setModalLoading(false);
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

      await loadTickets();
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

      const [comments, history, updatedTickets] = await Promise.all([
        getTicketComments(selectedTicket.firestoreTicket.id),
        getTicketHistory(selectedTicket.firestoreTicket.id),
        getClientTickets(profile.uid)
      ]);

      const updatedTicket = updatedTickets.find(
        (ticket) => ticket.id === selectedTicket.firestoreTicket.id
      );

      setTickets(updatedTickets);

      if (updatedTicket) {
        const row = mapTicketToRow(updatedTicket);
        const mappedHistory = mapHistory(history);

        setSelectedTicket({
          firestoreTicket: updatedTicket,
          row,
          modalTicket: mapTicketToModalTicket(updatedTicket, mappedHistory),
          comments: mapComments(comments)
        });
      }
    } catch (statusError) {
      console.error(statusError);
      setError('No pudimos actualizar el estado de la solicitud.');
    }
  }

  async function handleRateTicket(rating: number, ratingComment: string) {
    if (!selectedTicket || !profile) {
      return;
    }

    setError('');

    try {
      await rateTicket({
        ticketId: selectedTicket.firestoreTicket.id,
        rating,
        ratingComment,
        client: profile
      });

      const [comments, history, updatedTickets] = await Promise.all([
        getTicketComments(selectedTicket.firestoreTicket.id),
        getTicketHistory(selectedTicket.firestoreTicket.id),
        getClientTickets(profile.uid)
      ]);

      const updatedTicket = updatedTickets.find(
        (ticket) => ticket.id === selectedTicket.firestoreTicket.id
      );

      setTickets(updatedTickets);

      if (updatedTicket) {
        const row = mapTicketToRow(updatedTicket);
        const mappedHistory = mapHistory(history);

        setSelectedTicket({
          firestoreTicket: updatedTicket,
          row,
          modalTicket: mapTicketToModalTicket(updatedTicket, mappedHistory),
          comments: mapComments(comments)
        });
      }
    } catch (ratingError) {
      console.error(ratingError);
      setError('No pudimos guardar la calificación. Intenta nuevamente.');
    }
  }

  function renderTable(title: string, tableTickets: FirestoreTicket[]) {
    return (
      <section className="card" style={{ padding: '1rem', marginTop: '1.2rem' }}>
        <div style={{ padding: '.35rem .5rem 1rem' }}>
          <strong style={{ fontSize: '1.05rem' }}>{title}</strong>
        </div>

        {tableTickets.length === 0 ? (
          <p style={{ color: 'var(--muted)', margin: 0, padding: '.5rem' }}>
            No hay solicitudes para mostrar en esta sección.
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
                </tr>
              </thead>

              <tbody>
                {tableTickets.map((ticket) => {
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
      title="Mi portal de servicios"
      subtitle="Consulta tus solicitudes activas, revisa el avance de cada ticket y accede al historial de servicios completados."
      currentPath="/dashboard/cliente"
      action={
        <Link href="/solicitudes/nueva" className="btn btn-primary">
          Crear una solicitud
        </Link>
      }
    >
      {error && (
        <p className="auth-message auth-message-error" style={{ marginBottom: '1rem' }}>
          {error}
        </p>
      )}

      {loading ? (
        <section className="card" style={{ padding: '1rem' }}>
          <h3>Cargando solicitudes...</h3>
          <p style={{ color: 'var(--muted)', marginBottom: 0 }}>
            Estamos consultando tus tickets.
          </p>
        </section>
      ) : (
        <>
          <KpiCards items={kpis} />

          <div style={{ marginTop: '1.2rem' }}>
            <TimelineCard />
          </div>

          {renderTable('Solicitudes en seguimiento', activeTickets)}
          {renderTable('Historial de solicitudes cerradas', closedTickets)}
        </>
      )}

      {modalLoading && (
        <p className="auth-message" style={{ marginTop: '1rem' }}>
          Cargando detalle de la solicitud...
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
          onRateTicket={handleRateTicket}
        />
      )}
    </DashboardLayout>
  );
}