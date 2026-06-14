"use client";

import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { ProjectsProvider } from "@/lib/store/projects-store";

export default function PlatformShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <ProjectsProvider>
      <div className="mx-auto flex h-screen w-full max-w-[1600px] flex-col gap-4 overflow-hidden p-4 sm:p-5">
        <Header onMenuToggle={() => setSidebarOpen((o) => !o)} />
        <div className="flex min-h-0 flex-1 gap-4">
          <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
          <main
            className="min-w-0 flex-1 overflow-y-auto rounded-2xl p-5 sm:p-6"
            style={{ backgroundColor: "#EBEBEB" }}
          >
            {children}
          </main>
        </div>
      </div>
    </ProjectsProvider>
  );
}
