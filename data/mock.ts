import {
  BanknoteArrowDown,
  CreditCard,
  Headset,
  LaptopMinimalCheck,
  MonitorCog,
  Network,
  ShieldCheck,
  Smartphone,
  UserRoundSearch,
  WalletCards,
  Wrench
} from 'lucide-react';
import type { Kpi, RequestRow, Service } from '@/lib/types';

export const services: Service[] = [
  { icon: Headset, title: 'Soporte remoto prioritario', description: 'Atención asistida por chat y videollamada para incidencias de software, correo, accesos y configuraciones críticas.', tag: 'Respuesta en menos de 30 min' },
  { icon: Wrench, title: 'Mantenimiento de equipos', description: 'Diagnóstico, limpieza, optimización y correctivos para laptops, desktops e impresoras con trazabilidad por ticket.', tag: 'Preventivo y correctivo' },
  { icon: MonitorCog, title: 'Instalación y configuración', description: 'Puesta a punto de estaciones de trabajo, licencias, herramientas colaborativas y software de productividad.', tag: 'Paquetes por empresa o persona' },
  { icon: Network, title: 'Redes y conectividad', description: 'Revisión de routers, repetidores, cableado, puntos Wi‑Fi y validación de estabilidad para oficinas pequeñas.', tag: 'Ideal para PYMEs' },
  { icon: Smartphone, title: 'Mesa de ayuda móvil', description: 'Soporte para smartphones, backups, migración de datos, cuentas, seguridad y configuración de apps.', tag: 'Cobertura remota y presencial' },
  { icon: ShieldCheck, title: 'Seguridad y respaldo', description: 'Fortalecimiento de accesos, prácticas de seguridad, respaldo de archivos y acompañamiento básico anti fraude.', tag: 'Servicios recurrentes' }
];

export const landingKpis: Kpi[] = [
  { label: 'Tickets gestionados', value: '1.240+', helper: 'Atendidos con flujo centralizado' },
  { label: 'Satisfacción promedio', value: '4.9/5', helper: 'Seguimiento y validación final' },
  { label: 'Técnicos activos', value: '32', helper: 'Por ciudad y especialidad' },
  { label: 'Pagos procesados', value: '$84M', helper: 'Con recaudo y liberación controlada' }
];

export const clientKpis: Kpi[] = [
  { label: 'Solicitudes activas', value: '08', helper: '4 con pago aprobado' },
  { label: 'Servicios completados', value: '27', helper: 'Últimos 90 días' },
  { label: 'Tiempo promedio', value: '2.4h', helper: 'Primera respuesta del técnico' },
  { label: 'Pagos pendientes', value: '$480.000', helper: '2 cotizaciones por aprobar' }
];

export const technicianKpis: Kpi[] = [
  { label: 'Servicios asignados', value: '14', helper: '6 para hoy' },
  { label: 'Ingresos del mes', value: '$3.2M', helper: 'Neto proyectado' },
  { label: 'Cumplimiento SLA', value: '96%', helper: 'Sobre tickets resueltos' },
  { label: 'Valoración', value: '4.8', helper: 'Promedio de clientes' }
];

export const adminKpis: Kpi[] = [
  { label: 'Ingresos plataforma', value: '$12.8M', helper: 'Comisiones del mes' },
  { label: 'Tickets abiertos', value: '124', helper: '18 requieren asignación' },
  { label: 'Técnicos disponibles', value: '11', helper: 'Listos para atención' },
  { label: 'Pagos liberados', value: '$8.7M', helper: 'A técnicos esta semana' }
];

export const requests: RequestRow[] = [
  { id: 'SRV-1045', client: 'Comercial Atlas SAS', service: 'Redes y conectividad', technician: 'Laura Gómez', status: 'in_progress', amount: '$420.000', eta: 'Hoy · 4:30 PM' },
  { id: 'SRV-1046', client: 'Juan Torres', service: 'Soporte remoto prioritario', technician: 'Pendiente', status: 'pending', amount: '$85.000', eta: 'Esperando asignación' },
  { id: 'SRV-1047', client: 'Studio Naranja', service: 'Mantenimiento de equipos', technician: 'Daniel Rico', status: 'paid', amount: '$260.000', eta: 'Mañana · 10:00 AM' },
  { id: 'SRV-1048', client: 'Sara Medina', service: 'Mesa de ayuda móvil', technician: 'Ana Beltrán', status: 'completed', amount: '$120.000', eta: 'Cerrado' }
];

export const modules = [
  { icon: UserRoundSearch, title: 'Portal del cliente', description: 'Solicitud guiada, timeline del ticket, archivos, cotización, aprobación y pago.' },
  { icon: LaptopMinimalCheck, title: 'Portal del técnico', description: 'Agenda, tickets asignados, avances, evidencias, SLA y panel de ganancias.' },
  { icon: CreditCard, title: 'Control de recaudo', description: 'Resumen de pagos, validación de transacciones y flujo listo para pasarela marketplace.' },
  { icon: WalletCards, title: 'Wallet / liquidaciones', description: 'Visual preparado para comisiones de plataforma, saldo del técnico y retiros.' },
  { icon: BanknoteArrowDown, title: 'Panel financiero', description: 'Vista operativa para ingresos, tickets cobrados, pendientes y liberaciones.' }
];
