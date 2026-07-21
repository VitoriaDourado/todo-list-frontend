'use client';

import { useEffect, useState } from 'react';
import { getArchivedTodos } from '@/src/services/auth.service';
import { Calendar, Pencil, RotateCcw, Trash2 } from 'lucide-react';

export default function Arquivados() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getArchivedTodos();
      setTodos(data);
    }

    load();
  }, []);

  function formatDate(date: string) {
    return new Date(date).toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Arquivados
      </h1>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {todos.map((todo: any) => (
          <div key={todo.id} className="
          bg-white
          dark:bg-zinc-900
          rounded-2xl
          p-5
          shadow-md
          hover:shadow-xl
          transition-all
          border
          border-zinc-200
          dark:border-zinc-800
        ">
            <div className="flex justify-between items-start">
              <h2 className="font-bold text-lg truncate cursor-pointer">{todo.title}</h2>
            </div>
            <p className="text-zinc-500 mt-3 line-clamp-2">
              {todo.description}
            </p>

            <div className="flex flex-col gap-2 mt-4 text-sm text-zinc-500">
              <div className="flex items-center gap-2">
                <Calendar size={14} />
                Criada: {formatDate(todo.createdAt)}
              </div>

              {todo.dueDate && (
                <div className="flex items-center gap-2 text-orange-500">
                  ⏰
                  Entrega: {formatDate(todo.dueDate)}
                </div>
              )}
            </div>

            <div className="flex gap-2 mt-5">
              <button
                className="
                    flex-1
                    flex items-center justify-center gap-2
                    bg-yellow-600
                    hover:bg-yellow-700
                    text-white
                    px-3
                    py-2
                    rounded-lg
                    transition
                    cursor-pointer
                  "
              >
                <RotateCcw size={16} />
                Retomar tarefa
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}