import { API_URL } from './api'

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