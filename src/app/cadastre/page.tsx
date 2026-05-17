'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { register } from '@/src/services/auth.service'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const router = useRouter()

  async function handleRegister(e: React.FormEvent) {
    e.preventDefault()

    // Validação básica
    if (!name.trim()) {
      alert('Informe seu nome')
      return
    }

    if (!email.trim()) {
      alert('Informe seu email')
      return
    }

    if (password.length < 6) {
      alert('A senha deve ter pelo menos 6 caracteres')
      return
    }

    if (password !== confirmPassword) {
      alert('As senhas não coincidem')
      return
    }

    try {
      // Cria o usuário no banco
      await register(name, email, password)

      alert('Conta criada com sucesso!')

      // Redireciona para login
      router.push('/login')
    } catch (error) {
      alert('Erro ao criar conta')
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <form
        onSubmit={handleRegister}
        className="flex flex-col gap-3 bg-white p-6 rounded shadow w-96"
      >
        <h2 className="text-xl font-bold text-black">Criar conta</h2>

        <input
          type="text"
          placeholder="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
          className="border p-2 text-black"
        />

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

        <input
          type="password"
          placeholder="Confirmar senha"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
          className="border p-2 text-black"
        />

        <button
          type="submit"
          className="bg-black text-white p-2 rounded"
        >
          Criar conta
        </button>

        <button
          type="button"
          onClick={() => router.push('/login')}
          className="text-blue-600 underline"
        >
          Já tenho uma conta
        </button>
      </form>
    </div>
  )
}