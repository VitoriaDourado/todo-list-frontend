'use client'

import { useEffect, useState } from 'react';
import { getUsers } from '@/src/services/auth.service';

interface User {
  id: string
  name: string
  email: string
  createdAt: string
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getUsers()
      .then(data => setUsers(data))
      .finally(() => setLoading(false))
      console.log(users)
  }, [])

  if (loading) {
    return <p>Carregando...</p>
  }

  return (
    <div className="flex flex-col h-full items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h1 className="text-2xl font-bold mb-4">Usuários:</h1>

      <ul>
        {users.map(user => (
          <li key={user.id}>
            <strong>{user.name}</strong> — {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}
