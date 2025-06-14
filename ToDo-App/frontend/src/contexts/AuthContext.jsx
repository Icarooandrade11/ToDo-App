import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();
export const useAuth = () => useContext(AuthContext);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // tenta restaurar sessão
  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    if (token && storedUser) {
      api.defaults.headers.common.Authorization = `Bearer ${token}`;
      setUser(JSON.parse(storedUser));
      navigate('/dashboard');
    }
  }, [navigate]);

  const login = async (email, senha) => {
    const { data } = await api.post('/auth/login', { email, password: senha });
    localStorage.setItem('token', data.token);
    localStorage.setItem('user', JSON.stringify(data.user));
    api.defaults.headers.common.Authorization = `Bearer ${data.token}`;
    setUser(data.user);
    navigate('/dashboard');
  };

  const register = async (name, email, senha) => {
    await api.post('/auth/register', { name, email, password: senha });
    alert('Cadastro feito! Faça login.');
    navigate('/login');
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    delete api.defaults.headers.common.Authorization;
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}