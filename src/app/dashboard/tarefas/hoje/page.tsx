'use client';

import { useEffect, useState } from 'react';
import {
  CheckCircle2,
  Clock3,
  Calendar,
} from 'lucide-react';

import { getTodos } from '@/src/services/auth.service';

interface Todo {
  id: number;
  title: string;
  description: string;
  status: boolean;
  createdAt: string;
  dueDate?: string;
}

export default function HojePage() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const data = await getTodos();

        const today = new Date();

        const todayTodos = data.filter((todo: Todo) => {
          if (!todo.dueDate) return false;

          const dueDate = new Date(todo.dueDate);

          return (
            dueDate.getDate() === today.getDate() &&
            dueDate.getMonth() === today.getMonth() &&
            dueDate.getFullYear() === today.getFullYear()
          );
        });

        setTodos(todayTodos);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetchTodos();
  }, []);

  function formatDate(date: string) {
    return new Date(date).toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  }

  if (loading) {
    return <p>Carregando...</p>;
  }

  return (
    <div className="p-8 min-h-screen bg-zinc-100 dark:bg-black">
      <h1 className="text-3xl font-bold mb-6">
        Tarefas de hoje
      </h1>

      {todos.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6">
          Nenhuma tarefa para hoje 🎉
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="bg-white dark:bg-zinc-900 p-5 rounded-2xl shadow"
            >
              <div className="flex justify-between">
                <h2 className="font-bold">
                  {todo.title}
                </h2>

                {todo.status ? (
                  <CheckCircle2 className="text-green-500" />
                ) : (
                  <Clock3 className="text-yellow-500" />
                )}
              </div>

              <p className="mt-3 text-zinc-500">
                {todo.description}
              </p>

              {todo.dueDate && (
                <div className="flex items-center gap-2 mt-4 text-orange-500">
                  <Calendar size={14} />
                  {formatDate(todo.dueDate)}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}