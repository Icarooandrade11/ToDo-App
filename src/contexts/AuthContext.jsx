import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api.js'; // Importa a instância do Axios com o interceptor
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook para navegação programática

  // Função para fazer login
  const login = async (email, senha) => {
    try {
      const response = await api.post('/auth/login', { email, senha });
      localStorage.setItem('token', response.data.token);
      setUser(response.data.user); // Supondo que o backend retorna o objeto do usuário
      navigate('/dashboard'); // Redireciona para o dashboard após login
      return true;
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Login inválido. Verifique seus dados.');
      return false;
    }
  };

  // Função para fazer logout
  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    navigate('/login'); // Redireciona para a página de login
  };

  // Função para registrar um novo usuário
  const register = async (nome, email, senha) => {
    try {
      const response = await api.post('/auth/register', { nome, email, senha });
      // Após o registro, podemos fazer login automaticamente ou redirecionar para o login
      alert('Cadastro realizado com sucesso! Faça login para continuar.');
      navigate('/login');
      return true;
    } catch (error) {
      console.error('Erro ao registrar:', error);
      alert('Erro no cadastro. Tente novamente.');
      return false;
    }
  };

  // Função para buscar os dados do usuário autenticado (persistência de sessão)
  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const response = await api.get('/auth/me'); // Endpoint para verificar o token e retornar o usuário
        setUser(response.data.user);
      } catch (error) {
        console.error('Erro ao buscar usuário autenticado:', error);
        localStorage.removeItem('token'); // Token inválido ou expirado
        setUser(null);
        navigate('/login'); // Força o login novamente
      }
    }
    setLoading(false); // Finaliza o carregamento
  };

  // Executa fetchUser() quando o componente é montado
  useEffect(() => {
    fetchUser();
  }, []); // O array vazio garante que ele roda apenas uma vez ao montar

  if (loading) {
    return <div>Carregando...</div>; // Ou um spinner de carregamento
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, register, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);