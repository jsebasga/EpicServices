import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Epic Services Help Desk',
  description: 'Plataforma visual para solicitud, seguimiento y pago de servicios tecnológicos.'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
