import React, { useEffect, useState } from 'react';
import api from '../services/api.js'; // Importa a instância da API com o interceptor
import TaskCard from '../components/TaskCard.js';
import { useAuth } from '../contexts/AuthContext.jsx'; // Para usar a função de logout
import './Dashboard.css'; // Importa o CSS específico para o dashboard

function Dashboard() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const { user, logout } = useAuth(); // Pega o usuário e a função de logout do contexto

  useEffect(() => {
    // Não precisamos mais verificar o token aqui, o PrivateRoute já cuida disso
    // e o interceptor da API adiciona o token automaticamente.
    const fetchTarefas = async () => {
      try {
        const res = await api.get('/tasks'); // Usa a instância 'api'
        setTarefas(res.data);
      } catch (err) {
        console.error('Erro ao carregar tarefas:', err);
        alert('Erro ao carregar tarefas. Por favor, faça login novamente.');
        logout(); // Força o logout se houver erro na requisição de tarefas
      }
    };
    fetchTarefas();
  }, [logout]); // Adiciona logout como dependência para evitar warnings

  const handleNovaTarefa = async (e) => {
    e.preventDefault();
    if (!novaTarefa.trim()) return;

    try {
      const res = await api.post('/tasks', {
        title: novaTarefa,
        // Adicione outros campos se seu backend espera (ex: 'publico': false)
      });
      setTarefas([...tarefas, res.data]);
      setNovaTarefa('');
    } catch (error) {
      console.error('Erro ao adicionar tarefa:', error);
      alert('Erro ao adicionar tarefa.');
    }
  };

  const handleLogout = () => {
    logout(); // Chama a função de logout do contexto
  };

  return (
    <div className="dashboard-container"> {/* Classe específica */}
      <h2>Olá, {user?.name || 'Usuário'}! Suas Tarefas</h2> {/* Mostra o nome do usuário */}

      <form onSubmit={handleNovaTarefa} className="new-task-form"> {/* Classe específica */}
        <input
          type="text"
          placeholder="Nova tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          required
        />
        <button type="submit">Adicionar</button>
      </form>

      <div className="task-list">
        {tarefas.length > 0 ? (
          tarefas.map((tarefa) => (
            <TaskCard key={tarefa.id} titulo={tarefa.titulo} /> // Pode expandir TaskCard para editar/excluir
          ))
        ) : (
          <p>Nenhuma tarefa adicionada ainda.</p>
        )}
      </div>

      <p className="dashboard-links"> {/* Classe específica */}
        Ver tarefas públicas? <a href="/public-tasks">Clique aqui</a>
      </p>
      <button onClick={handleLogout} className="logout-button">Sair</button> {/* Botão de Sair */}
    </div>
  );
}

export default Dashboard;