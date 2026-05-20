import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './app/login/page';
import TarefasHoje from './app/dashboard/tarefas/hoje/page';
import TarefasTudo from './app/dashboard/tarefas/page';
import Teste from './app/page';

export function AppRoutes() {
  const token = localStorage.getItem('@App:token');

  return (
    <Routes>
      {/* Rota inicial */}
      <Route
        path="/"
        element={
          token ? (
            <Navigate to="/dashboard/tarefas/hoje" replace />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      {/* Login */}
      <Route path="/login" element={<Login />} />

      {/* Rotas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route
          path="/dashboard/tarefas"
          element={<TarefasTudo />}
        />

        <Route
          path="/dashboard/tarefas/hoje"
          element={<TarefasHoje />}
        />

        <Route
          path="/dashboard/teste"
          element={<Teste />}
        />
      </Route>
    </Routes>
  );
}