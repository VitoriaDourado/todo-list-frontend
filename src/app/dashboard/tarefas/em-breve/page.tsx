'use client'

import { TaskList } from '../../../../components/tasks/TaskList'
import { useTasks } from '../../../../hooks/useTasks'
import { isFuture } from '../../../../services/date.utils'

export default function HojePage() {
  const { tasks, loading, toggleTask, removeTask } = useTasks()

  const futureTasks = tasks.filter(task =>
    isFuture(task.createdAt)
  )

  return (
    <div>
      <div className="bg-black text-white flex items-center justify-center pt-5">
        Minhas tasks em breve
      </div>

      <div className="flex min-h-screen items-center justify-center bg-zinc-50 dark:bg-black">
        {loading ? (
          <p>Carregando...</p>
        ) : (
          <TaskList
            tasks={futureTasks}
            onToggle={toggleTask}
            onRemove={removeTask}
          />
        )}
      </div>
    </div>
  )
}
