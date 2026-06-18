import { Video, Calendar as CalendarIcon, Clock, Users } from "lucide-react";

export default function Meetings() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Virtual Meetings</h1>
          <p className="page-subtitle">Schedule and join your Hub & Avatar virtual guided tours.</p>
        </div>
        <button className="btn-primary">
          <CalendarIcon size={16} />
          Schedule meeting
        </button>
      </div>

      <div className="visit-list">
        {/* Meeting 1 */}
        <div className="visit-item" style={{ padding: '20px' }}>
          <div style={{ background: '#e0e7ff', color: '#4f46e5', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Video size={32} />
          </div>
          <div className="visit-details">
            <div className="visit-name">Project Walkthrough: Penthouse Marina</div>
            <div className="visit-address" style={{ display: 'flex', gap: '15px', marginTop: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CalendarIcon size={14} /> Today, 14:30
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={14} /> 45 min
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Users size={14} /> 3 participants
              </span>
            </div>
          </div>
          <div className="visit-status" style={{ background: '#dbeafe', color: '#1d4ed8' }}>
            Starting soon
          </div>
          <button className="btn-blue" style={{ marginLeft: '15px' }}>Join now</button>
        </div>

        {/* Meeting 2 */}
        <div className="visit-item" style={{ padding: '20px' }}>
          <div style={{ background: '#f3f4f6', color: '#6b7280', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Video size={32} />
          </div>
          <div className="visit-details">
            <div className="visit-name">Initial Consultation: Villa Marrakesh</div>
            <div className="visit-address" style={{ display: 'flex', gap: '15px', marginTop: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CalendarIcon size={14} /> Tomorrow, 10:00
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={14} /> 30 min
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Users size={14} /> 2 participants
              </span>
            </div>
          </div>
          <div className="visit-status status-not-started">
            Scheduled
          </div>
          <button className="btn-secondary" style={{ marginLeft: '15px' }}>Copy Link</button>
        </div>
        
        {/* Meeting 3 */}
        <div className="visit-item" style={{ padding: '20px', opacity: 0.7 }}>
          <div style={{ background: '#f3f4f6', color: '#6b7280', padding: '15px', borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Video size={32} />
          </div>
          <div className="visit-details">
            <div className="visit-name">Design Review: Apartment Layla</div>
            <div className="visit-address" style={{ display: 'flex', gap: '15px', marginTop: '8px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <CalendarIcon size={14} /> Yesterday, 16:00
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Clock size={14} /> 60 min
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                <Users size={14} /> 4 participants
              </span>
            </div>
          </div>
          <div className="visit-status status-completed">
            Completed
          </div>
          <button className="btn-secondary" style={{ marginLeft: '15px' }}>View Notes</button>
        </div>
      </div>
    </>
  );
}
