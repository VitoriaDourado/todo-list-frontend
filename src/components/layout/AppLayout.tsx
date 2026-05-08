"use client";

import { Outlet } from "react-router-dom";
import { useState } from "react";
import Sidebar from "./Sidebar";

export default function AppLayout() {
  const [isOpen, setIsOpen] = useState(true);

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} toggle={toggle} />

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}