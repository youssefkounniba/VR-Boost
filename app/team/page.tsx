import { Users, Mail, Phone, MoreVertical, Plus } from "lucide-react";

export default function Team() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Team Management</h1>
          <p className="page-subtitle">Manage your agency members and their roles.</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          Invite member
        </button>
      </div>

      <div className="style-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        {/* Member 1 */}
        <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
          <MoreVertical size={16} style={{ position: 'absolute', top: '15px', right: '15px', color: '#9ca3af', cursor: 'pointer' }} />
          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" alt="Youssef" className="profile-img" style={{ width: '80px', height: '80px', marginBottom: '15px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Youssef</h3>
          <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '15px' }}>Agency Admin</p>
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <button className="btn-secondary" style={{ flex: 1, padding: '8px' }}><Mail size={14} /></button>
            <button className="btn-secondary" style={{ flex: 1, padding: '8px' }}><Phone size={14} /></button>
          </div>
        </div>

        {/* Member 2 */}
        <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
          <MoreVertical size={16} style={{ position: 'absolute', top: '15px', right: '15px', color: '#9ca3af', cursor: 'pointer' }} />
          <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop" alt="Sarah" className="profile-img" style={{ width: '80px', height: '80px', marginBottom: '15px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Sarah Alami</h3>
          <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '15px' }}>3D Designer</p>
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <button className="btn-secondary" style={{ flex: 1, padding: '8px' }}><Mail size={14} /></button>
            <button className="btn-secondary" style={{ flex: 1, padding: '8px' }}><Phone size={14} /></button>
          </div>
        </div>

        {/* Member 3 */}
        <div className="card-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', position: 'relative' }}>
          <MoreVertical size={16} style={{ position: 'absolute', top: '15px', right: '15px', color: '#9ca3af', cursor: 'pointer' }} />
          <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop" alt="Mehdi" className="profile-img" style={{ width: '80px', height: '80px', marginBottom: '15px' }} />
          <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>Mehdi</h3>
          <p style={{ fontSize: '12px', color: '#6b7280', marginBottom: '15px' }}>Sales Advisor</p>
          <div style={{ display: 'flex', gap: '10px', width: '100%' }}>
            <button className="btn-secondary" style={{ flex: 1, padding: '8px' }}><Mail size={14} /></button>
            <button className="btn-secondary" style={{ flex: 1, padding: '8px' }}><Phone size={14} /></button>
          </div>
        </div>
      </div>
    </>
  );
}
