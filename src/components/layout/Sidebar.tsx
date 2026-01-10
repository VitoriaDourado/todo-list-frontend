import Image from "next/image";
import Link from "next/link";

export default function Sidebar() {
  return (
    <aside className="w-64 bg-zinc-900 text-white h-auto p-4">
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

    </aside>
  )
}