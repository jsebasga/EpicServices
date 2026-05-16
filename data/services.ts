import {
  Headset,
  MonitorCog,
  Network,
  ShieldCheck,
  Smartphone,
  Wrench
} from 'lucide-react';
import type { Service } from '@/lib/types';

export const services: Service[] = [
  {
    icon: Headset,
    title: 'Soporte remoto',
    description: 'Recibe ayuda para resolver problemas de software, accesos, correo, configuraciones y herramientas de trabajo sin necesidad de desplazamientos.',
    tag: 'Ideal para incidencias rápidas'
  },
  {
    icon: Wrench,
    title: 'Mantenimiento de equipos',
    description: 'Solicita revisión, limpieza, optimización o diagnóstico de computadores, periféricos y equipos de trabajo.',
    tag: 'Preventivo y correctivo'
  },
  {
    icon: MonitorCog,
    title: 'Instalación y configuración',
    description: 'Configura equipos, programas, cuentas, licencias y herramientas necesarias para iniciar o mejorar tu operación.',
    tag: 'Puesta a punto de equipos'
  },
  {
    icon: Network,
    title: 'Redes y conectividad',
    description: 'Gestiona solicitudes relacionadas con internet, Wi-Fi, routers, repetidores, cableado o estabilidad de conexión.',
    tag: 'Conectividad para hogares y empresas'
  },
  {
    icon: Smartphone,
    title: 'Soporte para dispositivos móviles',
    description: 'Recibe apoyo para configuración de celulares, cuentas, respaldos, migración de datos y aplicaciones de trabajo.',
    tag: 'Soporte móvil práctico'
  },
  {
    icon: ShieldCheck,
    title: 'Seguridad y respaldo',
    description: 'Solicita orientación para proteger accesos, respaldar información importante y reducir riesgos básicos de seguridad.',
    tag: 'Protección de información'
  }
];