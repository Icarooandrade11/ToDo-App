import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api.js'; // Certifique-se que está .js
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Adicionado estado de carregamento
  const navigate = useNavigate();

  // Função para buscar os dados do usuário autenticado (persistência de sessão)
  // Esta função é mais robusta para verificar o token com o backend
  const fetchUser = async () => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        // Usa o endpoint do backend para verificar o token e retornar o usuário
        const response = await api.get('/auth/me'); // removendo /api na frente: baseURL já é http://…/api
        setUser(response.data.user);
      } catch (error) {
        console.error('Erro ao buscar usuário autenticado:', error);
        // Se o token for inválido/expirado, remove do localStorage e desloga
        localStorage.removeItem('token');
        localStorage.removeItem('user'); // Também remove o user armazenado
        setUser(null);
        // Não navega para login aqui; o PrivateRoute cuidará disso após setLoading(false)
      }
    }
    setLoading(false); // Finaliza o carregamento da autenticação
  };

  // Tenta restaurar a sessão (executa apenas uma vez ao montar)
  useEffect(() => {
    fetchUser();
  }, []); // O array vazio garante que roda apenas uma vez ao montar

  const login = async (email, senha) => {
    try {
     
      const { data } = await api.post('/auth/login', { email, password: senha });
      localStorage.setItem('token', data.token);
      localStorage.setItem('user', JSON.stringify(data.user)); // Armazena o objeto completo do user
      // api.defaults.headers.common.Authorization = `Bearer ${data.token}`; // REMOVIDO: Interceptor em api.js já faz isso
      setUser(data.user);
      navigate('/dashboard'); // Redireciona após login bem-sucedido
    } catch (error) {
      console.error('Erro ao fazer login:', error.response ? error.response.data : error.message); // Melhor log de erro
      alert('Login inválido. Verifique seus dados.');
      // Opcional: navigate('/login'); se quiser forçar o retorno em caso de falha.
      throw error; // Propaga o erro para quem chamou (se necessário)
    }
  };

  const register = async (name, email, senha) => {
    try {
    
      await api.post('/auth/register', { name, email, password: senha });
      alert('Cadastro feito! Faça login.');
      navigate('/login'); // Redireciona para login após cadastro com sucesso
    } catch (error) {
      console.error('Erro ao registrar:', error.response ? error.response.data : error.message); // Melhor log de erro
      alert('Erro no cadastro. Tente novamente.');
      throw error; // Propaga o erro (se necessário)
    }
  };

  const logout = () => {
    localStorage.clear(); // Limpa tudo do localStorage (token e user)
    setUser(null);
    // delete api.defaults.headers.common.Authorization; // REMOVIDO: Interceptor em api.js já faz isso
    navigate('/login'); // Redireciona para login
  };

  // Se ainda estiver carregando, mostra um "Carregando..."
  if (loading) {
    return <div>Carregando autenticação...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}> {/* Inclui 'loading' no contexto */}
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext); // Mantido o hook customizado