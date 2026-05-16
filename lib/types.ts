import type { LucideIcon } from 'lucide-react';

export type Service = {
  icon: LucideIcon;
  title: string;
  description: string;
  tag: string;
};

export type Kpi = {
  label: string;
  value: string;
  helper: string;
};

export type UserRole = 'client' | 'technician' | 'admin';

export type UserStatus = 'active' | 'inactive' | 'pending';

export type User = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  role: UserRole;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
};

export type Technician = {
  id: string;
  name: string;
  email: string;
  phone?: string;
  specialties: string[];
  rating: number;
  activeTickets: number;
  completedTickets: number;
  status: UserStatus;
};

export type TicketStatus =
  | 'new'
  | 'pending'
  | 'assigned'
  | 'in_progress'
  | 'completed'
  | 'cancelled';

export type LegacyTicketStatus =
  | 'new'
  | 'assigned'
  | 'quoted'
  | 'paid'
  | 'in_progress'
  | 'pending'
  | 'completed'
  | 'cancelled';

export type TicketPriority = 'low' | 'medium' | 'high' | 'urgent';

export type TicketChannel = 'remote' | 'onsite' | 'mixed';

export type TicketAttachment = {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'document' | 'other';
  size?: string;
  uploadedAt: string;
};

export type TicketComment = {
  id: string;
  ticketId: string;
  authorId: string;
  authorName: string;
  authorRole: UserRole;
  message: string;
  createdAt: string;
};

export type TicketHistoryItem = {
  id: string;
  ticketId: string;
  title: string;
  description: string;
  createdAt: string;
};

export type Ticket = {
  id: string;
  title: string;
  description: string;
  clientId: string;
  clientName: string;
  serviceName: string;
  category: string;
  technicianId?: string;
  technicianName?: string;
  status: TicketStatus;
  priority: TicketPriority;
  channel: TicketChannel;
  city: string;
  preferredSchedule?: string;
  timeSpent?: string;

  rating?: number | null;
  ratingComment?: string;
  ratedAt?: string;
  ratedBy?: string;

  createdAt: string;
  updatedAt?: string;
  comments: TicketComment[];
  attachments: TicketAttachment[];
  history: TicketHistoryItem[];
};

export type RequestRow = {
  id: string;
  client: string;
  service: string;
  technician: string;
  status: LegacyTicketStatus;
  amount: string;
  eta: string;
};

export type TicketTableAction = 'take' | 'resolve' | 'assign';

export type ServiceCategory = {
  id: string;
  name: string;
  description: string;
  active: boolean;
};