'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getUserProfile, loginWithEmail, loginWithGoogle } from '@/services/authService';
import { getDashboardPathByRole } from '@/lib/auth/roleRedirect';

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');
    setLoading(true);

    try {
      const user = await loginWithEmail(email, password);
      const profile = await getUserProfile(user.uid);

      router.push(getDashboardPathByRole(profile?.role));
    } catch (authError) {
      console.error(authError);
      setError('No pudimos iniciar sesión. Revisa tu correo y contraseña.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleLogin() {
    setError('');
    setGoogleLoading(true);

    try {
      const user = await loginWithGoogle();
      const profile = await getUserProfile(user.uid);

      router.push(getDashboardPathByRole(profile?.role));
    } catch (authError) {
      console.error(authError);
      setError('No pudimos iniciar sesión con Google. Inténtalo nuevamente.');
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="card auth-card">
        <Link href="/" className="auth-back">
          <ArrowLeft size={18} />
          Volver
        </Link>

        <h1>Ingresa a tu cuenta</h1>

        <p className="auth-description">
          Accede para consultar tus solicitudes, revisar el estado de tus tickets y hacer seguimiento a tus servicios técnicos.
        </p>

        <form className="auth-form" onSubmit={handleLogin}>
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

          <label className="auth-field">
            <span>Contraseña</span>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
          </label>

          <div className="auth-help-row">
            <Link href="/recuperar-contrasena">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {error && (
            <p className="auth-message auth-message-error">
              {error}
            </p>
          )}

          <button
            type="submit"
            className="btn btn-primary auth-submit"
            disabled={loading}
          >
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </button>

          <div className="auth-divider">
            <span>o</span>
          </div>

          <button
            type="button"
            className="btn btn-google"
            onClick={handleGoogleLogin}
            disabled={googleLoading}
          >
            <span className="google-icon">G</span>
            {googleLoading ? 'Conectando...' : 'Continuar con Google'}
          </button>
        </form>

        <p className="auth-register-text">
          ¿Primera vez en Epic Services? <Link href="/registro">Crea tu cuenta</Link>
        </p>
      </section>
    </main>
  );
}