import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx'; // Importa o hook do AuthContext
import './Login.css'; // Importa o CSS específico para o login

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { login } = useAuth(); // Pega a função de login do contexto

  const handleLogin = async (e) => {
    e.preventDefault();
    await login(email, senha); // Chama a função de login do contexto
  };

  return (
    <div className="login-container"> {/* Adicionado uma classe específica */}
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Sua senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <button type="submit">Entrar</button>
      </form>
      <p className="login-links"> {/* Adicionado uma classe específica */}
        Ainda não tem conta? <a href="/register">Cadastre-se</a>
      </p>
      <p className="login-links">
        <a href="/forgot-password">Esqueceu a senha?</a>
      </p>
    </div>
  );
}

export default Login;