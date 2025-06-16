import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext.jsx'; // Importa o hook do AuthContext

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Pega o usuário e o estado de carregamento do contexto

  if (loading) {
    return <div>Carregando...</div>; // Mostra um loader enquanto verifica a autenticação
  }

  if (!user) {
    // Se não há usuário (não logado), redireciona para a página de login
    return <Navigate to="/login" replace />;
  }

  // Se há usuário (logado), renderiza os componentes filhos (a rota protegida)
  return children;
};

export default PrivateRoute;