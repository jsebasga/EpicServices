import { RequireAuth } from '@/components/auth/RequireAuth';
import { AdminTicketsDashboard } from '@/components/dashboard/AdminTicketsDashboard';

export default function AdminDashboard() {
  return (
    <RequireAuth allowedRoles={['admin']}>
      <AdminTicketsDashboard />
    </RequireAuth>
  );
}