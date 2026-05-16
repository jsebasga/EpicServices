import { Check, X } from 'lucide-react';
import type { TicketStatus } from '@/lib/ticketUtils';

type TicketActionsProps = {
  type: 'take' | 'resolve';
  ticketId: string;
  onUpdateStatus: (ticketId: string, status: TicketStatus) => void;
};

export function TicketActions({
  type,
  ticketId,
  onUpdateStatus
}: TicketActionsProps) {
  if (type === 'take') {
    return (
      <div
        className="ticket-actions"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="ticket-action-btn ticket-action-success"
          aria-label="Aceptar ticket"
          onClick={() => onUpdateStatus(ticketId, 'in_progress')}
        >
          <Check size={18} />
        </button>

        <button
          className="ticket-action-btn ticket-action-danger"
          aria-label="Rechazar ticket"
          onClick={() => onUpdateStatus(ticketId, 'cancelled')}
        >
          <X size={18} />
        </button>
      </div>
    );
  }

  return (
    <div
      className="ticket-actions"
      onClick={(event) => event.stopPropagation()}
    >
      <button
        className="ticket-action-btn ticket-action-success"
        aria-label="Marcar como resuelto"
        onClick={() => onUpdateStatus(ticketId, 'completed')}
      >
        <Check size={18} />
      </button>

      <button
        className="ticket-action-btn ticket-action-danger"
        aria-label="Mantener ticket en atención"
        onClick={() => onUpdateStatus(ticketId, 'in_progress')}
      >
        <X size={18} />
      </button>
    </div>
  );
}