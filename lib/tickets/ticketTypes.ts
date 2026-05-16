import type { AppRole } from '@/lib/auth/authTypes';

export type TicketStatus =
  | 'new'
  | 'assigned'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TicketChannel = 'remote' | 'onsite' | 'mixed';

export type Ticket = {
  id: string;
  code: string;

  title: string;
  description: string;

  serviceName: string;
  category: string;
  priority: TicketPriority;
  channel: TicketChannel;
  city: string;
  preferredSchedule: string;

  status: TicketStatus;

  clientId: string;
  clientName: string;
  clientEmail: string;

  technicianId: string;
  technicianName: string;

  timeSpentMinutes: number;

  rating?: number | null;
  ratingComment?: string;
  ratedAt?: Date | null;
  ratedBy?: string;

  createdAt?: Date | null;
  updatedAt?: Date | null;
  assignedAt?: Date | null;
  closedAt?: Date | null;
};

export type CreateTicketInput = {
  title: string;
  description: string;
  serviceName: string;
  category: string;
  priority: TicketPriority;
  channel: TicketChannel;
  city: string;
  preferredSchedule: string;
};

export type TicketComment = {
  id: string;
  authorId: string;
  authorName: string;
  authorRole: AppRole;
  message: string;
  createdAt?: Date | null;
};

export type TicketHistoryItem = {
  id: string;
  title: string;
  description: string;
  createdBy: string;
  createdByName: string;
  createdAt?: Date | null;
};