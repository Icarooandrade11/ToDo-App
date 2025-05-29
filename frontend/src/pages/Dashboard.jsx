import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./Dashboard.css";

export default function Dashboard() {
  const { user, logout } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [visibility, setVisibility] = useState("private");

  // Busca tarefas do servidor
  const fetchTasks = () => {
    const token = localStorage.getItem("token");
    api
      .get("/tasks", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => setTasks(res.data))
      .catch(() => {});
  };

  useEffect(fetchTasks, []);

  // Cria nova tarefa
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title) return;

    const token = localStorage.getItem("token");
    api
      .post(
        "/tasks",
        { title, visibility },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setTitle("");
        setVisibility("private");
        fetchTasks();
      });
  };

  // Alterna completo/incompleto
  const handleToggle = (task) => {
    const token = localStorage.getItem("token");
    api
      .put(
        `/tasks/${task._id}`,
        { ...task, completed: !task.completed },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(fetchTasks);
  };

  // Deleta tarefa
  const handleDelete = (id) => {
    const token = localStorage.getItem("token");
    api
      .delete(`/tasks/${id}`, { headers: { Authorization: `Bearer ${token}` } })
      .then(fetchTasks);
  };

  // Reordena a lista
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newTasks = Array.from(tasks);
    const [moved] = newTasks.splice(result.source.index, 1);
    newTasks.splice(result.destination.index, 0, moved);
    setTasks(newTasks);

    // Atualiza no servidor (opcional)
    const token = localStorage.getItem("token");
    api
      .put(
        "/tasks/reorder",
        { orderedIds: newTasks.map((t) => t._id) },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .catch(() => {});
  };

  return (
    // Adicionei um wrapper para o fundo -> disgne feito pelo canva!
    <div className="dashboard-background">
      <div className="dashboard-container">
        <header className="dashboard-header">
          <h2>Olá, {user.name}</h2>
          <button onClick={logout}>Sair</button>
        </header>

        <form onSubmit={handleSubmit} className="task-form">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Nova tarefa"
          />
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
          >
            <option value="private">Privada</option>
            <option value="public">Pública</option>
          </select>
          <button type="submit">Adicionar</button>
        </form>

        {tasks.length === 0 && (
          <p className="no-tasks">Nenhuma tarefa cadastrada.</p>
        )}

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="tasks">
            {(provided) => (
              <ul
                className="tasks-list"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {tasks.map((task, index) => (
                  <Draggable
                    key={task._id}
                    draggableId={task._id}
                    index={index}
                  >
                    {(prov, snapshot) => (
                      <li
                        ref={prov.innerRef}
                        {...prov.draggableProps}
                        {...prov.dragHandleProps}
                        className={`task-item ${task.completed ? "completed" : ""} ${
                          snapshot.isDragging ? "dragging" : ""
                        }`}
                      >
                        <span className="title">{task.title}</span>
                        <div>
                          <button
                            className="toggle"
                            onClick={() => handleToggle(task)}
                          >
                            {task.completed ? "↺" : "✓"}
                          </button>
                          <button onClick={() => handleDelete(task._id)}>✕</button>
                        </div>
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
}