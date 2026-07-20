'use client';

import { useEffect, useState } from 'react';
import { getArchivedTodos } from '@/src/services/auth.service';

export default function Arquivados() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getArchivedTodos();
      setTodos(data);
    }

    load();
  }, []);

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">
        Arquivados
      </h1>

      {todos.map((todo: any) => (
        <div key={todo.id} className="border p-4 rounded-xl mb-4">
          <h2>{todo.title}</h2>
          <p>{todo.description}</p>
        </div>
      ))}
    </div>
  );
}