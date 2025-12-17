import Sidebar from "./Sidebar";

interface LayoutShellProps {
  children: React.ReactNode;
}

export default function LayoutShell({ children }: LayoutShellProps) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <main className="flex-1 bg-zinc-50">
        {children}
      </main>
    </div>
  );
}
