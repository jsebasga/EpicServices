import './globals.css';
import type { Metadata } from 'next';
import { AppProviders } from '@/components/auth/AppProviders';

export const metadata: Metadata = {
  title: 'Epic Services',
  description: 'Plataforma web para crear, gestionar y hacer seguimiento a solicitudes de soporte técnico, conectando clientes, técnicos y administradores en un flujo claro y organizado.'
};

export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>
        <AppProviders>
          {children}
        </AppProviders>
      </body>
    </html>
  );
}