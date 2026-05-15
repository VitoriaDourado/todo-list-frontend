import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

import Login from './app/login/page';
import TarefasHoje from './app/dashboard/tarefas/hoje/page';
import TarefasTudo from "./app/dashboard/tarefas/page";
import Teste from './app/page';

export function AppRoutes() {
  const token = localStorage.getItem('@App:token');
  console.log('AppRoutes renderizou');


  return (
    <Routes>
      {/* entrada do app */}
      <Route
        path="/"
        element={
          localStorage.getItem('@App:token')
            ? <Navigate to="dashboard/tarefas/hoje" />
            : <Navigate to="/login" />
        }
      />

      {/* login */}
      <Route path="/login" element={<Login />} />

      {/* protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="dashboard/tarefas/hoje" element={<TarefasHoje />} />
        <Route path="dashboard/teste" element={<Teste />} />
      </Route>
    </Routes>
  );
}