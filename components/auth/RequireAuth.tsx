'use client';

import { useEffect, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import type { AppRole } from '@/lib/auth/authTypes';
import { getDashboardPathByRole } from '@/lib/auth/roleRedirect';
import { useAuth } from './AuthProvider';

type RequireAuthProps = {
  children: ReactNode;
  allowedRoles?: AppRole[];
  allowAnyAuthenticated?: boolean;
};

export function RequireAuth({
  children,
  allowedRoles,
  allowAnyAuthenticated = false
}: RequireAuthProps) {
  const router = useRouter();
  const { user, profile, loading } = useAuth();

  useEffect(() => {
    if (loading) {
      return;
    }

    if (!user) {
      router.replace('/login');
      return;
    }

    if (!profile) {
      return;
    }

    if (allowAnyAuthenticated) {
      return;
    }

    if (allowedRoles && !allowedRoles.includes(profile.role)) {
      router.replace(getDashboardPathByRole(profile.role));
    }
  }, [user, profile, loading, allowedRoles, allowAnyAuthenticated, router]);

  if (loading) {
    return (
      <main className="auth-page">
        <section className="card auth-card">
          <h1>Cargando...</h1>
          <p className="auth-description">
            Estamos verificando tu sesión.
          </p>
        </section>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  if (!profile) {
    return (
      <main className="auth-page">
        <section className="card auth-card">
          <h1>Perfil no disponible</h1>
          <p className="auth-description">
            No pudimos encontrar la información de tu cuenta. Intenta cerrar sesión e ingresar nuevamente.
          </p>
        </section>
      </main>
    );
  }

  if (!allowAnyAuthenticated && allowedRoles && !allowedRoles.includes(profile.role)) {
    return null;
  }

  return children;
}