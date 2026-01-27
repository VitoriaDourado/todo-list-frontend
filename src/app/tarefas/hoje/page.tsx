'use client'

import { TaskList } from '../../../components/tasks/TaskList'
import { useTasks } from '../../../hooks/useTasks'
import { isToday } from '../../../services/date.utils'

export default function HojePage() {
  const { tasks, loading, toggleTask, removeTask } = useTasks()

  const todayTasks = tasks.filter(task =>
    isToday(task.createdAt)
  )

  return (
    <div>
      <div className="bg-black text-white flex items-center justify-center pt-5">
        Minhas tasks de hoje
      </div>

      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <TaskList
            tasks={todayTasks}
            onToggle={toggleTask}
            onRemove={removeTask}
          />
        )}
      </div>
    </div>
  )
}
