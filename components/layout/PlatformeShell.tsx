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
    <div className="mx-auto flex min-h-screen w-full max-w-[1689px] flex-col gap-5 px-4 py-5 sm:px-6 lg:gap-8 xl:px-0">
      <Header onMenuToggle={() => setSidebarOpen((o) => !o)} />
      <div className="flex flex-1 gap-5 lg:gap-8">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="panneau min-w-0 flex-1 p-5 sm:p-7">{children}</main>
      </div>
    </div>
  );
}
