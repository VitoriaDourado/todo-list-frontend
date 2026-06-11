'use client';

import { useEffect, useState } from 'react';
import {
  Pencil,
  Trash2,
  CheckCircle2,
  Clock3,
  Calendar,
} from 'lucide-react';
import {
  getTodos,
  updateTodo,
} from '@/src/services/auth.service';


interface Todo {
  id: number;
  title: string;
  description: string;
  status: boolean;
  createdAt: string;
  dueDate?: string;
}

export default function Tarefas() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal edição
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);

  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editStatus, setEditStatus] = useState(false);

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

  function formatDate(date: string) {
    return new Date(date).toLocaleString('pt-BR', {
      dateStyle: 'short',
      timeStyle: 'short',
    });
  }

  function handleEdit(todo: Todo) {
    setEditingTodo(todo);

    setEditTitle(todo.title);
    setEditDescription(todo.description);
    setEditStatus(todo.status);
  }

  async function handleUpdate() {
    if (!editingTodo) return;

    try {
      await updateTodo(editingTodo.id, {
        title: editTitle,
        description: editDescription,
        status: editStatus,
      });

      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingTodo.id
            ? {
                ...todo,
                title: editTitle,
                description: editDescription,
                status: editStatus,
              }
            : todo
        )
      );

      setEditingTodo(null);
    } catch (error) {
      console.error('Erro ao atualizar tarefa', error);
    }
  }

  if (loading) {
    return <div className="p-6">Carregando...</div>;
  }

  return (
    <div className="p-8 min-h-screen bg-zinc-100 dark:bg-black">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Minhas tarefas
        </h1>

        <p className="text-zinc-500 mt-1">
          Gerencie suas atividades
        </p>
      </div>

      <div className="flex gap-4 mb-8 flex-wrap">
        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
          <p className="text-sm text-zinc-500">Total</p>
          <h2 className="text-2xl font-bold">
            {todos.length}
          </h2>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
          <p className="text-sm text-zinc-500">Pendentes</p>
          <h2 className="text-2xl font-bold text-yellow-500">
            {todos.filter(todo => !todo.status).length}
          </h2>
        </div>

        <div className="bg-white dark:bg-zinc-900 p-4 rounded-xl shadow">
          <p className="text-sm text-zinc-500">Concluídas</p>
          <h2 className="text-2xl font-bold text-green-500">
            {todos.filter(todo => todo.status).length}
          </h2>
        </div>
      </div>

      {todos.length === 0 ? (
        <div className="bg-white dark:bg-zinc-900 rounded-2xl p-8 text-center shadow">
          Nenhuma tarefa encontrada
        </div>
      ) : (
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {todos.map((todo) => (
            <div
              key={todo.id}
              className="
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
              "
            >
              <div className="flex justify-between items-start">
                <h2 className="font-bold text-lg">
                  {todo.title}
                </h2>

                <div
                  className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm ${
                    todo.status
                      ? 'bg-green-500/20 text-green-500'
                      : 'bg-yellow-500/20 text-yellow-500'
                  }`}
                >
                  {todo.status ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <Clock3 size={16} />
                  )}

                  {todo.status
                    ? 'Concluída'
                    : 'Pendente'}
                </div>
              </div>

              <p className="text-zinc-500 mt-3">
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
                  onClick={() => handleEdit(todo)}
                  className="
                    flex-1
                    flex items-center justify-center gap-2
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-3
                    py-2
                    rounded-lg
                    transition
                    cursor-pointer
                  "
                >
                  <Pencil size={16} />
                  Editar
                </button>

                <button
                  className="
                    flex-1
                    flex items-center justify-center gap-2
                    bg-red-600
                    hover:bg-red-700
                    text-white
                    px-3
                    py-2
                    rounded-lg
                    transition
                    cursor-pointer
                  "
                >
                  <Trash2 size={16} />
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editingTodo && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-zinc-900 p-6 rounded-2xl w-full max-w-md shadow-2xl">
            <h2 className="text-2xl font-bold mb-5">
              Editar tarefa
            </h2>

            <div className="flex flex-col gap-4">
              <input
                type="text"
                value={editTitle}
                onChange={(e) =>
                  setEditTitle(e.target.value)
                }
                className="border border-zinc-300 dark:border-zinc-700 p-3 rounded-lg"
              />

              <textarea
                value={editDescription}
                onChange={(e) =>
                  setEditDescription(e.target.value)
                }
                className="border border-zinc-300 dark:border-zinc-700 p-3 rounded-lg resize-none"
                rows={4}
              />

              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={editStatus}
                  onChange={(e) =>
                    setEditStatus(e.target.checked)
                  }
                />

                Concluída
              </label>

              <div className="flex justify-end gap-2 mt-4">
                <button
                  onClick={() => setEditingTodo(null)}
                  className="
                    bg-zinc-500
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    cursor-pointer
                  "
                >
                  Cancelar
                </button>

                <button
                  onClick={handleUpdate}
                  className="
                    bg-blue-600
                    hover:bg-blue-700
                    text-white
                    px-4
                    py-2
                    rounded-lg
                    transition
                    cursor-pointer
                  "
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}