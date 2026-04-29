import { Routes, Route } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Importe suas páginas (ajuste os caminhos conforme sua estrutura)
import Login from './app/login/page';
import TarefasHoje from './app/tarefas/hoje/page';
import TarefasTudo from "./app/tarefas/page";
import Teste from './app/page';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/tarefas/hoje" element={<TarefasHoje />} />
        <Route path="/" element={<TarefasTudo />} />
        <Route path="/teste" element={<Teste />} />
      </Route>
    </Routes>
  );
}