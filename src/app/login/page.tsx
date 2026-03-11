'use client'

import { useState } from 'react'
import { login } from '@/src/services/auth.service'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()

    try {
      const data = await login(email, password)

      localStorage.setItem('token', data.access_token)

      router.push('/') 
    } catch (error) {
      alert('Email ou senha inválidos')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <form
        onSubmit={handleLogin}
        className="flex flex-col gap-3 bg-white p-6 rounded shadow"
      >
        <h2 className="text-xl font-bold text-black">Login</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="border p-2 text-black"
        />

        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="border p-2 text-black"
        />

        <button
          type="submit"
          className="bg-black text-white p-2 rounded"
        >
          Entrar
        </button>
      </form>
    </div>
  )
}