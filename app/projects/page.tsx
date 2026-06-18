import Link from "next/link";
import { Plus, CheckCircle2, MonitorPlay, Calendar, MoreVertical, Search, Filter } from "lucide-react";

export default function Projects() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Virtual Visits</h1>
          <p className="page-subtitle">Manage and monitor all your active and past virtual staging projects.</p>
        </div>
        <Link href="/projects/new">
          <button className="btn-primary">
            <Plus size={16} />
            New visit
          </button>
        </Link>
      </div>

      <div className="card-panel" style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
        <div className="input-with-icon" style={{ flex: 1 }}>
          <input type="text" className="form-input" placeholder="Search visits by name, address..." />
          <Search size={16} className="icon" />
        </div>
        <button className="btn-secondary">
          <Filter size={16} />
          Filters
        </button>
      </div>

      <div className="visit-list">
        {/* Visit 1 */}
        <div className="visit-item">
          <img src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=200&fit=crop" alt="Apartment" className="visit-image" />
          <div className="visit-details">
            <div className="visit-name">Youssef Alami, Apartment</div>
            <div className="visit-address">
              <span>12 Rue de la Paix, Rabat 10000, Morocco</span>
            </div>
            <div className="visit-tags">Living Room, Bedroom, Kitchen</div>
          </div>
          <div className="visit-status status-not-started">
            <span className="status-dot"></span>
            Not Started
          </div>
          <div className="visit-avatars">
            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop" alt="Avatar" className="visit-avatar" />
          </div>
          <MoreVertical className="visit-actions" />
        </div>

        {/* Visit 2 */}
        <div className="visit-item">
          <img src="https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?w=300&h=200&fit=crop" alt="Apartment" className="visit-image" />
          <div className="visit-details">
            <div className="visit-name">Layla El Idrissi, Apartment</div>
            <div className="visit-address">
              <span>45 Rue des Oliviers, Casablanca 20200, Morocco</span>
            </div>
            <div className="visit-tags">Kitchen</div>
          </div>
          <div className="visit-status status-pending">
            <span className="status-dot"></span>
            Pending
          </div>
          <div className="visit-avatars">
            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop" alt="Avatar" className="visit-avatar" />
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop" alt="Avatar" className="visit-avatar" />
          </div>
          <MoreVertical className="visit-actions" />
        </div>

        {/* Visit 3 */}
        <div className="visit-item">
          <img src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=300&h=200&fit=crop" alt="Villa" className="visit-image" />
          <div className="visit-details">
            <div className="visit-name">Ahmed Benali, Villa</div>
            <div className="visit-address">
              <span>87 Avenue Hassan II, Marrakesh 40000, Morocco</span>
            </div>
            <div className="visit-tags">Living Room</div>
          </div>
          <div className="visit-status status-completed">
            <span className="status-dot"></span>
            Completed
          </div>
          <div className="visit-avatars">
            <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=50&h=50&fit=crop" alt="Avatar" className="visit-avatar" />
            <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop" alt="Avatar" className="visit-avatar" />
          </div>
          <MoreVertical className="visit-actions" />
        </div>
      </div>
    </>
  );
}
