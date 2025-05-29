import React, { useState } from "react";
import { useAuth }         from "../context/AuthContext";
import "./Register.css";
import illustration from '../assets/illustration.jpeg';

export default function Register() {
  const [name, setName]         = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const { register }            = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await register(name, email, password);
    } catch (err) {
      setError("Erro ao criar conta. Verifique os dados e tente novamente.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-illustration">
        <img src={illustration} alt="Ilustração" />
      </div>

      <div className="register-form">
        <h2>Crie sua conta</h2>

        <form onSubmit={handleSubmit}>
          <label>Nome</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Digite seu nome"
            required
          />

          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
          />

          <label>Senha</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Digite sua senha"
            required
          />

          {error && <p className="error">{error}</p>}

          <button type="submit">Inscrever-se</button>
          <div className="back-login">
            <button type="button" onClick={() => window.location = "/login"}>
              Voltar ao Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}