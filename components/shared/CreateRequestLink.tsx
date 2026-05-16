'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useAuth } from '@/components/auth/AuthProvider';
import { getDashboardPathByRole } from '@/lib/auth/roleRedirect';

type CreateRequestLinkProps = {
  className?: string;
  showIcon?: boolean;
};

export function CreateRequestLink({
  className = 'btn btn-primary',
  showIcon = true
}: CreateRequestLinkProps) {
  const { isAuthenticated, profile, loading } = useAuth();

  if (loading) {
    return (
      <button type="button" className={className} disabled>
        Cargando...
      </button>
    );
  }

  if (!isAuthenticated) {
    return (
      <Link href="/login" className={className}>
        Crear una solicitud
        {showIcon && <ArrowRight size={18} />}
      </Link>
    );
  }

  if (profile?.role === 'client') {
    return (
      <Link href="/solicitudes/nueva" className={className}>
        Crear una solicitud
        {showIcon && <ArrowRight size={18} />}
      </Link>
    );
  }

  return (
    <Link href={getDashboardPathByRole(profile?.role)} className={className}>
      Administrar solicitudes
      {showIcon && <ArrowRight size={18} />}
    </Link>
  );
}