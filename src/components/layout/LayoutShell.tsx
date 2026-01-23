"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";

interface LayoutShellProps {
  children: React.ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} toggle={() => setIsOpen(!isOpen)} />

      <main className="flex-1 bg-zinc-50">
        {children}
      </main>
    </div>
  );
}
