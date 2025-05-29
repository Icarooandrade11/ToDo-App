import React, { useState } from "react";
import { useNavigate }      from "react-router-dom";
import api                  from "../services/api";
import "./ForgotPassword.css";

export default function ForgotPassword() {
  const [email, setEmail]     = useState("");
  const [message, setMessage] = useState("");
  const [error, setError]     = useState("");
  const navigate              = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/auth/forgot-password", { email });
      setMessage("E-mail de recuperação enviado! Verifique sua caixa.");
      setError("");
    } catch (err) {
      setError("Não foi possível enviar o e-mail. Tente novamente.");
      setMessage("");
    }
  };

  return (
    <div className="forgot-container">
      <div className="forgot-form">
        <h2>Recuperar Senha</h2>
        <p>Informe seu e-mail e receba instruções de redefinição.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="seu@email.com"
            required
          />
          <button type="submit">Enviar</button>
        </form>

        {message && <p className="message">{message}</p>}
        {error   && <p className="error">{error}</p>}

        <div className="back-login">
          <button onClick={() => navigate("/login")}>
            Voltar ao Login
          </button>
        </div>
      </div>
    </div>
  );
}