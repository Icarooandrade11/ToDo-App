import React from 'react';
import './TaskCard.css'; 

// Recebe a tarefa completa e uma função para alternar o status
function TaskCard({ tarefa, onToggleStatus }) {
  // Adicione uma classe CSS 'completed' se a tarefa estiver concluída
  const cardClassName = `task-card ${tarefa.concluida ? 'completed' : ''}`;

  return (
    <div className={cardClassName}>
      <div className="task-content">
        {/* Checkbox para marcar como concluído/pendente */}
        <input
          type="checkbox"
          checked={tarefa.concluida}
          onChange={() => onToggleStatus(tarefa.id)} // Chama a função passada pelo pai
        />
        <p className="task-title">{tarefa.titulo}</p>
        {tarefa.descricao && ( // Mostra descrição se existir
          <p className="task-description">{tarefa.descricao}</p>
        )}
        {tarefa.prazo && ( // Mostra prazo se existir
          <p className="task-deadline">Prazo: {new Date(tarefa.prazo).toLocaleDateString()}</p>
        )}
        {tarefa.publico ? ( // Mostra ícone de privacidade
          <span className="task-privacy">🌐 Público</span>
        ) : (
          <span className="task-privacy">🔒 Privado</span>
        )}
      </div>
      {/* Botões de Ação serão adicionados em próximas seções */}
    </div>
  );
}

export default TaskCard;