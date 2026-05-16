import { RequireAuth } from '@/components/auth/RequireAuth';
import { ClientTicketsDashboard } from '@/components/dashboard/ClientTicketsDashboard';

export default function ClientDashboard() {
  return (
    <RequireAuth allowedRoles={['client']}>
      <ClientTicketsDashboard />
    </RequireAuth>
  );
}