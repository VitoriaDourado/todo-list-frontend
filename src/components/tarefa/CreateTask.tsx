'use client'

import { useState } from 'react'
import { createTodo } from '../../services/auth.service'

interface CreateTaskProps {
  onClose: () => void
}

export function CreateTask({ onClose }: CreateTaskProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!title.trim()) return

    try {
      setLoading(true)

      await createTodo({
        title,
        description,
        status: done,
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
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose} 
    >
      <div
        className="bg-white dark:bg-zinc-900 p-6 rounded-xl w-full max-w-md shadow-lg"
        onClick={(e) => e.stopPropagation()} 
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Criar Tarefa</h2>
          <button
            onClick={onClose}
            className="text-red-500 font-bold cursor-pointer"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Nome da tarefa"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 rounded-md"
          />

          <textarea
            placeholder="Descrição da tarefa"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 rounded-md resize-none"
          />

          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={done}
              onChange={(e) => setDone(e.target.checked)}
            />
            Marcar como concluída
          </label>

          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white p-2 rounded-md hover:opacity-80 transition"
          >
            {loading ? 'Criando...' : 'Criar Tarefa'}
          </button>
        </form>
      </div>
    </div>
  )

}
