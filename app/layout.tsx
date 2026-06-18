import "./globals.css";
import { Metadata } from "next";
import { Bell, Mail } from "lucide-react";
import Sidebar from "./Sidebar";

export const metadata: Metadata = {
  title: "Roche Bobois - Dashboard",
  description: "Virtual Home Staging Dashboard",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="layout-container">
          {/* Header */}
          <header className="top-header">
            <div className="logo">
              rochebobois
              <span>PARIS</span>
            </div>
            <div className="header-actions">
              <button className="icon-btn">
                <Mail size={20} />
              </button>
              <button className="icon-btn">
                <Bell size={20} />
                <span className="badge">1</span>
              </button>
            </div>
          </header>

          {/* Main Layout Wrapper */}
          <div className="main-wrapper">
            {/* Sidebar (Client Component) */}
            <Sidebar />

            {/* Page Content */}
            <main className="page-content">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}
