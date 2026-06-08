"use client";

import Image from "next/image";
import Link from "next/link";
import {
  X,
  Menu,
  Home,
  Calendar,
  Clock,
  Folder,
  PlusSquare,
  Archive,
  Users,
  Trash2,
  LogOut,
  User,
} from "lucide-react";import { useEffect, useState } from "react";
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
      className={`bg-zinc-950 border-r border-zinc-800 text-white h-screen p-4 transition-all duration-300 ${
        isOpen ? "w-64" : "w-16"
      }`}
    >
      <button
        onClick={toggle}
        className="mb-6 cursor-pointer hover:bg-zinc-800 p-2 rounded-lg"
      >
        {isOpen ? <X /> : <Menu />}
      </button>

      {isOpen && (
        <>
          {/* Usuário */}
          <div className="flex items-center gap-3 mb-8 border-b border-zinc-800 pb-4">
            <div className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center">
              <User size={20} />
            </div>

            <div>
              <p className="text-xs text-zinc-400">
                Bem-vinda
              </p>

              <h2 className="font-semibold">
                {name || "..."}
              </h2>
            </div>
          </div>

          <nav className="flex flex-col justify-between h-[calc(100%-120px)]">
            <div className="flex flex-col gap-2">
              <Link
                href="/dashboard/tarefas"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition"
              >
                <Home size={18} />
                Todas as tarefas
              </Link>

              <Link
                href="/dashboard/tarefas/hoje"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition"
              >
                <Calendar size={18} />
                Hoje
              </Link>

              <Link
                href="/dashboard/tarefas/em-breve"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition"
              >
                <Clock size={18} />
                Em breve
              </Link>

              <Link
                href="/dashboard/tarefas/projetos"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition"
              >
                <Folder size={18} />
                Projetos
              </Link>

              <Link
                href="/dashboard/tarefas/criar-tarefas"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition"
              >
                <PlusSquare size={18} />
                Criar tarefa
              </Link>

              <Link
                href="/dashboard/tarefas/arquivados"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition"
              >
                <Archive size={18} />
                Arquivados
              </Link>

              <Link
                href="/dashboard/tarefas/users"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition"
              >
                <Users size={18} />
                Usuários
              </Link>
            </div>

            <div className="flex flex-col gap-2">
              <Link
                href="/lixeira"
                className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-zinc-800 transition"
              >
                <Trash2 size={18} />
                Lixeira
              </Link>

              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition cursor-pointer"
              >
                <LogOut size={18} />
                Sair
              </button>
            </div>
          </nav>
        </>
      )}
    </aside>
  );
}