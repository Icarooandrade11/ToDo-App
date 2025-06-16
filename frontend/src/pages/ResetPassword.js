import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api.js';

export default function ResetPassword() {
  const [newPass, setNewPass] = useState('');
  const navigate = useNavigate();
  const { token } = useParams();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/reset-password', {
  token, 
  newPassword: newPass
});
      alert('Senha redefinida com sucesso! Faça login.');
      navigate('/login');
    } catch (err) {
      console.error(err);
      alert('Link inválido ou expirado.');
    }
  };

  return (
    <div className="reset-password-container">
      <h2>Redefinir senha</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Nova senha"
          value={newPass}
          onChange={(e) => setNewPass(e.target.value)}
          required
        />
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
}