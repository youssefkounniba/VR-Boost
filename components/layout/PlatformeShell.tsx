"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function PlatformeShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="mx-auto flex min-h-screen w-full max-w-[1600px] flex-col gap-4 p-4 sm:p-5">
      <Header onMenuToggle={() => setSidebarOpen((o) => !o)} />
      <div className="flex flex-1 gap-4">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main
          className="min-w-0 flex-1 rounded-2xl p-5 sm:p-6"
          style={{ backgroundColor: "#EBEBEB" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
