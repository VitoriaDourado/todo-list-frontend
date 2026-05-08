import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
  console.log('ProtectedRoute rodou');

  const location = useLocation();
  const isAuthenticated = !!localStorage.getItem('@App:token');

  if (!isAuthenticated) {
    console.log('Sem token, redirecionando para login');
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  console.log('Tem token, liberando rota');
  return <Outlet />;
};

export default ProtectedRoute;