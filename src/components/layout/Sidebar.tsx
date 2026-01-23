import Image from "next/image";
import { X, Menu } from "lucide-react";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  return (
    <aside
      className={`bg-zinc-900 text-white h-screen p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <button onClick={toggle} className="mb-6 cursor-pointer">
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <>
          <div className="flex items-center gap-4 mb-8">
            <Image
              src="/globe.svg"
              alt="Logo"
              width={30}
              height={30}
            />
            <h1>Nome do Usuário</h1>
          </div>

          <nav className="flex flex-col gap-4">
            <button className="text-left">Hoje</button>
            <button className="text-left">Em breve</button>
            <button className="text-left">Projetos</button>
          </nav>
        </>
      )}
    </aside>
  );
}
