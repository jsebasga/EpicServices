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

export type RequestRow = {
  id: string;
  client: string;
  service: string;
  technician: string;
  status: 'quoted' | 'paid' | 'in_progress' | 'pending' | 'completed' | 'cancelled';
  amount: string;
  eta: string;
};
