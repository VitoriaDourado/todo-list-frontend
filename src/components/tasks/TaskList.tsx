'use client'

import { Task } from '../../services/tasks.types'

interface TaskListProps {
  tasks: Task[]
  onToggle: (id: string) => void
  onRemove: (id: string) => void
}

export function TaskList({ tasks, onToggle, onRemove }: TaskListProps) {
  if (!tasks.length) {
    return <p>Nenhuma task para hoje 🎉</p>
  }

  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id} className="flex items-center gap-4 mb-4">
          <input
            type="checkbox"
            checked={task.done}
            onChange={() => onToggle(task.id)}
          />
          <span>{task.title}</span>
          <button onClick={() => onRemove(task.id)}>X</button>
        </li>
      ))}
    </ul>
  )
}
