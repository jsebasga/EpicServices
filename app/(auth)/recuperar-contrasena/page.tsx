'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { ArrowLeft, MailCheck } from 'lucide-react';
import { recoverPassword } from '@/services/authService';

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleRecoverPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');
    setSuccess('');
    setLoading(true);

    try {
      await recoverPassword(email);

      setSuccess(
        'Te enviamos un correo con las instrucciones para restablecer tu contraseña.'
      );
      setEmail('');
    } catch (recoverError) {
      console.error(recoverError);
      setError(
        'No pudimos enviar el correo de recuperación. Verifica el correo e inténtalo nuevamente.'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="card auth-card">
        <Link href="/login" className="auth-back">
          <ArrowLeft size={18} />
          Volver al inicio de sesión
        </Link>

        <h1>Recupera tu contraseña</h1>

        <p className="auth-description">
          Ingresa el correo asociado a tu cuenta y te enviaremos las instrucciones para restablecer tu contraseña.
        </p>

        <form className="auth-form" onSubmit={handleRecoverPassword}>
          <label className="auth-field">
            <span>Correo electrónico</span>
            <input
              type="email"
              placeholder="tu-correo@dominio.com"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </label>

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

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            <MailCheck size={18} />
            {loading ? 'Enviando...' : 'Enviar instrucciones'}
          </button>
        </form>

        <p className="auth-register-text">
          ¿Recordaste tu contraseña? <Link href="/login">Inicia sesión</Link>
        </p>
      </section>
    </main>
  );
}