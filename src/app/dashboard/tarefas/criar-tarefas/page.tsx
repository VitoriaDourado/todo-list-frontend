'use client'

import { useState } from 'react'
import { PlusCircle } from 'lucide-react'
import { CreateTask } from '@/src/components/tarefa/CreateTask'

export default function CriarTarefas() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-black p-8">
      <div className="max-w-5xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold">
            Criar tarefas
          </h1>

          <p className="text-zinc-500 mt-2">
            Organize suas atividades e acompanhe seu progresso.
          </p>
        </div>

        <div className="bg-white dark:bg-zinc-900 rounded-3xl p-10 shadow-lg border border-zinc-200 dark:border-zinc-800">
          <button
            onClick={() => setIsOpen(true)}
            className="
              flex items-center gap-3
              bg-blue-600
              hover:bg-blue-700
              text-white
              px-6
              py-4
              rounded-xl
              transition
              cursor-pointer
              font-medium
            "
          >
            <PlusCircle size={22} />
            Nova tarefa
          </button>
        </div>
      </div>

      {isOpen && (
        <CreateTask onClose={() => setIsOpen(false)} />
      )}
    </div>
  )
}