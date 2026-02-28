import { API_URL } from './api'

interface UpdateTodoListDto {
  title?: string;
  description?: string;
  status?: boolean;
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


export async function getUsers(){
  const response = await fetch(`${API_URL}/users`)

  if (!response.ok) {
    throw new Error('Erro ao buscar usuários')
  }
  return response.json()
}

export async function createTodo(data: CreateTodoDto) {
  const response = await fetch(`${API_URL}/todo-list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })

  if (!response.ok) {
    throw new Error('Erro ao criar todo')
  }

  return response.json()
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