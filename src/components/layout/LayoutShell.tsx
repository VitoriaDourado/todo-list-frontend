"use client";

import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Sidebar from "./Sidebar";

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  function toggleSidebar() {
    setIsOpen(!isOpen);
  }

  const token =
    typeof window !== "undefined"
      ? localStorage.getItem("@App:token")
      : null;

  if (!token) {
    if (pathname !== "/login") {
      router.replace("/login");
    }

    return null;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar isOpen={isOpen} toggle={toggleSidebar} />

      <main className="flex-1 p-6">
        {children}
      </main>
    </div>
  );
}