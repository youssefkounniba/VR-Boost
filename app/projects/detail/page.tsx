import Link from "next/link";
import { MessageSquare, Move, Undo2, Palette, Trash2, Maximize, Share2, Plus, MoreVertical, Link as LinkIcon } from "lucide-react";
import Room3D from "./Room3D";

export default function ProjectDetail() {
  return (
    <>
      <div className="page-header">
        <h1 className="page-title">Project Details / Preview + Hub & Avatar</h1>
      </div>

      <div className="project-details-grid">
        {/* Left: Matterport Viewer */}
        <div className="matterport-container">
          <Room3D />
          
          <div className="matterport-overlay-tag">
            ← Empty space
          </div>
          
          <div className="matterport-logo">
            <span style={{background: 'black', color: 'white', padding: '2px 4px', borderRadius: '4px', fontSize: '10px'}}>M</span> Matterport
          </div>

          <div className="matterport-tools-bottom">
            <button className="tool-icon-btn"><Share2 size={16} /></button>
            <button className="tool-icon-btn"><Maximize size={16} /></button>
          </div>

          <div className="matterport-toolbar">
            <div className="toolbar-item">
              <Plus size={20} />
            </div>
            <div className="toolbar-item">
              <MessageSquare size={16} />
              <span>COMMENT</span>
            </div>
            <div className="toolbar-item">
              <Move size={16} />
              <span>MOVE</span>
            </div>
            <div className="toolbar-item">
              <Undo2 size={16} />
              <span>UNDO / REDO</span>
            </div>
            <div className="toolbar-item active">
              <Palette size={16} />
              <span>COLOR</span>
            </div>
            <div className="toolbar-item">
              <Trash2 size={16} />
              <span>DELETE</span>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="right-sidebar">
          {/* Selected Style */}
          <div className="card-panel" style={{ padding: '15px' }}>
            <h3 className="section-title" style={{ fontSize: '14px', marginBottom: '10px' }}>Selected Style</h3>
            <div className="style-card selected">
              <div className="style-badge">Selected</div>
              <img src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=300&h=150&fit=crop" alt="Scandinave Clean" className="style-img" style={{ height: '100px' }} />
              <div className="style-info" style={{ padding: '8px' }}>
                <div className="style-name">Scandinave Clean</div>
                <div className="color-palette">
                  <div className="color-dot" style={{ background: '#f5f5f4' }}></div>
                  <div className="color-dot" style={{ background: '#a8a29e' }}></div>
                  <div className="color-dot" style={{ background: '#9ca3af' }}></div>
                  <div className="color-dot" style={{ background: '#e7e5e4' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Furniture and Ambiances */}
          <div className="card-panel" style={{ padding: '15px', flex: 1 }}>
            <h3 className="section-title" style={{ fontSize: '14px', marginBottom: '10px' }}>Furniture and Ambiances</h3>
            <div className="furniture-grid">
              <div className="furniture-item">
                <img src="https://images.unsplash.com/photo-1592078615290-033ee584e267?w=150&h=150&fit=crop" alt="Chair" className="furniture-img" />
                <div className="furniture-actions">
                  <div className="color-palette">
                    <div className="furniture-color" style={{ background: '#d1d5db' }}></div>
                    <div className="furniture-color" style={{ background: '#4b5563' }}></div>
                  </div>
                  <MoreVertical size={14} className="furniture-more" />
                </div>
              </div>
              <div className="furniture-item">
                <img src="https://images.unsplash.com/photo-1503602642458-232111445657?w=150&h=150&fit=crop" alt="Stool" className="furniture-img" />
                <div className="furniture-actions">
                  <div className="color-palette">
                    <div className="furniture-color" style={{ background: '#d97706' }}></div>
                  </div>
                  <MoreVertical size={14} className="furniture-more" />
                </div>
              </div>
              <div className="furniture-item">
                <img src="https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=150&h=150&fit=crop" alt="Table" className="furniture-img" />
                <div className="furniture-actions">
                  <div className="color-palette">
                    <div className="furniture-color" style={{ background: '#d1d5db' }}></div>
                  </div>
                  <MoreVertical size={14} className="furniture-more" />
                </div>
              </div>
              <div className="furniture-item">
                <img src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=150&h=150&fit=crop" alt="Sofa" className="furniture-img" />
                <div className="furniture-actions">
                  <div className="color-palette">
                    <div className="furniture-color" style={{ background: '#78350f' }}></div>
                  </div>
                  <MoreVertical size={14} className="furniture-more" />
                </div>
              </div>
              <div className="furniture-item">
                <img src="https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=150&h=150&fit=crop" alt="Table" className="furniture-img" />
                <div className="furniture-actions">
                  <div className="color-palette">
                    <div className="furniture-color" style={{ background: '#b45309' }}></div>
                    <div className="furniture-color" style={{ background: '#fde68a' }}></div>
                  </div>
                  <MoreVertical size={14} className="furniture-more" />
                </div>
              </div>
              <div className="furniture-item add-furniture">
                <Plus />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="project-details-footer">
        <Link href="/projects/new" className="link-btn">Previous</Link>
        <button className="btn-primary">Generate PDF report</button>
        <button className="btn-blue">
          <LinkIcon size={16} />
          Share the project & Launch HUB
        </button>
      </div>
    </>
  );
}
