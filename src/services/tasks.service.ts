import {tasksMock} from "./tasks.mock";
import {Task} from "./tasks.types";

let tasks = [...tasksMock];

export const tasksService = {
  async list(): Promise<Task[]> {
    return new Promise((resolve) => {
      setTimeout(() => {
          resolve(tasks);
      }, 300)
    })
  },
  async create(title: string): Promise<Task> {
    const newTask: Task = {
      id: crypto.randomUUID(),
      title,
      done: false,
      createdAt: new Date().toISOString()
    }
    tasks.push(newTask);
    return newTask
  },
  async toggle(id: string): Promise<void> {
    tasks = tasks.map((task) => {
      if (task.id === id) {
          task.done = !task.done
      }
      return task
    })
  },
  async remove(id: string): Promise<void> {
    tasks = tasks.filter((task) => task.id !== id)
  }
}