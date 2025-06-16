import React, { useEffect, useState } from 'react';
import api from '../services/api.js';
import TaskCard from '../components/TaskCard.js';
import { Link } from 'react-router-dom';
import './PublicTasks.css';

export default function PublicTasks() {
  const [tarefasPublicas, setTarefasPublicas] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await api.get('/tasks/public'); // ↔️ baseURL '/api'
        setTarefasPublicas(res.data);
      } catch (err) {
        console.error(err.response?.data || err);
        alert('Erro ao carregar tarefas públicas.');
      }
    })();
  }, []);

  return (
    <div className="public-tasks-container">
      <h2>Tarefas Públicas</h2>
      <div className="task-list">
        {tarefasPublicas.length > 0
          ? tarefasPublicas.map(t => (
              <TaskCard 
                key={t._id}
                tarefa={t}
                // Não passamos onEdit/onDelete ou onToggleStatus
              />
            ))
          : <p>Nenhuma tarefa pública disponível.</p>}
      </div>
      <p>
        Voltar para <Link to="/dashboard">minhas tarefas</Link>
      </p>
    </div>
  );
}