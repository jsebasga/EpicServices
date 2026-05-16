import type { Kpi } from '@/lib/types';

export const landingKpis: Kpi[] = [
  {
    label: 'Tickets gestionados',
    value: '1.240+',
    helper: 'Atendidos con flujo centralizado'
  },
  {
    label: 'Satisfacción promedio',
    value: '4.9/5',
    helper: 'Seguimiento y validación final'
  },
  {
    label: 'Técnicos activos',
    value: '32',
    helper: 'Por ciudad y especialidad'
  },
  {
    label: 'Solicitudes resueltas',
    value: '860+',
    helper: 'Servicios completados con trazabilidad'
  }
];

export const clientKpis: Kpi[] = [
  {
    label: 'Solicitudes en curso',
    value: '08',
    helper: 'Casos que están en revisión, asignación o atención'
  },
  {
    label: 'Servicios finalizados',
    value: '27',
    helper: 'Solicitudes cerradas con seguimiento completo'
  },
  {
    label: 'Tiempo promedio actual',
    value: '2.4h',
    helper: 'Promedio invertido en solicitudes que siguen activas'
  },
  {
    label: 'Tiempo total de atención',
    value: '64h',
    helper: 'Tiempo acumulado en la gestión de tus solicitudes'
  }
];

export const technicianKpis: Kpi[] = [
  {
    label: 'Tickets en atención',
    value: '07',
    helper: 'Solicitudes activas que requieren seguimiento'
  },
  {
    label: 'Tickets resueltos',
    value: '24',
    helper: 'Servicios finalizados con registro de cierre'
  },
  {
    label: 'Tiempo promedio',
    value: '2.1h',
    helper: 'Tiempo promedio invertido por solicitud'
  },
  {
    label: 'Calificación',
    value: '4.8',
    helper: 'Promedio de valoración recibida por clientes'
  }
];

export const adminKpis: Kpi[] = [
  {
    label: 'Tickets por asignar',
    value: '18',
    helper: 'Solicitudes nuevas que requieren revisión'
  },
  {
    label: 'Tickets en atención',
    value: '42',
    helper: 'Casos activos con seguimiento operativo'
  },
  {
    label: 'Tickets cerrados',
    value: '96',
    helper: 'Solicitudes finalizadas durante el mes'
  },
  {
    label: 'Tiempo promedio',
    value: '2.6h',
    helper: 'Promedio general de atención por ticket'
  },
  {
    label: 'Satisfacción promedio',
    value: '4.7',
    helper: 'Valoración general de los servicios atendidos'
  },
  {
    label: 'Técnicos activos',
    value: '11',
    helper: 'Responsables disponibles para asignación'
  },
  {
    label: 'Usuarios activos',
    value: '68',
    helper: 'Clientes con actividad reciente en la plataforma'
  },
  {
    label: 'Solicitudes diarias',
    value: '12',
    helper: 'Promedio de tickets creados por día'
  }
];