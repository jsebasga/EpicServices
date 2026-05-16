import { CreateRequestLink } from '@/components/shared/CreateRequestLink';
import { CalendarCheck2, ClipboardList, FolderKanban } from 'lucide-react';

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="badge">Gestión de servicios técnicos</span>
            <h1>Gestiona tus <span className="text-gradient">servicios técnicos </span>desde un solo lugar</h1>
              <p>
                Epic Services te ayuda a crear solicitudes, hacer seguimiento de tus tickets y coordinar la atención técnica
                de forma clara, rápida y ordenada.
              </p>
          <div className="check-list">
            <div className="check-item"><span className="icon-bubble"><CalendarCheck2 size={18} /></span> Solicitudes técnicas claras y fáciles de crear</div>
            <div className="check-item"><span className="icon-bubble"><FolderKanban size={18} /></span> Seguimiento del estado de cada ticket en tiempo real</div>
            <div className="check-item"><span className="icon-bubble"><ClipboardList size={18} /></span> Gestión organizada para clientes, técnicos y administradores</div>
          </div>
          
            <CreateRequestLink />
        </div>
        <div className="card-soft hero-panel">
          <div className="hero-visual">
            <div className="hero-shot" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=900&q=80')" }} />  
          </div>
        </div>
      </div>
    </section>
  );
}
