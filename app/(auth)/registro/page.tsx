'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { getUserProfile, loginWithGoogle, registerUser } from '@/services/authService';
import { getDashboardPathByRole } from '@/lib/auth/roleRedirect';
import type { AppRole } from '@/lib/auth/authTypes';

type RegisterRole = Extract<AppRole, 'client' | 'technician'>;

export default function RegisterPage() {
  const router = useRouter();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<RegisterRole>('client');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');

  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleRegister(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    if (password !== passwordConfirmation) {
      setError('Las contraseñas no coinciden.');
      return;
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    setLoading(true);

    try {
      await registerUser({
        name,
        email,
        phone,
        password,
        role
      });

      router.push(getDashboardPathByRole(role));
    } catch (registerError) {
      console.error(registerError);
      setError('No pudimos crear la cuenta. Revisa los datos e inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  async function handleGoogleRegister() {
    setError('');
    setGoogleLoading(true);

    try {
      const user = await loginWithGoogle();
      const profile = await getUserProfile(user.uid);

      router.push(getDashboardPathByRole(profile?.role));
    } catch (googleError) {
      console.error(googleError);
      setError('No pudimos continuar con Google. Inténtalo nuevamente.');
    } finally {
      setGoogleLoading(false);
    }
  }

  return (
    <main className="auth-page">
      <section className="card auth-card auth-card-wide">
        <Link href="/" className="auth-back">
          <ArrowLeft size={18} />
          Volver
        </Link>

        <h1>Crea tu cuenta en Epic Services</h1>

        <p className="auth-description">
          Regístrate para crear solicitudes técnicas, hacer seguimiento a tus tickets y consultar el historial de tus servicios.
        </p>

        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-grid">
            <label className="auth-field">
              <span>Nombre completo</span>
              <input
                type="text"
                placeholder="Tu nombre completo"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>

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
              <span>Celular</span>
              <input
                type="tel"
                placeholder="+57 300 000 0000"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </label>

            <label className="auth-field">
              <span>Perfil de usuario</span>
              <select
                value={role}
                onChange={(event) => setRole(event.target.value as RegisterRole)}
                required
              >
                <option value="client">Cliente</option>
                <option value="technician">Técnico</option>
              </select>
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

            <label className="auth-field">
              <span>Confirmar contraseña</span>
              <input
                type="password"
                placeholder="••••••••"
                value={passwordConfirmation}
                onChange={(event) => setPasswordConfirmation(event.target.value)}
                required
              />
            </label>
          </div>

          {error && (
            <p className="auth-message auth-message-error">
              {error}
            </p>
          )}

          <div className="auth-actions-row">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Creando cuenta...' : 'Crear cuenta'}
            </button>

            <Link href="/login" className="btn btn-secondary">
              Iniciar sesión
            </Link>
          </div>

          <div className="auth-divider">
            <span>o</span>
          </div>

          <button
            type="button"
            className="btn btn-google"
            onClick={handleGoogleRegister}
            disabled={googleLoading}
          >
            <span className="google-icon">G</span>
            {googleLoading ? 'Conectando...' : 'Continuar con Google'}
          </button>
        </form>
      </section>
    </main>
  );
}