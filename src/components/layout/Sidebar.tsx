import Image from "next/image";
import Link from "next/link";
import { X, Menu } from "lucide-react";


interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  return (
    <aside
      className={`bg-zinc-900 text-white h-screen p-4 transition-all duration-300 ${isOpen ? "w-64" : "w-16"
        }`}
    >
      <button onClick={toggle} className="mb-6 cursor-pointer">
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <>
          <div className="flex items-center mb-4 gap-4">
            <Image
              className="dark:invert"
              src="/globe.svg"
              alt="Next.js logo"
              width={30}
              height={30}
              priority
            />
            <h1>remyklo</h1>
          </div>

          <nav className="flex flex-col h-screen justify-between">
            <div className="flex flex-col gap-4 mt-8">
              <Link href={"/"} className="text-left cursor-pointer">Todas as tarefas</Link>
              <Link href={"/tarefas/hoje"} className="text-left cursor-pointer">Hoje</Link>
              <Link href={"/tarefas/em-breve"} className="text-left cursor-pointer">Em breve</Link>
              <Link href={"/tarefas/projetos"} className="text-left cursor-pointer">Projetos</Link>
              <Link href={"/tarefas/arquivados"} className="text-left cursor-pointer">Arquivados</Link>
            </div>
            <div className="flex items-center mb-4 mt-auto justify-center">
              <Image
                className="dark:invert"
                src="/trash.svg"
                alt="trash bin"
                width={60}
                height={60}
                priority
              />

              <Link href={"/lixeira"} className="text-center cursor-pointer">Lixeira</Link>
            </div>
          </nav>
        </>
      )}
    </aside>
  )
}
