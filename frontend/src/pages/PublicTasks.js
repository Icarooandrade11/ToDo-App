import React, { useEffect, useState } from 'react';
import api from '../services/api.js'; // Importa a instância da API
import TaskCard from '../components/TaskCard.js'; // Importa o TaskCard atualizado
import './PublicTasks.css'; // Certifique-se que este CSS existe e tem os estilos

function PublicTasks() {
  const [tarefasPublicas, setTarefasPublicas] = useState([]);

  useEffect(() => {
    const fetchPublicTasks = async () => {
      try {
        // CORRETO: Ajuste o endpoint para o que seu backend usa para tarefas PÚBLICAS
        // Com base no seu setup, pode ser '/api/tasks/public' ou '/api/publicas'
        // Se seu backend tem 'app.use('/api/tasks', taskRoutes);' e em taskRoutes você tem 'router.get('/public', ...)', então use '/api/tasks/public'
        const res = await api.get('/api/tasks/public'); // Mudei para '/api/tasks/public' - Confirme no seu backend!
        setTarefasPublicas(res.data);
      } catch (err) {
        console.error('Erro ao carregar tarefas públicas:', err.response ? err.response.data : err.message);
        alert('Erro ao carregar tarefas públicas.');
      }
    };
    fetchPublicTasks();
  }, []);

  return (
    <div className="public-tasks-container">
      <h2>Tarefas Públicas</h2>

      <div className="task-list">
        {tarefasPublicas.length > 0 ? (
          tarefasPublicas.map((tarefa) => (
            // PASSA O OBJETO COMPLETO da tarefa para o TaskCard
            // Usa id ou _id (MongoDB) para a key
            <TaskCard
              key={tarefa.id || tarefa._id}
              tarefa={tarefa} // Passa o objeto completo da tarefa
              // Tarefas públicas geralmente não têm botões de editar/excluir,
              // então não passamos as funções onToggleStatus, onEdit, onDelete aqui.
              // O TaskCard deve estar preparado para lidar com isso (ver próxima seção).
            />
          ))
        ) : (
          <p>Nenhuma tarefa pública disponível.</p>
        )}
      </div>

      <p className="public-tasks-links">
        Voltar para <a href="/dashboard">minhas tarefas</a>
      </p>
    </div>
  );
}

export default PublicTasks;