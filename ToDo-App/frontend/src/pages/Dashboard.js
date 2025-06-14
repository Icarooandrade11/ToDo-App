import React, { useEffect, useState, useCallback } from 'react'; // Adicione useCallback
import api from '../services/api.js';
import TaskCard from '../components/TaskCard.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import './Dashboard.css';

function Dashboard() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState(''); // Para o título da nova tarefa
  const [novaDescricao, setNovaDescricao] = useState(''); // Novo: para descrição
  const [novaPublico, setNovaPublico] = useState(false); // Novo: para privacidade
  const [novoPrazo, setNovoPrazo] = useState(''); // Novo: para prazo
  const [filtroStatus, setFiltroStatus] = useState('todos'); // Novo: para o filtro
  const [currentEditingTask, setCurrentEditingTask] = useState(null); // Novo: para estado de edição

  const { user, logout } = useAuth();
  const token = localStorage.getItem('token');

  // Função para buscar tarefas (usada no useEffect e após certas operações)
  const fetchTarefas = useCallback(async () => {
    if (!token) {
      logout();
      return;
    }
    try {
      const res = await api.get('/api/tasks');
      setTarefas(res.data);
    } catch (err) {
      console.error('Erro ao carregar tarefas:', err);
      // alert('Erro ao carregar tarefas. Por favor, faça login novamente.'); // Remova ou refine este alert
      logout(); // Força o logout se houver erro de autenticação na busca
    }
  }, [logout, token]);

  useEffect(() => {
    fetchTarefas();
  }, [fetchTarefas]); // fetchTarefas como dependência para garantir que roda quando a função muda

  // --- Função para alternar status (concluído/pendente) ---
  const handleToggleStatus = async (id) => {
    try {
      const tarefaAtual = tarefas.find(t => t.id === id || t._id === id); // Usa id ou _id
      if (!tarefaAtual) return;

      const res = await api.put(`/api/tasks/${id || tarefaAtual._id}`, {
        concluida: !tarefaAtual.concluida // Alterna o status
      });

      // Atualiza o estado local para refletir a mudança
      setTarefas(tarefas.map(t =>
        (t.id === id || t._id === id) ? res.data : t
      ));
    } catch (error) {
      console.error('Erro ao alternar status da tarefa:', error);
      alert('Erro ao alternar status da tarefa.');
    }
  };

  // --- Função para adicionar/editar tarefa (handleSaveTask) ---
  const handleSaveTask = async (e) => {
    e.preventDefault();
    if (!novaTarefa.trim()) return; // Validação mínima para o título

    const taskData = {
      titulo: novaTarefa,
      descricao: novaDescricao,
      publico: novaPublico,
      prazo: novoPrazo ? new Date(novoPrazo) : null // Converte para Date
    };

    try {
      let res;
      if (currentEditingTask) { // Se estiver editando
        res = await api.put(`/api/tasks/${currentEditingTask.id || currentEditingTask._id}`, taskData);
        setTarefas(tarefas.map(t =>
          (t.id === (currentEditingTask.id || currentEditingTask._id)) ? res.data : t
        ));
        setCurrentEditingTask(null); // Sai do modo de edição
      } else { // Se estiver adicionando
        res = await api.post('/api/tasks', taskData);
        setTarefas((prevTarefas) => [...prevTarefas, res.data]);
      }

      // Limpa os campos do formulário
      setNovaTarefa('');
      setNovaDescricao('');
      setNovaPublico(false);
      setNovoPrazo('');
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      alert('Erro ao salvar tarefa.');
    }
  };

  // --- Função para excluir tarefa (handleDeleteTask) --- (Próxima Seção)
  // ...

  // --- Função para iniciar edição (handleEditClick) --- (Próxima Seção)
  // ...

  // --- Filtragem de tarefas (Frontend) ---
  const tarefasFiltradas = tarefas.filter(tarefa => {
    if (filtroStatus === 'todos') return true;
    if (filtroStatus === 'pendentes') return !tarefa.concluida;
    if (filtroStatus === 'concluidos') return tarefa.concluida;
    return true;
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <h2>Olá, {user?.name || 'Usuário'}! Suas Tarefas</h2>

      {/* --- Formulário de Nova Tarefa / Edição --- */}
      <form onSubmit={handleSaveTask} className="task-form"> {/* Alterado de new-task-form */}
        <input
          type="text"
          placeholder="Título da tarefa"
          value={novaTarefa}
          onChange={(e) => setNovaTarefa(e.target.value)}
          required
        />
        <textarea
          placeholder="Descrição (opcional)"
          value={novaDescricao}
          onChange={(e) => setNovaDescricao(e.target.value)}
          rows="3" // Adicionado para melhor visualização
        ></textarea>
        <div className="form-group">
          <label>
            <input
              type="checkbox"
              checked={novaPublico}
              onChange={(e) => setNovaPublico(e.target.checked)}
            />
            Tarefa Pública
          </label>
        </div>
        <div className="form-group">
          <label htmlFor="prazo">Prazo:</label>
          <input
            id="prazo"
            type="date"
            value={novoPrazo}
            onChange={(e) => setNovoPrazo(e.target.value)}
          />
        </div>
        <button type="submit">{currentEditingTask ? 'Salvar Edição' : 'Adicionar Tarefa'}</button>
        {currentEditingTask && (
          <button type="button" onClick={() => {
            setCurrentEditingTask(null);
            setNovaTarefa('');
            setNovaDescricao('');
            setNovaPublico(false);
            setNovoPrazo('');
          }}>Cancelar</button>
        )}
      </form>

      {/* --- Filtro por Status --- */}
      <div className="filter-buttons">
        <button
          className={filtroStatus === 'todos' ? 'active' : ''}
          onClick={() => setFiltroStatus('todos')}
        >
          Todos
        </button>
        <button
          className={filtroStatus === 'pendentes' ? 'active' : ''}
          onClick={() => setFiltroStatus('pendentes')}
        >
          Pendentes
        </button>
        <button
          className={filtroStatus === 'concluidos' ? 'active' : ''}
          onClick={() => setFiltroStatus('concluidos')}
        >
          Concluídos
        </button>
      </div>

      {/* --- Lista de Tarefas --- */}
      <div className="task-list">
        {tarefasFiltradas.length > 0 ? (
          tarefasFiltradas.map((tarefa) => (
            <TaskCard
              key={tarefa.id || tarefa._id} // Usa id ou _id (MongoDB) para a key
              tarefa={tarefa} // Passa o objeto completo da tarefa
              onToggleStatus={handleToggleStatus}
              // onEdit e onDelete serão passados em próximas seções
            />
          ))
        ) : (
          <p>Nenhuma tarefa adicionada ainda.</p>
        )}
      </div>

      <p className="dashboard-links">
        Ver tarefas públicas? <a href="/public-tasks">Clique aqui</a>
      </p>
      <button onClick={handleLogout} className="logout-button">Sair</button>
    </div>
  );
}

export default Dashboard;