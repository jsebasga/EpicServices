import type { LegacyTicketStatus } from '@/lib/types';

export type TicketStatus = LegacyTicketStatus;

export type LocalTicketComment = {
  id: string;
  author: string;
  text: string;
  date: string;
};

export const statusMap: Record<TicketStatus, { label: string; className: string }> = {
  new: { label: 'Nueva', className: 'status warning' },
  assigned: { label: 'Asignada', className: 'status success' },

  quoted: { label: 'En revisión', className: 'status warning' },
  paid: { label: 'Asignada', className: 'status success' },

  in_progress: { label: 'En atención', className: 'status info' },
  pending: { label: 'Pendiente', className: 'status warning' },
  completed: { label: 'Finalizada', className: 'status success' },
  cancelled: { label: 'Cancelada', className: 'status danger' }
};

export const statusOptions: Array<{ value: TicketStatus; label: string }> = [
  { value: 'new', label: 'Nueva' },
  { value: 'assigned', label: 'Asignada a técnico' },
  { value: 'in_progress', label: 'En atención' },
  { value: 'completed', label: 'Finalizada' },
  { value: 'cancelled', label: 'Cancelada' }
];

export function getActionLabel(actionType?: 'take' | 'resolve' | 'assign') {
  if (actionType === 'take') {
    return 'Aceptar ticket';
  }

  if (actionType === 'resolve') {
    return 'Resolver';
  }

  if (actionType === 'assign') {
    return 'Asignar a';
  }

  return '';
}

export function getPriorityByStatus(status: TicketStatus) {
  if (status === 'new' || status === 'pending' || status === 'quoted') {
    return 'Alta';
  }

  if (status === 'assigned' || status === 'paid' || status === 'in_progress') {
    return 'Media';
  }

  if (status === 'completed') {
    return 'Finalizada';
  }

  if (status === 'cancelled') {
    return 'Cancelada';
  }

  return 'Normal';
}

export function getChannelByService(service: string) {
  if (service.toLowerCase().includes('remoto')) {
    return 'Remoto';
  }

  if (service.toLowerCase().includes('redes')) {
    return 'Presencial';
  }

  return 'Mixto';
}

export function createLocalComment(text: string): LocalTicketComment {
  return {
    id: typeof crypto !== 'undefined' && 'randomUUID' in crypto
      ? crypto.randomUUID()
      : `${Date.now()}`,
    author: 'Usuario actual',
    text,
    date: new Date().toLocaleString('es-CO', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    })
  };
}

export function getCurrentTimeLabel() {
  return `Actualizado ahora · ${new Date().toLocaleTimeString('es-CO', {
    hour: '2-digit',
    minute: '2-digit'
  })}`;
}