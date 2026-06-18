import Link from "next/link";
import { Link as LinkIcon, ArrowRight } from "lucide-react";

export default function NewProject() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Home Staging Project Creation</h1>
      </div>

      <div className="split-layout">
        {/* Left Column */}
        <div className="left-column">
          <div className="card-panel">
            <h2 className="card-panel-title">1. Property Information</h2>
            
            <div className="form-group">
              <label className="form-label">Project Name</label>
              <input type="text" className="form-input" placeholder="Penthouse Marina" />
            </div>

            <div className="form-group">
              <label className="form-label">Property Type</label>
              <select className="form-select">
                <option>Appartment</option>
                <option>Villa</option>
                <option>House</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Address</label>
              <input type="text" className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Matterport Link / 3D Visite</label>
              <div className="input-with-icon">
                <input type="text" className="form-input" />
                <LinkIcon size={16} className="icon" />
              </div>
            </div>
          </div>

          <div className="card-panel" style={{ marginTop: '20px' }}>
            <h2 className="card-panel-title" style={{ fontSize: '14px' }}>Simulate the Visit (Optional)</h2>
            <div className="btn-group">
              <button className="btn-secondary">Launch simulation</button>
              <button className="btn-secondary" style={{ background: '#e5e7eb' }}>Add demo visit</button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-column">
          <div className="card-panel" style={{ height: '100%' }}>
            <h2 className="card-panel-title">2. Design Style</h2>
            
            <div className="style-grid">
              {/* Style 1 */}
              <div className="style-card selected">
                <img src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=300&h=200&fit=crop" alt="Contemporain Chic" className="style-img" />
                <div className="style-info">
                  <div className="style-name">Contemporain Chic</div>
                  <div className="color-palette">
                    <div className="color-dot" style={{ background: '#78716c' }}></div>
                    <div className="color-dot" style={{ background: '#4b5563' }}></div>
                    <div className="color-dot" style={{ background: '#b45309' }}></div>
                    <div className="color-dot" style={{ background: '#d6d3d1' }}></div>
                  </div>
                </div>
              </div>

              {/* Style 2 */}
              <div className="style-card">
                <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=200&fit=crop" alt="Scandinave Clean" className="style-img" />
                <div className="style-info">
                  <div className="style-name">Scandinave Clean</div>
                  <div className="color-palette">
                    <div className="color-dot" style={{ background: '#f5f5f4' }}></div>
                    <div className="color-dot" style={{ background: '#a8a29e' }}></div>
                    <div className="color-dot" style={{ background: '#9ca3af' }}></div>
                    <div className="color-dot" style={{ background: '#e7e5e4' }}></div>
                  </div>
                </div>
              </div>

              {/* Style 3 */}
              <div className="style-card">
                <img src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=300&h=200&fit=crop" alt="Roche Bobois Luxury" className="style-img" />
                <div className="style-info">
                  <div className="style-name">Roche Bobois Luxury</div>
                  <div className="color-palette">
                    <div className="color-dot" style={{ background: '#57534e' }}></div>
                    <div className="color-dot" style={{ background: '#d6d3d1' }}></div>
                    <div className="color-dot" style={{ background: '#44403c' }}></div>
                    <div className="color-dot" style={{ background: '#e7e5e4' }}></div>
                  </div>
                </div>
              </div>

              {/* Style 4 */}
              <div className="style-card">
                <img src="https://images.unsplash.com/photo-1600607686527-6fb886090705?w=300&h=200&fit=crop" alt="Minimaliste Industriel" className="style-img" />
                <div className="style-info">
                  <div className="style-name">Minimaliste Industriel</div>
                  <div className="color-palette">
                    <div className="color-dot" style={{ background: '#1c1917' }}></div>
                    <div className="color-dot" style={{ background: '#78716c' }}></div>
                    <div className="color-dot" style={{ background: '#4b5563' }}></div>
                    <div className="color-dot" style={{ background: '#d6d3d1' }}></div>
                  </div>
                </div>
              </div>
            </div>

            <div className="footer-actions">
              <Link href="/dashboard" className="link-btn">Previous</Link>
              <Link href="/projects/detail">
                <button className="btn-primary">
                  Generate preview
                  <ArrowRight size={16} />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
