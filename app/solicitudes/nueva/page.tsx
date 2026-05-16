'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Paperclip, RefreshCcw, Send, FileText } from 'lucide-react';
import { RequireAuth } from '@/components/auth/RequireAuth';
import { useAuth } from '@/components/auth/AuthProvider';
import { createTicket } from '@/services/ticketService';
import type {
  TicketChannel,
  TicketPriority
} from '@/lib/tickets/ticketTypes';

export default function NewRequestPage() {
  const router = useRouter();
  const { profile } = useAuth();

  const [title, setTitle] = useState('');
  const [serviceName, setServiceName] = useState('Redes y conectividad');
  const [category, setCategory] = useState('network');
  const [priority, setPriority] = useState<TicketPriority>('high');
  const [channel, setChannel] = useState<TicketChannel>('onsite');
  const [city, setCity] = useState('');
  const [preferredSchedule, setPreferredSchedule] = useState('');
  const [description, setDescription] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError('');

    if (!profile) {
      setError('No pudimos identificar tu perfil. Inicia sesión nuevamente.');
      return;
    }

    if (profile.role !== 'client') {
      setError('Solo los clientes pueden crear solicitudes.');
      return;
    }

    if (!title.trim() || !description.trim()) {
      setError('Completa el resumen y el detalle de la solicitud.');
      return;
    }

    setLoading(true);

    try {
      await createTicket(
        {
          title,
          description,
          serviceName,
          category,
          priority,
          channel,
          city,
          preferredSchedule
        },
        profile
      );

      router.push('/dashboard/cliente');
    } catch (requestError) {
      console.error(requestError);
      setError('No pudimos crear la solicitud. Inténtalo nuevamente.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <RequireAuth allowedRoles={['client']}>
      <section className="request-page section">
        <div className="container grid-2">
          <article className="card-soft request-card">
            <span className="badge">Crear solicitud</span>

            <h1 className="section-title">
              Describe tu necesidad técnica
            </h1>

            <p className="section-subtitle">
              Comparte los detalles principales del problema para que el equipo pueda revisar, priorizar y dar seguimiento a tu caso de forma organizada.
            </p>

            <div className="request-help-list">
              <div className="request-help-card">
                <span className="icon-bubble">
                  <FileText size={20} />
                </span>

                <div>
                  <strong>Explica qué ocurre</strong>
                  <p>Indica el problema, cuándo empezó y cómo está afectando tu trabajo o servicio.</p>
                </div>
              </div>

              <div className="request-help-card">
                <span className="icon-bubble">
                  <Paperclip size={20} />
                </span>

                <div>
                  <strong>Agrega información de apoyo</strong>
                  <p>Incluye capturas, documentos o mensajes de error que ayuden a revisar el caso con mayor precisión.</p>
                </div>
              </div>

              <div className="request-help-card">
                <span className="icon-bubble">
                  <RefreshCcw size={20} />
                </span>

                <div>
                  <strong>Consulta el avance</strong>
                  <p>Después de crear la solicitud, podrás revisar su estado, comentarios y actualizaciones desde tu portal.</p>
                </div>
              </div>
            </div>
          </article>

          <article className="card request-form-card">
            <div className="request-form-header">
              <h2>Información del caso</h2>
              <p>
                Completa los datos necesarios para que el equipo pueda entender tu solicitud y definir el siguiente paso.
              </p>
            </div>

            <form className="form-grid" onSubmit={handleSubmit}>
              <label className="field">
                <span>Resumen del problema</span>
                <input
                  placeholder="Ej. Internet intermitente en la oficina"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                  required
                />
              </label>

              <label className="field">
                <span>Tipo de servicio</span>
                <select
                  value={serviceName}
                  onChange={(event) => {
                    const selectedValue = event.target.value;
                    setServiceName(selectedValue);

                    if (selectedValue === 'Soporte remoto') {
                      setCategory('remote');
                    }

                    if (selectedValue === 'Mantenimiento de equipos') {
                      setCategory('maintenance');
                    }

                    if (selectedValue === 'Instalación y configuración') {
                      setCategory('install');
                    }

                    if (selectedValue === 'Redes y conectividad') {
                      setCategory('network');
                    }

                    if (selectedValue === 'Soporte para dispositivos móviles') {
                      setCategory('mobile');
                    }
                  }}
                  required
                >
                  <option value="Soporte remoto">Soporte remoto</option>
                  <option value="Mantenimiento de equipos">Mantenimiento de equipos</option>
                  <option value="Instalación y configuración">Instalación y configuración</option>
                  <option value="Redes y conectividad">Redes y conectividad</option>
                  <option value="Soporte para dispositivos móviles">Soporte para dispositivos móviles</option>
                </select>
              </label>

              <label className="field">
                <span>Prioridad</span>
                <select
                  value={priority}
                  onChange={(event) => setPriority(event.target.value as TicketPriority)}
                  required
                >
                  <option value="low">Baja</option>
                  <option value="medium">Media</option>
                  <option value="high">Alta</option>
                  <option value="urgent">Urgente</option>
                </select>
              </label>

              <label className="field">
                <span>Modalidad de atención preferida</span>
                <select
                  value={channel}
                  onChange={(event) => setChannel(event.target.value as TicketChannel)}
                  required
                >
                  <option value="remote">Remoto</option>
                  <option value="onsite">Presencial</option>
                  <option value="mixed">Mixto</option>
                </select>
              </label>

              <label className="field">
                <span>Ciudad de atención</span>
                <input
                  placeholder="Ej. Bogotá"
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  required
                />
              </label>

              <label className="field">
                <span>Horario sugerido</span>
                <input
                  placeholder="Ej. Hoy entre 2:00 PM y 5:00 PM"
                  value={preferredSchedule}
                  onChange={(event) => setPreferredSchedule(event.target.value)}
                  required
                />
              </label>

              <label className="field" style={{ gridColumn: '1 / -1' }}>
                <span>Detalle de la solicitud</span>
                <textarea
                  placeholder="Describe qué ocurre, desde cuándo sucede, a quién afecta y si ya intentaste alguna solución."
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  required
                />
              </label>

              <label className="field" style={{ gridColumn: '1 / -1' }}>
                <span>Archivos de apoyo</span>
                <input type="file" disabled />
                <small>
                  Próximamente conectaremos Firebase Storage para adjuntar archivos.
                </small>
              </label>

              {error && (
                <p className="auth-message auth-message-error" style={{ gridColumn: '1 / -1' }}>
                  {error}
                </p>
              )}

              <div className="request-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                >
                  <Send size={18} />
                  {loading ? 'Creando...' : 'Crear solicitud'}
                </button>

                <Link href="/dashboard/cliente" className="btn btn-danger">
                  Cancelar
                </Link>
              </div>
            </form>
          </article>
        </div>
      </section>
    </RequireAuth>
  );
}