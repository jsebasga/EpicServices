import type { LegacyTicketStatus, RequestRow, Ticket, TicketStatus } from '@/lib/types';

function mapTicketStatusToLegacyStatus(status: TicketStatus): LegacyTicketStatus {
  if (status === 'new') {
    return 'pending';
  }

  if (status === 'assigned') {
    return 'paid';
  }

  return status;
}

export function mapTicketToRow(ticket: Ticket): RequestRow {
  return {
    id: ticket.id,
    client: ticket.clientName,
    service: ticket.serviceName,
    technician: ticket.technicianName ?? 'Sin asignar',
    status: mapTicketStatusToLegacyStatus(ticket.status),
    amount: ticket.timeSpent ?? '0h 00m',
    eta: ticket.updatedAt ?? 'Sin actualización'
  };
}

export const tickets: Ticket[] = [
  {
    id: 'SRV-1045',
    title: 'Red inestable en oficina principal',
    description: 'El cliente reporta cortes intermitentes de red y baja velocidad en el área administrativa.',
    clientId: 'client-001',
    clientName: 'Comercial Atlas SAS',
    serviceName: 'Redes y conectividad',
    category: 'network',
    technicianId: 'tech-001',
    technicianName: 'Laura Gómez',
    status: 'in_progress',
    priority: 'high',
    channel: 'onsite',
    city: 'Bogotá',
    preferredSchedule: 'Hoy · 2:00 PM a 5:00 PM',
    timeSpent: '3h 20m',
    createdAt: 'Creado el 13 de mayo',
    updatedAt: 'Actualizado hoy · 4:30 PM',
    comments: [],
    attachments: [],
    history: [
      {
        id: 'history-001',
        ticketId: 'SRV-1045',
        title: 'Solicitud registrada',
        description: 'El cliente creó la solicitud desde el portal.',
        createdAt: '13 de mayo · 9:15 AM'
      },
      {
        id: 'history-002',
        ticketId: 'SRV-1045',
        title: 'Técnico asignado',
        description: 'Laura Gómez fue asignada para revisar el caso.',
        createdAt: '13 de mayo · 10:20 AM'
      }
    ]
  },
  {
    id: 'SRV-1046',
    title: 'Soporte remoto para acceso a correo',
    description: 'El usuario no puede acceder al correo corporativo desde su equipo principal.',
    clientId: 'client-002',
    clientName: 'Juan Torres',
    serviceName: 'Soporte remoto prioritario',
    category: 'remote-support',
    status: 'new',
    priority: 'medium',
    channel: 'remote',
    city: 'Medellín',
    preferredSchedule: 'Hoy · 3:00 PM',
    timeSpent: '0h 15m',
    createdAt: 'Creado hoy',
    updatedAt: 'Esperando asignación',
    comments: [],
    attachments: [],
    history: [
      {
        id: 'history-003',
        ticketId: 'SRV-1046',
        title: 'Solicitud registrada',
        description: 'El cliente creó una solicitud de soporte remoto.',
        createdAt: 'Hoy · 11:10 AM'
      }
    ]
  },
  {
    id: 'SRV-1047',
    title: 'Mantenimiento preventivo de equipos',
    description: 'Se solicita revisión general de equipos, limpieza y optimización de rendimiento.',
    clientId: 'client-003',
    clientName: 'Studio Naranja',
    serviceName: 'Mantenimiento de equipos',
    category: 'maintenance',
    technicianId: 'tech-002',
    technicianName: 'Daniel Rico',
    status: 'assigned',
    priority: 'medium',
    channel: 'onsite',
    city: 'Bogotá',
    preferredSchedule: 'Mañana · 10:00 AM',
    timeSpent: '1h 40m',
    createdAt: 'Creado el 12 de mayo',
    updatedAt: 'Programado mañana · 10:00 AM',
    comments: [],
    attachments: [],
    history: [
      {
        id: 'history-004',
        ticketId: 'SRV-1047',
        title: 'Solicitud registrada',
        description: 'El cliente creó una solicitud de mantenimiento.',
        createdAt: '12 de mayo · 8:30 AM'
      },
      {
        id: 'history-005',
        ticketId: 'SRV-1047',
        title: 'Servicio asignado',
        description: 'Daniel Rico fue asignado al servicio.',
        createdAt: '12 de mayo · 9:05 AM'
      }
    ]
  },
  {
    id: 'SRV-1048',
    title: 'Configuración móvil completada',
    description: 'Se realizó configuración de cuenta, respaldo y ajustes de seguridad en dispositivo móvil.',
    clientId: 'client-004',
    clientName: 'Sara Medina',
    serviceName: 'Mesa de ayuda móvil',
    category: 'mobile-support',
    technicianId: 'tech-003',
    technicianName: 'Ana Beltrán',
    status: 'completed',
    priority: 'low',
    channel: 'mixed',
    city: 'Cali',
    preferredSchedule: '12 de mayo · 9:00 AM',
    timeSpent: '2h 10m',
    createdAt: 'Creado el 11 de mayo',
    updatedAt: 'Cerrado el 12 de mayo',
    comments: [],
    attachments: [],
    history: [
      {
        id: 'history-006',
        ticketId: 'SRV-1048',
        title: 'Solicitud registrada',
        description: 'El cliente creó una solicitud de mesa de ayuda móvil.',
        createdAt: '11 de mayo · 2:30 PM'
      },
      {
        id: 'history-007',
        ticketId: 'SRV-1048',
        title: 'Solicitud cerrada',
        description: 'El servicio fue completado satisfactoriamente.',
        createdAt: '12 de mayo · 11:45 AM'
      }
    ]
  },
  {
    id: 'SRV-1049',
    title: 'Revisión de respaldo y seguridad',
    description: 'Se revisaron políticas básicas de respaldo, accesos y recomendaciones de seguridad.',
    clientId: 'client-001',
    clientName: 'Comercial Atlas SAS',
    serviceName: 'Seguridad y respaldo',
    category: 'security',
    technicianId: 'tech-004',
    technicianName: 'Carlos Rivas',
    status: 'completed',
    priority: 'medium',
    channel: 'remote',
    city: 'Bogotá',
    preferredSchedule: '10 de mayo · 4:00 PM',
    timeSpent: '4h 35m',
    createdAt: 'Creado el 9 de mayo',
    updatedAt: 'Cerrado el 10 de mayo',
    comments: [],
    attachments: [],
    history: [
      {
        id: 'history-008',
        ticketId: 'SRV-1049',
        title: 'Solicitud registrada',
        description: 'El cliente creó una solicitud de seguridad y respaldo.',
        createdAt: '9 de mayo · 1:20 PM'
      },
      {
        id: 'history-009',
        ticketId: 'SRV-1049',
        title: 'Solicitud cerrada',
        description: 'El servicio fue finalizado con recomendaciones entregadas.',
        createdAt: '10 de mayo · 5:10 PM'
      }
    ]
  },
  {
    id: 'SRV-1050',
    title: 'Instalación de herramientas de trabajo',
    description: 'Se instalaron herramientas de productividad y se configuraron accesos iniciales.',
    clientId: 'client-002',
    clientName: 'Juan Torres',
    serviceName: 'Instalación y configuración',
    category: 'installation',
    technicianId: 'tech-005',
    technicianName: 'Marta León',
    status: 'completed',
    priority: 'low',
    channel: 'remote',
    city: 'Medellín',
    preferredSchedule: '8 de mayo · 10:00 AM',
    timeSpent: '1h 50m',
    createdAt: 'Creado el 7 de mayo',
    updatedAt: 'Cerrado el 8 de mayo',
    comments: [],
    attachments: [],
    history: [
      {
        id: 'history-010',
        ticketId: 'SRV-1050',
        title: 'Solicitud registrada',
        description: 'El cliente creó una solicitud de instalación.',
        createdAt: '7 de mayo · 3:15 PM'
      },
      {
        id: 'history-011',
        ticketId: 'SRV-1050',
        title: 'Solicitud cerrada',
        description: 'El servicio fue completado correctamente.',
        createdAt: '8 de mayo · 11:50 AM'
      }
    ]
  },
  {
    id: 'SRV-1051',
    title: 'Configuración de correo corporativo',
    description: 'Solicitud nueva para configurar correo corporativo en equipo del cliente.',
    clientId: 'client-005',
    clientName: 'Laura Méndez',
    serviceName: 'Configuración de correo corporativo',
    category: 'configuration',
    status: 'new',
    priority: 'high',
    channel: 'remote',
    city: 'Bogotá',
    preferredSchedule: 'Hoy · 5:00 PM',
    timeSpent: '0h 00m',
    createdAt: 'Creado hoy',
    updatedAt: 'Nuevo · Requiere atención',
    comments: [],
    attachments: [],
    history: []
  },
  {
    id: 'SRV-1052',
    title: 'Revisión de conectividad Wi-Fi',
    description: 'Solicitud nueva para diagnosticar problemas de Wi-Fi en oficina.',
    clientId: 'client-001',
    clientName: 'Comercial Atlas SAS',
    serviceName: 'Revisión de conectividad Wi-Fi',
    category: 'network',
    status: 'new',
    priority: 'high',
    channel: 'onsite',
    city: 'Bogotá',
    preferredSchedule: 'Hoy · 4:00 PM',
    timeSpent: '0h 00m',
    createdAt: 'Creado hoy',
    updatedAt: 'Nuevo · Prioridad alta',
    comments: [],
    attachments: [],
    history: []
  },
  {
    id: 'SRV-1053',
    title: 'Instalación de software',
    description: 'Solicitud nueva para instalar software de diseño y productividad.',
    clientId: 'client-003',
    clientName: 'Studio Naranja',
    serviceName: 'Instalación de software',
    category: 'installation',
    status: 'new',
    priority: 'medium',
    channel: 'remote',
    city: 'Bogotá',
    preferredSchedule: 'Mañana · 9:00 AM',
    timeSpent: '0h 00m',
    createdAt: 'Creado hoy',
    updatedAt: 'Nuevo · En cola',
    comments: [],
    attachments: [],
    history: []
  },
  {
    id: 'SRV-1038',
    title: 'Mesa de ayuda móvil finalizada',
    description: 'Servicio móvil completado para configuración de cuenta y respaldo.',
    clientId: 'client-004',
    clientName: 'Sara Medina',
    serviceName: 'Mesa de ayuda móvil',
    category: 'mobile-support',
    technicianId: 'tech-001',
    technicianName: 'Laura Gómez',
    status: 'completed',
    priority: 'medium',
    channel: 'mixed',
    city: 'Cali',
    preferredSchedule: '12 de mayo · 9:00 AM',
    timeSpent: '2h 10m',
    createdAt: 'Creado el 11 de mayo',
    updatedAt: 'Cerrado el 12 de mayo',
    comments: [],
    attachments: [],
    history: []
  },
  {
    id: 'SRV-1039',
    title: 'Seguridad y respaldo finalizado',
    description: 'Servicio completado de revisión de seguridad y respaldo.',
    clientId: 'client-006',
    clientName: 'Carlos Rivera',
    serviceName: 'Seguridad y respaldo',
    category: 'security',
    technicianId: 'tech-001',
    technicianName: 'Laura Gómez',
    status: 'completed',
    priority: 'medium',
    channel: 'remote',
    city: 'Bogotá',
    preferredSchedule: '10 de mayo · 2:00 PM',
    timeSpent: '4h 35m',
    createdAt: 'Creado el 9 de mayo',
    updatedAt: 'Cerrado el 10 de mayo',
    comments: [],
    attachments: [],
    history: []
  },
  {
    id: 'SRV-1040',
    title: 'Instalación y configuración finalizada',
    description: 'Servicio completado de instalación de herramientas de trabajo.',
    clientId: 'client-007',
    clientName: 'Diana Torres',
    serviceName: 'Instalación y configuración',
    category: 'installation',
    technicianId: 'tech-001',
    technicianName: 'Laura Gómez',
    status: 'completed',
    priority: 'low',
    channel: 'remote',
    city: 'Medellín',
    preferredSchedule: '8 de mayo · 10:00 AM',
    timeSpent: '1h 50m',
    createdAt: 'Creado el 7 de mayo',
    updatedAt: 'Cerrado el 8 de mayo',
    comments: [],
    attachments: [],
    history: []
  },
  {
    id: 'SRV-1061',
    title: 'Soporte remoto prioritario pendiente',
    description: 'Ticket nuevo pendiente de asignación por parte del administrador.',
    clientId: 'client-008',
    clientName: 'Comercial Norte',
    serviceName: 'Soporte remoto prioritario',
    category: 'remote-support',
    status: 'new',
    priority: 'high',
    channel: 'remote',
    city: 'Bogotá',
    preferredSchedule: 'Hoy · 2:30 PM',
    timeSpent: '0h 00m',
    createdAt: 'Creado hoy',
    updatedAt: 'Nuevo · Prioridad alta',
    comments: [],
    attachments: [],
    history: []
  },
  {
    id: 'SRV-1062',
    title: 'Diagnóstico de redes pendiente',
    description: 'Ticket nuevo para revisión de conectividad en oficinas.',
    clientId: 'client-009',
    clientName: 'Oficinas Central Park',
    serviceName: 'Redes y conectividad',
    category: 'network',
    status: 'new',
    priority: 'high',
    channel: 'onsite',
    city: 'Bogotá',
    preferredSchedule: 'Mañana · 11:00 AM',
    timeSpent: '0h 00m',
    createdAt: 'Creado hoy',
    updatedAt: 'Nuevo · Requiere diagnóstico',
    comments: [],
    attachments: [],
    history: []
  },
  {
    id: 'SRV-1063',
    title: 'Instalación de herramientas pendiente',
    description: 'Ticket nuevo para instalación y configuración inicial de equipo.',
    clientId: 'client-010',
    clientName: 'María Fernanda Ruiz',
    serviceName: 'Instalación y configuración',
    category: 'installation',
    status: 'new',
    priority: 'medium',
    channel: 'remote',
    city: 'Medellín',
    preferredSchedule: 'Mañana · 3:00 PM',
    timeSpent: '0h 00m',
    createdAt: 'Creado hoy',
    updatedAt: 'Nuevo · En cola',
    comments: [],
    attachments: [],
    history: []
  }
];

export const activeRequests: RequestRow[] = tickets
  .filter((ticket) => ['new', 'assigned', 'in_progress'].includes(ticket.status))
  .filter((ticket) => ['SRV-1045', 'SRV-1046', 'SRV-1047'].includes(ticket.id))
  .map(mapTicketToRow);

export const closedRequests: RequestRow[] = tickets
  .filter((ticket) => ticket.status === 'completed')
  .filter((ticket) => ['SRV-1048', 'SRV-1049', 'SRV-1050'].includes(ticket.id))
  .map(mapTicketToRow);

export const technicianNewTickets: RequestRow[] = tickets
  .filter((ticket) => ['SRV-1051', 'SRV-1052', 'SRV-1053'].includes(ticket.id))
  .map(mapTicketToRow);

export const technicianAssignedTickets: RequestRow[] = tickets
  .filter((ticket) => ['SRV-1045', 'SRV-1046', 'SRV-1047'].includes(ticket.id))
  .map(mapTicketToRow);

export const technicianResolvedTickets: RequestRow[] = tickets
  .filter((ticket) => ['SRV-1038', 'SRV-1039', 'SRV-1040'].includes(ticket.id))
  .map(mapTicketToRow);

export const adminNewTickets: RequestRow[] = tickets
  .filter((ticket) => ['SRV-1061', 'SRV-1062', 'SRV-1063'].includes(ticket.id))
  .map(mapTicketToRow);

export const adminActiveTickets: RequestRow[] = tickets
  .filter((ticket) => ['SRV-1045', 'SRV-1046', 'SRV-1047'].includes(ticket.id))
  .map(mapTicketToRow);

export const adminFinishedTickets: RequestRow[] = tickets
  .filter((ticket) => ['SRV-1048', 'SRV-1049', 'SRV-1050'].includes(ticket.id))
  .map(mapTicketToRow);

export const requests: RequestRow[] = [
  ...activeRequests,
  ...closedRequests
];