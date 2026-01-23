'use client'

import { useEffect, useState } from "react"
import { Task } from "../services/tasks.types"
import { tasksService } from "../services/tasks.service"

export function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [loading, setLoading] = useState(true)

    async function loadTasks() {
        setLoading(true)
        const data = await tasksService.list()
        setTasks(data)
        setLoading(false)
    }

    async function addTask(title: string) {
        const newTask = await tasksService.create(title)
        setTasks(prev => [...prev, newTask])
    }

    async function toggleTask(id: string) {
        await tasksService.toggle(id)
        setTasks(prev => prev.map(task => task.id === id ? {...task, done: !task.done} : task))
    }

    async function removeTask(id: string) {
        await tasksService.remove(id)
        setTasks(prev => prev.filter(task => task.id !== id))
    }

    useEffect(() => {
        async function fetchTasks() {
        try {
            const data = await tasksService.list()
            setTasks(data)
        } finally {
            setLoading(false)
        }
    }

    fetchTasks()
    }, [])

    return { tasks, loading, addTask, toggleTask, removeTask }
}