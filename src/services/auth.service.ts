import { API_URL } from './api'

interface UpdateTodoListDto {
  title?: string;
  description?: string;
  status?: boolean;
}
interface CreateTodoDto {
  title: string;
  description: string;
}

export async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })

  if (!response.ok) {
    throw new Error('Email ou senha inválidos')
  }

  return response.json()
}

export async function register(name: string, email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, password }),
  })

  if (!response.ok) {
    throw new Error('Erro ao criar conta')
  }

  return response.json()
}

export async function getUsers(){
  const response = await fetch(`${API_URL}/users`)

  if (!response.ok) {
    throw new Error('Erro ao buscar usuários')
  }
  return response.json()
}

export async function getUser() {
  const token = localStorage.getItem('@App:token');

  const response = await fetch(`${API_URL}/auth/user`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar usuário');
  }

  return response.json();
}

export async function getTodos() {
  const token = localStorage.getItem('@App:token');

  const response = await fetch(`${API_URL}/graphql`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      query: `
        query {
          todoLists {
            id
            title
            description
            status
            dueDate
            createdAt
          }
        }
      `,
    }),
  });

  const result = await response.json();

  return result.data.todoLists;
}

export async function getArchivedTodos() {
  const token = localStorage.getItem('@App:token');

  const response = await fetch(`${API_URL}/todo-list/archived`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error('Erro ao buscar tarefas arquivadas');
  }

  return response.json();
}

export async function createTodo(data: CreateTodoDto) {
  const token = localStorage.getItem('@App:token');

  const response = await fetch(`${API_URL}/todo-list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error(errorData);

    throw new Error('Erro ao criar todo');
  }

  return response.json();
}

export async function updateTodo(id: number, data: UpdateTodoListDto) {
  const response = await fetch(`${API_URL}/todo-list/${id}`, {
    method: 'PATCH', 
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function deleteTodo(id: number) {
  const response = await fetch(`${API_URL}/todo-list/${id}`, {
    method: 'DELETE',
  });
  return response.json();
}