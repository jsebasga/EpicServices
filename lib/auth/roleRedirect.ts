import type { AppRole } from './authTypes';

export function getDashboardPathByRole(role?: AppRole | null) {
  if (role === 'admin') {
    return '/dashboard/admin';
  }

  if (role === 'technician') {
    return '/dashboard/tecnico';
  }

  return '/dashboard/cliente';
}