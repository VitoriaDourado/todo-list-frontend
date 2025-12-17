import { Task } from "./tasks.types";

export const tasksMock: Task[] = [
  {
    id: "1",
    title: "Estudar Next.js",
    completed: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Criar estrutura do projeto",
    completed: true,
    createdAt: new Date().toISOString(),
  },
];
