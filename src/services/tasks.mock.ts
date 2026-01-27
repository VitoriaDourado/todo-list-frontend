import { Task } from "./tasks.types";
import {today, daysFromToday} from "./date.utils";

export const tasksMock: Task[] = [
  {
    id: "1",
    title: "Estudar Next.js",
    done: true,
    createdAt: daysFromToday(-2),
  },
  {
    id: "2",
    title: "Criar estrutura do projeto",
    done: true,
    createdAt: daysFromToday(-1),
  },
  {
    id: "3",
    title: "Criar back do projeto",
    done: false,
    createdAt: today(),
  },
  {
    id: "4",
    title: "Criar banco do projeto",
    done: false,
    createdAt: daysFromToday(1),
  },
  {
    id: "5",
    title: "Conectar o projeto completo",
    done: false,
    createdAt: daysFromToday(2),
  },
];
