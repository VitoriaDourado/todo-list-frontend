'use client';

import { useEffect, useState } from 'react';
import { getTodos } from '@/src/services/auth.service';

interface Todo {
  id: number;
  title: string;
  description: string;
  status: boolean;
  createdAt: string;
}

export default function Tarefas() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const data = await getTodos();
        setTodos(data);
      } catch (error) {
        console.error('Erro ao buscar tarefas', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  if (loading) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="p-6 bg-zinc-50 dark:bg-black min-h-screen">
      <h1 className="text-2xl font-bold mb-6">
        Minhas tarefas
      </h1>

      {todos.length === 0 ? (
        <p>Nenhuma tarefa encontrada</p>
      ) : (
        <div className="flex flex-col gap-4">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="border border-zinc-300 dark:border-zinc-700 p-4 rounded-xl"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-semibold text-lg">
                  {todo.title}
                </h2>

                <span>
                  {todo.status ? '✅ Concluída' : '🕗 Pendente'}
                </span>
              </div>

              <p className="text-sm opacity-80 mt-2">
                {todo.description}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}