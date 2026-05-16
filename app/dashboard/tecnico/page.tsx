import { RequireAuth } from '@/components/auth/RequireAuth';
import { TechnicianTicketsDashboard } from '@/components/dashboard/TechnicianTicketsDashboard';

export default function TechnicianDashboard() {
  return (
    <RequireAuth allowedRoles={['technician']}>
      <TechnicianTicketsDashboard />
    </RequireAuth>
  );
}