'use client'

import { useState } from 'react'
import { createTodo } from '../../services/auth.service'
import {
  X,
  FileText,
  ClipboardList,
  CheckCircle2
} from 'lucide-react'

interface CreateTaskProps {
  onClose: () => void
}

export function CreateTask({ onClose }: CreateTaskProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [dueDate, setDueDate] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!title.trim()) return

    try {
      setLoading(true)

      await createTodo({
        title,
        description,
        status: done,
        dueDate,
      })

      onClose() 
    } catch (error) {
      console.error('Erro ao criar tarefa')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="
          bg-white
          dark:bg-zinc-900
          rounded-3xl
          w-full
          max-w-lg
          p-8
          shadow-2xl
          border
          border-zinc-200
          dark:border-zinc-800
        "
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-2xl font-bold">
              Nova tarefa
            </h2>

            <p className="text-zinc-500 text-sm">
              Preencha os dados abaixo
            </p>
          </div>

          <button
            onClick={onClose}
            className="cursor-pointer"
          >
            <X />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
        >
          <div>
            <label className="flex items-center gap-2 mb-2 font-medium">
              <ClipboardList size={18} />
              Título
            </label>

            <input
              type="text"
              placeholder="Ex: Estudar NestJS"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="
                w-full
                border
                border-zinc-300
                dark:border-zinc-700
                p-3
                rounded-xl
              "
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 font-medium">
              <FileText size={18} />
              Descrição
            </label>

            <textarea
              placeholder="Detalhes da tarefa..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
              className="
                w-full
                border
                border-zinc-300
                dark:border-zinc-700
                p-3
                rounded-xl
                resize-none
              "
            />
          </div>

          <div>
            <label className="flex items-center gap-2 mb-2 font-medium">
              📅 Data de entrega
            </label>

            <input
              type="datetime-local"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="
                w-full
                border
                border-zinc-300
                dark:border-zinc-700
                p-3
                rounded-xl
              "
            />
          </div>

          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={done}
              onChange={(e) => setDone(e.target.checked)}
            />

            <span className="flex items-center gap-2">
              <CheckCircle2 size={18} />
              Criar já concluída
            </span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="
              bg-blue-600
              hover:bg-blue-700
              text-white
              py-3
              rounded-xl
              font-medium
              transition
              cursor-pointer
            "
          >
            {loading
              ? 'Criando tarefa...'
              : 'Criar tarefa'}
          </button>
        </form>
      </div>
    </div>
  )

}
