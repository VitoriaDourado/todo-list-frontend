'use client'

import { TaskList } from '../components/tasks/TaskList'
import { useTasks } from '../hooks/useTasks'
import { isToday } from '../services/date.utils'
import { getTodos } from '../services/auth.service'
import { useState, useEffect } from 'react'

export default function Home() {
  const { tasks, loading, toggleTask, removeTask } = useTasks()
  const [todos, setTodos] = useState<any[]>([])

  const todayTasks = tasks.filter(task =>
    isToday(task.createdAt)
  )

  async function loadTasks() {
    try {
      const todosData = await getTodos()
      console.log('Tarefas carregadas:', todosData)
      setTodos(todosData)
    } catch (error) {
      console.error('Erro ao carregar tarefas', error)
    }
  }

  useEffect(() => {
    loadTasks()
  }, [])

  return (
    <div>
      <div className="bg-black text-white flex items-center justify-center pt-5">
        Minhas tasks
      </div>

      <div className="flex flex-col min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
        {todos.map((todo: any) => (
          <div key={todo.id}  className="mb-4 text-center flex">
            <h3>Título: {todo.title} |</h3>
            <p>&nbsp;Descrição: {todo.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}