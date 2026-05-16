'use client';

import { useState } from 'react';
import {
  Download,
  FileText,
  MessageSquare,
  Save,
  Star,
  UserCheck,
  X
} from 'lucide-react';
import type { RequestRow, Ticket } from '@/lib/types';
import {
  statusOptions,
  type LocalTicketComment,
  type TicketStatus
} from '@/lib/ticketUtils';
import { TicketStatusBadge } from './TicketStatusBadge';
import { useAuth } from '@/components/auth/AuthProvider';

type TicketModalProps = {
  ticket: Ticket;
  row: RequestRow;
  comments: LocalTicketComment[];
  onClose: () => void;
  onAddComment: (ticketId: string, comment: string) => void | Promise<void>;
  onUpdateStatus: (ticketId: string, status: TicketStatus) => void | Promise<void>;
  onRateTicket?: (rating: number, ratingComment: string) => void | Promise<void>;
};

export function TicketModal({
  ticket,
  row,
  comments,
  onClose,
  onAddComment,
  onUpdateStatus,
  onRateTicket
}: TicketModalProps) {
  const { profile } = useAuth();

  const canAddComment = Boolean(profile);
  const canUpdateStatus = profile?.role === 'technician' || profile?.role === 'admin';

  const canRateTicket =
    profile?.role === 'client' &&
    row.status === 'completed' &&
    !ticket.rating &&
    Boolean(onRateTicket);

  const hasRating = typeof ticket.rating === 'number' && ticket.rating > 0;

  const [showCommentForm, setShowCommentForm] = useState(false);
  const [showStatusForm, setShowStatusForm] = useState(false);

  const [commentText, setCommentText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<TicketStatus>(row.status);

  const [ratingValue, setRatingValue] = useState(5);
  const [ratingComment, setRatingComment] = useState('');
  const [ratingLoading, setRatingLoading] = useState(false);

  async function handleSaveComment() {
    if (!commentText.trim()) {
      return;
    }

    await onAddComment(ticket.id, commentText.trim());

    setCommentText('');
    setShowCommentForm(false);
  }

  async function handleSaveStatus() {
    if (!canUpdateStatus) {
      return;
    }

    await onUpdateStatus(ticket.id, selectedStatus);

    setShowStatusForm(false);
  }

  async function handleSaveRating() {
    if (!onRateTicket || !canRateTicket) {
      return;
    }

    setRatingLoading(true);

    try {
      await onRateTicket(ratingValue, ratingComment.trim());
      setRatingComment('');
    } finally {
      setRatingLoading(false);
    }
  }

  return (
    <div className="ticket-modal-backdrop" onClick={onClose}>
      <article
        className="ticket-modal card"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="ticket-modal-header">
          <div>
            <span className="ticket-modal-eyebrow">
              Información de la solicitud
            </span>
            <h2>{ticket.id}</h2>
          </div>

          <button
            type="button"
            className="ticket-modal-close"
            onClick={onClose}
            aria-label="Cerrar detalle del ticket"
          >
            <X size={20} />
          </button>
        </div>

        <div className="ticket-modal-section">
          <h3>{ticket.title}</h3>
          <p>{ticket.description}</p>
        </div>

        <div className="ticket-modal-summary">
          <div>
            <span>Estado de la solicitud</span>
            <TicketStatusBadge status={row.status} />
          </div>

          <div>
            <span>Prioridad</span>
            <strong>{getPriorityLabel(ticket.priority)}</strong>
          </div>

          <div>
            <span>Modalidad de atención</span>
            <strong>{getChannelLabel(ticket.channel)}</strong>
          </div>
        </div>

        <div className="ticket-modal-grid">
          <div className="ticket-detail-item">
            <span>Cliente</span>
            <strong>{ticket.clientName}</strong>
          </div>

          <div className="ticket-detail-item">
            <span>Servicio</span>
            <strong>{ticket.serviceName}</strong>
          </div>

          <div className="ticket-detail-item">
            <span>Categoría</span>
            <strong>{ticket.category}</strong>
          </div>

          <div className="ticket-detail-item">
            <span>Ciudad</span>
            <strong>{ticket.city}</strong>
          </div>

          <div className="ticket-detail-item">
            <span>Responsable asignado</span>
            <strong>{row.technician}</strong>
          </div>

          <div className="ticket-detail-item">
            <span>Tiempo registrado</span>
            <strong>{row.amount}</strong>
          </div>

          <div className="ticket-detail-item">
            <span>Fecha de creación</span>
            <strong>{ticket.createdAt}</strong>
          </div>

          <div className="ticket-detail-item">
            <span>Última actualización</span>
            <strong>{row.eta}</strong>
          </div>

          {ticket.preferredSchedule && (
            <div className="ticket-detail-item ticket-detail-full">
              <span>Horario preferido</span>
              <strong>{ticket.preferredSchedule}</strong>
            </div>
          )}
        </div>

        <div className="ticket-modal-section">
          <h3>Archivos de apoyo</h3>

          {ticket.attachments.length === 0 ? (
            <p>No hay archivos de apoyo registrados para esta solicitud.</p>
          ) : (
            <div className="ticket-files">
              {ticket.attachments.map((attachment) => (
                <div key={attachment.id} className="ticket-file-item">
                  <FileText size={18} />
                  <span>{attachment.name}</span>

                  <button
                    type="button"
                    aria-label={`Descargar ${attachment.name}`}
                  >
                    <Download size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="ticket-modal-section">
          <h3>Comentarios y actualizaciones</h3>

          {comments.length === 0 ? (
            <p>Aún no hay comentarios registrados para esta solicitud.</p>
          ) : (
            <div className="ticket-comments">
              {comments.map((comment) => (
                <div key={comment.id} className="ticket-comment-item">
                  <strong>{comment.author}</strong>
                  <span>{comment.date}</span>
                  <p>{comment.text}</p>
                </div>
              ))}
            </div>
          )}

          {showCommentForm && canAddComment && (
            <div className="ticket-inline-form">
              <textarea
                placeholder="Escribe una actualización, nota interna o comentario sobre esta solicitud..."
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
              />

              <div className="ticket-inline-actions">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveComment}
                >
                  <Save size={18} />
                  Guardar actualización
                </button>

                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setCommentText('');
                    setShowCommentForm(false);
                  }}
                >
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="ticket-modal-section">
          <h3>Historial de la solicitud</h3>

          {ticket.history.length === 0 ? (
            <p>Esta solicitud aún no tiene historial registrado.</p>
          ) : (
            <div className="ticket-history">
              {ticket.history.map((historyItem, index) => (
                <div key={historyItem.id}>
                  <span>{index + 1}</span>
                  <p>
                    <strong>{historyItem.title}</strong>
                    <br />
                    {historyItem.description}
                    <br />
                    <small>{historyItem.createdAt}</small>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {profile?.role === 'client' && row.status === 'completed' && (
          <div className="ticket-modal-section">
            <h3>Calificación del servicio</h3>

            {hasRating ? (
              <div className="ticket-rating-summary">
                <div className="ticket-rating-stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star
                      key={index}
                      size={18}
                      fill={index < Number(ticket.rating) ? 'currentColor' : 'none'}
                    />
                  ))}
                </div>

                <strong>{ticket.rating} / 5</strong>

                <p>
                  {ticket.ratingComment
                    ? ticket.ratingComment
                    : 'El cliente calificó esta solicitud sin comentario adicional.'}
                </p>

                {ticket.ratedAt && (
                  <small>Calificado el {ticket.ratedAt}</small>
                )}
              </div>
            ) : (
              <div className="ticket-rating-form">
                <label>
                  <span>Calificación</span>
                  <select
                    className="table-select"
                    value={ratingValue}
                    onChange={(event) => setRatingValue(Number(event.target.value))}
                  >
                    <option value={5}>5 - Excelente</option>
                    <option value={4}>4 - Buena</option>
                    <option value={3}>3 - Aceptable</option>
                    <option value={2}>2 - Regular</option>
                    <option value={1}>1 - Mala</option>
                  </select>
                </label>

                <label>
                  <span>Comentario opcional</span>
                  <textarea
                    placeholder="Cuéntanos cómo fue la atención recibida..."
                    value={ratingComment}
                    onChange={(event) => setRatingComment(event.target.value)}
                  />
                </label>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleSaveRating}
                  disabled={ratingLoading || !canRateTicket}
                >
                  <Save size={18} />
                  {ratingLoading ? 'Guardando...' : 'Guardar calificación'}
                </button>
              </div>
            )}
          </div>
        )}

        {showStatusForm && canUpdateStatus && (
          <div className="ticket-modal-section">
            <h3>Cambiar estado de la solicitud</h3>

            <div className="ticket-status-form">
              <select
                className="table-select"
                value={selectedStatus}
                onChange={(event) =>
                  setSelectedStatus(event.target.value as TicketStatus)
                }
              >
                {statusOptions.map((status) => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>

              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSaveStatus}
              >
                <Save size={18} />
                Guardar cambio
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setSelectedStatus(row.status);
                  setShowStatusForm(false);
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}

        <div className="ticket-modal-actions">
          {canAddComment && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => {
                setShowStatusForm(false);
                setShowCommentForm((currentValue) => !currentValue);
              }}
            >
              <MessageSquare size={18} />
              Agregar actualización
            </button>
          )}

          {canUpdateStatus && (
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => {
                setShowCommentForm(false);
                setShowStatusForm((currentValue) => !currentValue);
              }}
            >
              <UserCheck size={18} />
              Cambiar estado
            </button>
          )}

          {profile?.role === 'client' && (
            <p className="ticket-action-note">
              Puedes agregar comentarios o revisar el avance de la solicitud. El cambio de estado lo realizará el equipo de atención.
            </p>
          )}
        </div>
      </article>
    </div>
  );
}

function getPriorityLabel(priority: Ticket['priority']) {
  if (priority === 'low') {
    return 'Baja';
  }

  if (priority === 'medium') {
    return 'Media';
  }

  if (priority === 'high') {
    return 'Alta';
  }

  return 'Urgente';
}

function getChannelLabel(channel: Ticket['channel']) {
  if (channel === 'remote') {
    return 'Remoto';
  }

  if (channel === 'onsite') {
    return 'Presencial';
  }

  return 'Mixto';
}