import type { TicketStatus } from '@/lib/ticketUtils';
import { statusMap } from '@/lib/ticketUtils';

type TicketStatusBadgeProps = {
  status: TicketStatus;
};

export function TicketStatusBadge({ status }: TicketStatusBadgeProps) {
  const statusInfo = statusMap[status];

  return (
    <span className={statusInfo.className}>
      {statusInfo.label}
    </span>
  );
}