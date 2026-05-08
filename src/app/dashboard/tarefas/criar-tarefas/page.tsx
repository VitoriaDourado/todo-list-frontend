'use client'

import { useTasks } from '../../../../hooks/useTasks';
import { useState } from 'react';
import { isFuture } from '../../../../services/date.utils';
import { CreateTask } from '@/src/components/tarefa/CreateTask';

export default function CriarTarefas() {
  const { tasks } = useTasks()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div>
      <div className="bg-black text-white flex items-center justify-center pt-5">
        Crie suas tarefas
      </div>

      <div className="flex min-h-screen items-start justify-start p-5 bg-zinc-50 dark:bg-black">
        <button
          className="bg-zinc-900 text-white p-4 cursor-pointer border rounded-lg"
          onClick={() => setIsOpen(true)}
        >
          Criar +
        </button>
      </div>

      {isOpen && (
        <CreateTask onClose={() => setIsOpen(false)} />
      )}
    </div>
  )
}
