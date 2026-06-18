"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, MonitorPlay, BookOpen, Users, Video } from "lucide-react";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="sidebar">
      <div className="profile-section">
        <img 
          src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop" 
          alt="Youssef" 
          className="profile-img" 
        />
        <div className="profile-name">Youssef</div>
        <div className="profile-role">Admin</div>
      </div>

      <nav className="nav-links">
        <Link href="/dashboard" className={`nav-item ${pathname === '/dashboard' ? 'active' : ''}`}>
          <LayoutDashboard />
          Dashboard
        </Link>
        <Link href="/projects" className={`nav-item ${pathname?.startsWith('/projects') ? 'active' : ''}`}>
          <MonitorPlay />
          Virtual visits
          <span className="nav-badge">3</span>
        </Link>
        <Link href="/catalog" className={`nav-item ${pathname === '/catalog' ? 'active' : ''}`}>
          <BookOpen />
          Furniture catalog
        </Link>
        <Link href="/meetings" className={`nav-item ${pathname === '/meetings' ? 'active' : ''}`}>
          <Video />
          Virtual meetings
        </Link>
        <Link href="/team" className={`nav-item ${pathname === '/team' ? 'active' : ''}`}>
          <Users />
          Team
        </Link>
      </nav>
    </aside>
  );
}
