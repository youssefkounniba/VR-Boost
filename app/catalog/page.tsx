import { Search, Filter, Plus } from "lucide-react";

export default function Catalog() {
  return (
    <>
      <div className="page-header">
        <div>
          <h1 className="page-title">Furniture Catalog</h1>
          <p className="page-subtitle">Browse and manage the 3D furniture available for staging.</p>
        </div>
        <button className="btn-primary">
          <Plus size={16} />
          Add item
        </button>
      </div>

      <div className="card-panel" style={{ marginBottom: '20px', display: 'flex', gap: '15px' }}>
        <div className="input-with-icon" style={{ flex: 1 }}>
          <input type="text" className="form-input" placeholder="Search furniture by name, brand, or category..." />
          <Search size={16} className="icon" />
        </div>
        <select className="form-select" style={{ width: '200px' }}>
          <option>All Categories</option>
          <option>Seating</option>
          <option>Tables</option>
          <option>Lighting</option>
          <option>Storage</option>
        </select>
        <button className="btn-secondary">
          <Filter size={16} />
          Filters
        </button>
      </div>

      <div className="style-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {[
          { name: 'Scandinave Lounge Chair', img: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=300&h=300&fit=crop', category: 'Seating' },
          { name: 'Leather Pouf', img: 'https://images.unsplash.com/photo-1503602642458-232111445657?w=300&h=300&fit=crop', category: 'Seating' },
          { name: 'Minimalist Dining Table', img: 'https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?w=300&h=300&fit=crop', category: 'Tables' },
          { name: 'Roche Bobois Sofa', img: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=300&h=300&fit=crop', category: 'Seating' },
          { name: 'Wooden Coffee Table', img: 'https://images.unsplash.com/photo-1577140917170-285929fb55b7?w=300&h=300&fit=crop', category: 'Tables' },
          { name: 'Modern Floor Lamp', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=300&fit=crop', category: 'Lighting' },
          { name: 'Accent Chair', img: 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=300&h=300&fit=crop', category: 'Seating' },
          { name: 'Velvet Sofa', img: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=300&h=300&fit=crop', category: 'Seating' },
        ].map((item, index) => (
          <div key={index} className="style-card" style={{ display: 'flex', flexDirection: 'column' }}>
            <img src={item.img} alt={item.name} className="style-img" style={{ height: '180px' }} />
            <div className="style-info" style={{ padding: '15px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div className="style-name" style={{ fontSize: '14px', marginBottom: '5px' }}>{item.name}</div>
                <div style={{ fontSize: '12px', color: '#6b7280' }}>{item.category}</div>
              </div>
              <div className="color-palette" style={{ justifyContent: 'flex-start', marginTop: '15px' }}>
                <div className="color-dot" style={{ background: '#d1d5db' }}></div>
                <div className="color-dot" style={{ background: '#4b5563' }}></div>
                <div className="color-dot" style={{ background: '#78350f' }}></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
