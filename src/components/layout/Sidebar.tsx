"use client";

import Image from "next/image";
import Link from "next/link";
import { X, Menu } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getUser } from "@/src/services/auth.service";

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export default function Sidebar({ isOpen, toggle }: SidebarProps) {
  const [name, setName] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    async function fetchUser() {
      try {
        const data = await getUser();
        setName(data.name);
      } catch (error) {
        console.error("Erro ao buscar usuário", error);
      }
    }

    fetchUser();
  }, []);

  function handleLogout() {
    // Remove o token salvo no login
    localStorage.removeItem("@App:token");
    localStorage.clear();
    // Limpa o nome do usuário (opcional)
    setName("");

    // Redireciona para a página de login
    router.push("/login");
  }

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
          <div className="flex items-center mb-4 gap-4">
            <Image
              className="dark:invert"
              src="/globe.svg"
              alt="Next.js logo"
              width={30}
              height={30}
              priority
            />

            <h1>{name || "..."}</h1>
          </div>

          <nav className="flex flex-col h-screen justify-between">
            <div className="flex flex-col gap-4 mt-8">
              <Link href="/dashboard/tarefas/">Todas as tarefas</Link>
              <Link href="/dashboard/tarefas/hoje">Hoje</Link>
              <Link href="/dashboard/tarefas/em-breve">Em breve</Link>
              <Link href="/dashboard/tarefas/projetos">Projetos</Link>
              <Link href="/dashboard/tarefas/criar-tarefas">Criar tarefa</Link>
              <Link href="/dashboard/tarefas/arquivados">Arquivados</Link>
              <Link href="/dashboard/tarefas/users">Usuários</Link>

              <button
                onClick={handleLogout}
                className="text-left text-red-400 hover:text-red-300 mt-4 cursor-pointer"
              >
                Sair
              </button>
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
              <Link href="/lixeira">Lixeira</Link>
            </div>
          </nav>
        </>
      )}
    </aside>
  );
}