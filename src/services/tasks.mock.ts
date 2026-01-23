import { Task } from "./tasks.types";

export const tasksMock: Task[] = [
  {
    id: "1",
    title: "Estudar Next.js",
    done: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Criar estrutura do projeto",
    done: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Criar back do projeto",
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Criar banco do projeto",
    done: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Conectar o projeto completo",
    done: false,
    createdAt: new Date().toISOString(),
  },
];
