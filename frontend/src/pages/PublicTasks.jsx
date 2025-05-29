import React, { useEffect, useState } from 'react';
import api from '../services/api';
import TaskItem from '../components/TaskItem';

export default function PublicTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    api.get('/public-tasks')
      .then(res => setTasks(res.data))
      .catch(console.error);
  }, []);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Public Tasks</h2>
      {tasks.length === 0
        ? <p>No public tasks found.</p>
        : tasks.map(task => <TaskItem key={task._id} task={task} />)
      }
    </div>
  );
}
