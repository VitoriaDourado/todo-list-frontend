'use client'

import { useState } from 'react'
import { register } from '@/src/services/auth.service'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleRegister(e: any) {
    e.preventDefault()

    try {
      await register(name, email, password)

      alert('Conta criada com sucesso')

      router.push('/login')
    } catch (error) {
      alert('Erro ao criar conta')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-100">

      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-4 bg-white p-8 rounded shadow w-80"
      >

        <h1 className="text-xl font-bold text-center">
          Criar conta
        </h1>

        <input
          type="text"
          placeholder="Nome"
          className="border p-2 rounded"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Senha"
          className="border p-2 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="bg-black text-white p-2 rounded">
          Criar conta
        </button>

        <p className="text-sm text-center">
          Já tem conta?
          <a href="/login" className="text-blue-500 ml-1">
            Fazer login
          </a>
        </p>

      </form>
    </div>
  )
}