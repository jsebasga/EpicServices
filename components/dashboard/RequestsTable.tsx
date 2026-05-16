'use client';

import { useEffect, useState } from 'react';
import type { RequestRow, Ticket } from '@/lib/types';
import {
  activeRequests,
  closedRequests,
  requests,
  technicians,
  tickets
} from '@/data/mock';
import {
  createLocalComment,
  getActionLabel,
  getCurrentTimeLabel,
  type LocalTicketComment,
  type TicketStatus
} from '@/lib/ticketUtils';
import { TicketActions } from './TicketActions';
import { TicketModal } from './TicketModal';
import { TicketStatusBadge } from './TicketStatusBadge';

type RequestsTableProps = {
  title: string;
  type?: 'active' | 'closed';
  rows?: RequestRow[];
  actionType?: 'take' | 'resolve' | 'assign';
};

export function RequestsTable({
  title,
  type,
  rows,
  actionType
}: RequestsTableProps) {
  const initialRows = rows ?? getRowsByType(type);
  const [tableRows, setTableRows] = useState<RequestRow[]>(initialRows);
  const [selectedRow, setSelectedRow] = useState<RequestRow | null>(null);
  const [commentsByTicket, setCommentsByTicket] = useState<Record<string, LocalTicketComment[]>>({});

  const actionLabel = getActionLabel(actionType);
  const selectedTicket = selectedRow ? getTicketById(selectedRow.id) : null;

  useEffect(() => {
    setTableRows(initialRows);
  }, [initialRows]);

  function updateTicketStatus(ticketId: string, status: TicketStatus) {
    const updatedAt = getCurrentTimeLabel();

    setTableRows((currentRows) =>
      currentRows.map((row) =>
        row.id === ticketId
          ? {
              ...row,
              status,
              eta: updatedAt
            }
          : row
      )
    );

    setSelectedRow((currentRow) =>
      currentRow?.id === ticketId
        ? {
            ...currentRow,
            status,
            eta: updatedAt
          }
        : currentRow
    );
  }

  function addTicketComment(ticketId: string, comment: string) {
    const newComment = createLocalComment(comment);

    setCommentsByTicket((currentComments) => ({
      ...currentComments,
      [ticketId]: [...(currentComments[ticketId] ?? []), newComment]
    }));
  }

  return (
    <>
      <section className="card" style={{ padding: '1rem', marginTop: '1.2rem' }}>
        <div style={{ padding: '.35rem .5rem 1rem' }}>
          <strong style={{ fontSize: '1.05rem' }}>{title}</strong>
        </div>

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
                {actionType && <th>{actionLabel}</th>}
              </tr>
            </thead>

            <tbody>
              {tableRows.map((row) => (
                <tr
                  key={row.id}
                  className="ticket-row"
                  onClick={() => setSelectedRow(row)}
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

                  {actionType === 'take' && (
                    <td>
                      <TicketActions
                        type="take"
                        ticketId={row.id}
                        onUpdateStatus={updateTicketStatus}
                      />
                    </td>
                  )}

                  {actionType === 'resolve' && (
                    <td>
                      <TicketActions
                        type="resolve"
                        ticketId={row.id}
                        onUpdateStatus={updateTicketStatus}
                      />
                    </td>
                  )}

                  {actionType === 'assign' && (
                    <td>
                      <div onClick={(event) => event.stopPropagation()}>
                        <select
                          className="table-select"
                          defaultValue=""
                          onChange={() => updateTicketStatus(row.id, 'paid')}
                        >
                          <option value="" disabled>
                            Elegir técnico
                          </option>

                          {technicians.map((technician) => (
                            <option key={technician} value={technician}>
                              {technician}
                            </option>
                          ))}
                        </select>
                      </div>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {selectedRow && selectedTicket && (
        <TicketModal
          ticket={selectedTicket}
          row={selectedRow}
          comments={commentsByTicket[selectedRow.id] ?? []}
          onClose={() => setSelectedRow(null)}
          onAddComment={addTicketComment}
          onUpdateStatus={updateTicketStatus}
        />
      )}
    </>
  );
}

function getRowsByType(type?: 'active' | 'closed'): RequestRow[] {
  if (type === 'active') {
    return activeRequests;
  }

  if (type === 'closed') {
    return closedRequests;
  }

  return requests;
}

function getTicketById(ticketId: string): Ticket | null {
  return tickets.find((ticket) => ticket.id === ticketId) ?? null;
}