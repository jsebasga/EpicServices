import {
  Activity,
  ClipboardCheck,
  FileText,
  LaptopMinimalCheck,
  UserRoundSearch
} from 'lucide-react';

export const modules = [
  {
    icon: UserRoundSearch,
    title: 'Portal del cliente',
    description: 'Crea solicitudes, consulta el estado de tus tickets y revisa el historial de servicios desde un solo lugar.'
  },
  {
    icon: LaptopMinimalCheck,
    title: 'Portal del técnico',
    description: 'Gestiona tickets asignados, actualiza avances, registra evidencias y marca servicios como resueltos.'
  },
  {
    icon: ClipboardCheck,
    title: 'Gestión de solicitudes',
    description: 'Organiza los casos por estado, prioridad, responsable y tipo de servicio para mejorar la atención.'
  },
  {
    icon: FileText,
    title: 'Evidencias y comentarios',
    description: 'Centraliza archivos, notas, diagnósticos y actualizaciones importantes dentro de cada ticket.'
  },
  {
    icon: Activity,
    title: 'Seguimiento operativo',
    description: 'Visualiza el avance de los servicios y mantén trazabilidad clara desde la creación hasta el cierre.'
  }
];