import Link from 'next/link';
import {
  Clock,
  Headset,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck
} from 'lucide-react';
import { CreateRequestLink } from '@/components/shared/CreateRequestLink';
import { Footer } from '@/components/shared/Footer';
import { Header } from '@/components/shared/Header';

export default function ContactPage() {
  return (
    <>
      <Header />

      <main>
        <section className="section contact-hero">
          <div className="container contact-layout">
            <article className="contact-copy">
              <span className="badge">Contacto y soporte</span>

              <h1 className="section-title">
                Estamos listos para ayudarte con tus servicios técnicos
              </h1>

              <p className="section-subtitle">
                Escríbenos si tienes dudas sobre el servicio, necesitas orientación antes de crear una solicitud
                o quieres conocer cómo funciona la atención técnica.
              </p>

              <div className="contact-info-grid">
                <div className="contact-info-card">
                  <div className="service-icon">
                    <Clock size={22} />
                  </div>

                  <div>
                    <strong>Horario de atención</strong>
                    <p>Lunes a viernes de 8:00 AM a 6:00 PM.</p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="service-icon">
                    <MessageCircle size={22} />
                  </div>

                  <div>
                    <strong>Respuesta estimada</strong>
                    <p>Respondemos la mayoría de consultas dentro del mismo día hábil.</p>
                  </div>
                </div>

                <div className="contact-info-card">
                  <div className="service-icon">
                    <ShieldCheck size={22} />
                  </div>

                  <div>
                    <strong>Soporte organizado</strong>
                    <p>Si tu caso requiere atención técnica, podrás crear una solicitud y hacer seguimiento.</p>
                  </div>
                </div>
              </div>

              <div className="contact-actions">
                
                <CreateRequestLink />

                <Link href="/servicios" className="btn btn-secondary">
                  Ver servicios
                </Link>
              </div>
            </article>

            <article className="card contact-form-card">
              <div className="contact-form-header">
                <span className="badge">Escríbenos</span>
                <h2>Cuéntanos cómo podemos ayudarte</h2>
                <p>
                  Completa este formulario y nuestro equipo revisará tu mensaje para orientarte sobre el siguiente paso.
                </p>
              </div>

              <form className="contact-form">
                <div className="form-grid">
                  <div className="field">
                    <label>Nombre completo</label>
                    <input placeholder="Tu nombre" />
                  </div>

                  <div className="field">
                    <label>Correo electrónico</label>
                    <input type="email" placeholder="correo@dominio.com" />
                  </div>

                  <div className="field">
                    <label>Teléfono</label>
                    <input type="tel" placeholder="+57 300 000 0000" />
                  </div>

                  <div className="field">
                    <label>Tipo de consulta</label>
                    <select defaultValue="support">
                      <option value="support">Soporte técnico</option>
                      <option value="services">Información de servicios</option>
                      <option value="account">Cuenta o acceso</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>

                  <div className="field contact-full-field">
                    <label>Mensaje</label>
                    <textarea placeholder="Describe brevemente tu consulta o necesidad." />
                  </div>
                </div>

                <button type="button" className="btn btn-primary contact-submit">
                  <Send size={18} />
                  Enviar mensaje
                </button>
              </form>
            </article>
          </div>
        </section>

        <section className="section contact-support-section">
          <div className="container">
            <div className="contact-support-grid">
              <article className="card contact-channel-card">
                <div className="service-icon">
                  <Mail size={22} />
                </div>

                <h3>Correo de soporte</h3>
                <p>Para consultas generales, seguimiento de casos o información sobre servicios.</p>
                <strong>soporte@epicservices.com</strong>
              </article>

              <article className="card contact-channel-card">
                <div className="service-icon">
                  <Phone size={22} />
                </div>

                <h3>Atención telefónica</h3>
                <p>Canal disponible para orientación inicial y solicitudes urgentes.</p>
                <strong>+57 319 405 0300</strong>
              </article>

              <article className="card contact-channel-card">
                <div className="service-icon">
                  <Headset size={22} />
                </div>

                <h3>Mesa de ayuda</h3>
                <p>Crea una solicitud técnica para que el equipo pueda clasificar y atender tu caso.</p>
                  <CreateRequestLink />
              </article>

              <article className="card contact-channel-card">
                <div className="service-icon">
                  <MapPin size={22} />
                </div>

                <h3>Cobertura</h3>
                <p>Atención remota y presencial según disponibilidad, ciudad y tipo de servicio.</p>
                <strong>Remoto / Presencial</strong>
              </article>
            </div>
          </div>
        </section>

        <section className="section contact-faq-section">
          <div className="container">
            <div className="contact-faq-header">
              <span className="badge">Preguntas frecuentes</span>
              <h2 className="section-title">Antes de escribirnos</h2>
              <p className="section-subtitle">
                Estas respuestas te ayudan a saber cuándo crear una solicitud y qué información preparar.
              </p>
            </div>

            <div className="contact-faq-grid">
              <article className="card contact-faq-card">
                <h3>¿Cuándo debo crear una solicitud?</h3>
                <p>
                  Cuando ya tienes un problema técnico concreto, necesitas seguimiento o quieres que el equipo revise tu caso formalmente.
                </p>
              </article>

              <article className="card contact-faq-card">
                <h3>¿Qué información debo adjuntar?</h3>
                <p>
                  Puedes incluir capturas, documentos, mensajes de error, descripción del problema y horario preferido de atención.
                </p>
              </article>

              <article className="card contact-faq-card">
                <h3>¿Puedo pedir soporte remoto?</h3>
                <p>
                  Sí. Algunas categorías pueden atenderse de forma remota, mientras que otras pueden requerir atención presencial.
                </p>
              </article>

              <article className="card contact-faq-card">
                <h3>¿Cómo hago seguimiento?</h3>
                <p>
                  Desde el portal del cliente puedes revisar solicitudes activas, solicitudes cerradas y el detalle de cada ticket.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}