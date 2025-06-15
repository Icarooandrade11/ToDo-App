import React from 'react';
import './TaskCard.css';

// Recebe a tarefa completa e as funções de callback
// Define valores padrão para as funções de callback, caso não sejam passadas
function TaskCard({ tarefa, onToggleStatus, onEdit, onDelete }) {
  const cardClassName = `task-card ${tarefa.concluida ? 'completed' : ''}`;

  return (
    <div className={cardClassName}>
      <div className="task-content">
        {/* Checkbox para marcar como concluído/pendente - só aparece se onToggleStatus for passado */}
        {onToggleStatus && (
          <input
            type="checkbox"
            checked={tarefa.concluida}
            onChange={() => onToggleStatus(tarefa.id || tarefa._id)}
          />
        )}
        <div>
          <p className="task-title">{tarefa.titulo}</p>
          {tarefa.descricao && (
            <p className="task-description">{tarefa.descricao}</p>
          )}
          {tarefa.prazo && (
            <p className="task-deadline">Prazo: {new Date(tarefa.prazo).toLocaleDateString('pt-BR')}</p>
          )}
          {tarefa.publico ? (
            <span className="task-privacy">🌐 Público</span>
          ) : (
            <span className="task-privacy">🔒 Privado</span>
          )}
        </div>
      </div>
      {/* Botões de Ação - só aparecem se onEdit ou onDelete forem passados */}
      {(onEdit || onDelete) && (
        <div className="task-actions">
          {onEdit && (
            <button onClick={() => onEdit(tarefa)} className="edit-button">Editar</button>
          )}
          {onDelete && (
            <button onClick={() => onDelete(tarefa.id || tarefa._id)} className="delete-button">Excluir</button>
          )}
        </div>
      )}
    </div>
  );
}

export default TaskCard;