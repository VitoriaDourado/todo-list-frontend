import Image from "next/image";

export default function Sidebar(){
  return(
    <aside className="w-64 bg-zinc-900 text-white h-screen p-4">
      <div className="flex items-center mb-4 gap-4">
        <Image
          className="dark:invert"
          src="/globe.svg"
          alt="Next.js logo"
          width={30}
          height={30}
          priority
        />
        <h1>Nome do Usuário</h1>
      </div>

      <nav className="flex flex-col gap-4 mt-8">
        <button className="text-left cursor-pointer">Hoje</button>
        <button className="text-left cursor-pointer">Em breve</button>
        <button className="text-left cursor-pointer">Projetos</button>
      </nav>
    </aside>
  )
}