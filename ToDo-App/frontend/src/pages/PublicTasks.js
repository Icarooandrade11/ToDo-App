import React, { useEffect, useState } from 'react';
import api from '../services/api.js'; // Importa a instância da API
import TaskCard from '../components/TaskCard.js';
import './PublicTasks.css'; // Criar este CSS se for estilizar

function PublicTasks() {
  const [tarefasPublicas, setTarefasPublicas] = useState([]);

  useEffect(() => {
    const fetchPublicTasks = async () => {
      try {
        const res = await api.get('/tasks/public'); // Usa a instância 'api'
        setTarefasPublicas(res.data);
      } catch (err) {
        console.error('Erro ao carregar tarefas públicas:', err);
        alert('Erro ao carregar tarefas públicas.');
      }
    };
    fetchPublicTasks();
  }, []);

  return (
    <div className="public-tasks-container"> {/* Classe específica */}
      <h2>Tarefas Públicas</h2>

      <div className="task-list">
        {tarefasPublicas.length > 0 ? (
          tarefasPublicas.map((tarefa) => (
            <TaskCard key={tarefa.id} titulo={tarefa.titulo} />
          ))
        ) : (
          <p>Nenhuma tarefa pública disponível.</p>
        )}
      </div>

      <p className="public-tasks-links"> {/* Classe específica */}
        Voltar para <a href="/dashboard">minhas tarefas</a>
      </p>
    </div>
  );
}

export default PublicTasks;