'use client'

import { useTasks } from "../../hooks/useTasks"

export function TaskList() {
    const { tasks, loading, toggleTask, removeTask } = useTasks()

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <ul>
            {tasks.map(task => (
                <li key={task.id} className="flex items-center gap-4 mb-4">
                    <input type="checkbox" checked={task.done} onChange={() => toggleTask(task.id)} />
                    <span>{task.title}</span>
                    <button onClick={() => removeTask(task.id)}>X</button>
                </li>
            ))}
        </ul>
    )
}