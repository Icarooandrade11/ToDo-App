import React, { useEffect, useState, useCallback } from 'react';
import api from '../services/api.js';
import TaskCard from '../components/TaskCard.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import './Dashboard.css'; // Certifique-se que o caminho está correto

function Dashboard() {
  const [tarefas, setTarefas] = useState([]);
  const [novaTarefa, setNovaTarefa] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novaPublico, setNovaPublico] = useState(false);
  const [novoPrazo, setNovoPrazo] = useState('');
  const [filtroStatus, setFiltroStatus] = useState('todos');
  const [currentEditingTask, setCurrentEditingTask] = useState(null); // Armazena a tarefa sendo editada

  const { user, logout } = useAuth();
  // Não precisamos mais do 'token' diretamente aqui, o interceptor do 'api.js' já cuida disso.
  // const token = localStorage.getItem('token'); // Pode remover esta linha

  // Função para buscar tarefas - usa useCallback para evitar recriação desnecessária
  const fetchTarefas = useCallback(async () => {
    try {
      
      const res = await api.get('/tasks');
      setTarefas(res.data);
    } catch (err) {
      console.error('Erro ao carregar tarefas:', err.response ? err.response.data : err.message);
      // Se for um erro de autenticação (401/403), força o logout
      if (err.response && (err.response.status === 401 || err.response.status === 403)) {
        alert('Sua sessão expirou ou você não tem permissão. Por favor, faça login novamente.');
        logout();
      } else {
        alert('Erro ao carregar tarefas.');
      }
    }
  }, [logout]); // Dependência: logout (para garantir que a função está atualizada)

  // useEffect para carregar tarefas na montagem do componente
  useEffect(() => {
    fetchTarefas();
  }, [fetchTarefas]); // Dependência: fetchTarefas

  // --- Função para alternar status (concluído/pendente) ---
  const handleToggleStatus = async (id) => {
    try {
      // Busca a tarefa atual no state
      const tarefaAtual = tarefas.find(t => t._id === id);
      if (!tarefaAtual) return;

      // Envia o toggle para o backend
      const res = await api.put(`/tasks/${id}`, {
        // o backend espera o campo 'completed'
        completed: !tarefaAtual.completed
      });

      // Atualiza o state local
      setTarefas(prev =>
        prev.map(t => (t._id === id ? res.data : t))
      );

      // ➡️ aqui: muda automaticamente o filtro para "concluídos"
      setFiltroStatus('concluidos');
    } catch (err) {
      console.error('Erro ao alternar status:', err.response?.data || err);
      alert('Não foi possível alternar o status.');
    }
  };
  // --- Função para iniciar edição ---
  const handleEditClick = (tarefa) => {
    setCurrentEditingTask(tarefa);
    setNovaTarefa(tarefa.title);
    setNovaDescricao(tarefa.description || ''); // Garante que seja string, mesmo se nulo
    setNovaPublico(tarefa.public || false);
    // Formata a data para 'YYYY-MM-DD' para o input type="date"
    setNovoPrazo(tarefa.deadline ? new Date(tarefa.deadline).toISOString().split('T')[0] : '');
  };

  // --- Função para excluir tarefa ---
  const handleDeleteTask = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir esta tarefa?')) {
      return; // Cancela se o usuário não confirmar
    }

    try {
      await api.delete(`/tasks/${id}`);

      // Remove a tarefa do estado local
      setTarefas(prevTarefas => prevTarefas.filter(t => (t.id !== id && t._id !== id)));
      alert('Tarefa excluída com sucesso!');
    } catch (error) {
      console.error('Erro ao excluir tarefa:', error.response ? error.response.data : error.message);
      alert('Erro ao excluir tarefa.');
    }
  };


  // --- Função para adicionar/editar tarefa (handleSaveTask) ---
  const handleSaveTask = async (e) => {
    e.preventDefault();
    if (!novaTarefa.trim()) {
      alert('O título da tarefa é obrigatório!');
      return;
    }

    const taskData = {
      title: novaTarefa,
      description: novaDescricao,
      public: novaPublico,
      deadline: novoPrazo ? new Date(novoPrazo) : null // Converte para Date
    };

    try {
      let res;
      if (currentEditingTask) { // Se estiver editando
      
        res = await api.put(`/tasks/${currentEditingTask.id || currentEditingTask._id}`, taskData);
        setTarefas(prevTarefas => prevTarefas.map(t =>
          (t.id === (currentEditingTask.id || currentEditingTask._id)) ? res.data : t
        ));
        setCurrentEditingTask(null); // Sai do modo de edição
      } else { // Se estiver adicionando
        // Endpoint correto: /tasks (conforme verificado no backend server.js)
        res = await api.post('/tasks', taskData);
        setTarefas((prevTarefas) => [...prevTarefas, res.data]);
      }

      // Limpa os campos do formulário
      setNovaTarefa('');
      setNovaDescricao('');
      setNovaPublico(false);
      setNovoPrazo('');
      alert(`Tarefa ${currentEditingTask ? 'editada' : 'adicionada'} com sucesso!`);
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error.response ? error.response.data : error.message);
      alert(`Erro ao ${currentEditingTask ? 'editar' : 'adicionar'} tarefa.`);
    }
  };

  // --- Filtragem de tarefas (Frontend) ---
  const tarefasFiltradas = tarefas.filter(t => {
    if (filtroStatus === 'todos')      return true;
    if (filtroStatus === 'pendentes')  return !t.completed;
    if (filtroStatus === 'concluidos') return t.completed;
    return true;
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="dashboard-container">
      <h2>Olá, {user?.name || 'Usuário'}! Suas Tarefas</h2>

      {/* --- Formulário de Nova Tarefa / Edição --- */}
      <form onSubmit={handleSaveTask} className="task-form">
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
          rows="3"
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
              key={tarefa.id || tarefa._id}
              tarefa={tarefa} // Passa o objeto completo da tarefa
              onToggleStatus={handleToggleStatus}
              onEdit={handleEditClick} // Passa a função para editar
              onDelete={handleDeleteTask} // Passa a função para excluir
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