import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext.jsx'; // Importa o hook do AuthContext
import './Register.css'; // Importa o CSS específico para o registro

function Register() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const { register } = useAuth(); // Pega a função de registro do contexto

  const handleRegister = async (e) => {
    e.preventDefault();
    await register(nome, email, senha); // Chama a função de registro do contexto
  };

  return (
    <div className="register-container"> {/* Adicionado uma classe específica */}
      <h2>Cadastro</h2>
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
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
        <button type="submit">Cadastrar</button>
      </form>
      <p className="register-links"> {/* Adicionado uma classe específica */}
        Já tem conta? <a href="/login">Faça login</a>
      </p>
    </div>
  );
}

export default Register;