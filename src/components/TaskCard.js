import React from 'react';
import './TaskCard.css'; // Criar este CSS se for estilizar (opcional)

function TaskCard({ titulo }) {
  return (
    <div className="task-card">
      <p>{titulo}</p>
      {/* Aqui você pode adicionar botões de Editar e Excluir
          <button>Editar</button>
          <button>Excluir</button>
      */}
    </div>
  );
}

export default TaskCard;