'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { Save } from 'lucide-react';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { DashboardLayout } from '@/components/shared/DashboardLayout';
import { useAuth } from '@/components/auth/AuthProvider';
import { changePassword } from '@/services/authService';
import { getDashboardPathByRole } from '@/lib/auth/roleRedirect';

export default function ChangePasswordPage() {
  const { user, profile } = useAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newPasswordConfirmation, setNewPasswordConfirmation] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleChangePassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setSuccess('');

    if (!user) {
      setError('Debes iniciar sesión para cambiar tu contraseña.');
      return;
    }

    if (newPassword !== newPasswordConfirmation) {
      setError('La nueva contraseña y su confirmación no coinciden.');
      return;
    }

    if (newPassword.length < 6) {
      setError('La nueva contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      await changePassword(user, currentPassword, newPassword);

      setCurrentPassword('');
      setNewPassword('');
      setNewPasswordConfirmation('');
      setSuccess('Tu contraseña fue actualizada correctamente.');
    } catch (changeError) {
      console.error(changeError);
      setError(
        'No pudimos cambiar tu contraseña. Revisa la contraseña actual e inténtalo nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <RequireAuth allowAnyAuthenticated>
      <DashboardLayout
        title="Cambiar contraseña"
        subtitle="Actualiza tu contraseña para mantener protegida tu cuenta."
        currentPath="/dashboard/cambiar-contrasena"
      >
        <section className="card password-card">
          <div className="password-card-header">
            <h2>Seguridad de la cuenta</h2>
            <p>
              Ingresa tu contraseña actual y define una nueva contraseña segura.
            </p>
          </div>

          <form className="password-form" onSubmit={handleChangePassword}>
            <label className="auth-field">
              <span>Contraseña actual</span>
              <input
                type="password"
                placeholder="••••••••"
                value={currentPassword}
                onChange={(event) => setCurrentPassword(event.target.value)}
                required
              />
            </label>

            <label className="auth-field">
              <span>Nueva contraseña</span>
              <input
                type="password"
                placeholder="••••••••"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                required
              />
            </label>

            <label className="auth-field">
              <span>Confirmar nueva contraseña</span>
              <input
                type="password"
                placeholder="••••••••"
                value={newPasswordConfirmation}
                onChange={(event) => setNewPasswordConfirmation(event.target.value)}
                required
              />
            </label>

            <div className="password-help-box">
              <strong>Recomendaciones</strong>
              <p>
                Usa una contraseña de al menos 6 caracteres. Para mayor seguridad, combina letras, números y símbolos.
              </p>
            </div>

            {error && (
              <p className="auth-message auth-message-error">
                {error}
              </p>
            )}

            {success && (
              <p className="auth-message auth-message-success">
                {success}
              </p>
            )}

            <div className="password-actions">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                <Save size={18} />
                {loading ? 'Guardando...' : 'Guardar contraseña'}
              </button>

              <Link href={getDashboardPathByRole(profile?.role)} className="btn btn-secondary">
                Cancelar
              </Link>
            </div>
          </form>
        </section>
      </DashboardLayout>
    </RequireAuth>
  );
}