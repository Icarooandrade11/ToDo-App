import React from 'react';
import './TaskCard.css';

export default function TaskCard({ tarefa, onToggleStatus, onEdit, onDelete }) {
  // Usa completed, title, description, deadline, public
  const { _id, completed, title, description, deadline, public: isPublic } = tarefa;
  const taskId = _id;

  return (
    <div className={`task-card ${completed ? 'completed' : ''}`}>
      <div className="task-content">
        {onToggleStatus && (
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleStatus(taskId)}
          />
        )}
        <div className="task-texts">
          <p className="task-title">{title}</p>
          {description && <p className="task-description">{description}</p>}
          {deadline && (
            <p className="task-deadline">
              Prazo: {new Date(deadline).toLocaleDateString('pt-BR')}
            </p>
          )}
          {isPublic && <span className="task-privacy">🌐 Público</span>}
        </div>
      </div>
      {(onEdit || onDelete) && (
        <div className="task-actions">
          {onEdit  && <button onClick={() => onEdit(tarefa)}>Editar</button>}
          {onDelete && <button onClick={() => onDelete(taskId)}>Excluir</button>}
        </div>
      )}
    </div>
  );
}