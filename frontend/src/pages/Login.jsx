import React, { useState } from "react";
import { Link }            from "react-router-dom";
import { useAuth }         from "../context/AuthContext";
import "./Login.css";
import illustration from '../assets/illustration.jpeg';


export default function Login() {
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  const [error, setError]       = useState("");
  const { login }               = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (err) {
      if (err.response) {
        // mostra a mensagem que o backend enviou
        setError(err.response.data.message || "Credenciais inválidas");
      } else {
        setError("Não foi possível conectar ao servidor");
      }
    }
  };
/*Parte que também vai ser estilizada, além de colocar todas as classes CSS.
  E também a responsividade, além de garantir que tudo fique centralizado*/
  return (
    <div className="login-container">
      <div className="login-illustration">
        <img src={illustration} alt="Ilustração" />
      </div>

      <div className="login-form">
        <h2>Seja bem-vindo!</h2>
        <p>
          Ainda não tem uma conta?{" "}
          <Link to="/register">Inscreva-se</Link>
        </p>

        <form onSubmit={handleSubmit}>
          <label>E-mail</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite seu e-mail"
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

          <div className="login-options">
            <label>
              <input type="checkbox" /> Mantenha-me conectado
            </label>
            <Link to="/forgot-password">Esqueceu a senha?</Link>
          </div>

          {error && <p className="error">{error}</p>}

          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}