import React, { useState } from 'react';
import api from '../services/api.js'; // Usamos a instância da API diretamente aqui
import { useNavigate } from 'react-router-dom';
import './ForgotPassword.css'; // Criar este CSS se for estilizar

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleForgotPassword = async (e) => {
  e.preventDefault();
  setMessage('');
  setError('');
  try {
    await api.post('/auth/forgot-password', { email });
    setMessage('Se as credenciais estiverem corretas, você receberá um e‑mail com instruções para redefinir sua senha.');
  } catch (err) {
    console.error('Erro ao solicitar redefinição de senha:', err);
    setError('Ocorreu um erro. Por favor, tente novamente.');
  }
};

  return (
    <div className="forgot-password-container">
      <h2>Esqueceu a senha?</h2>
      <form onSubmit={handleForgotPassword}>
        <p>Informe seu e-mail para receber as instruções de recuperação de senha.</p>
        <input
          type="email"
          placeholder="Seu e-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Enviar</button>
      </form>
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
      <p className="forgot-password-links">
        Lembrou da senha? <a href="/login">Faça login</a>
      </p>
    </div>
  );
}

export default ForgotPassword;