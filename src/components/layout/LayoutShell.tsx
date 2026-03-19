"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "./Sidebar";

interface LayoutShellProps {
  children: React.ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const hideSidebar = pathname.startsWith("/login");

  return (
    <div className="flex min-h-screen">
      {!hideSidebar && (
        <Sidebar
          isOpen={isOpen}
          toggle={() => setIsOpen(prev => !prev)}
        />
      )}

      <main className="flex-1 bg-zinc-50">
        {children}
      </main>
    </div>
  );
}