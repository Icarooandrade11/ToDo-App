import React from 'react';

export default function TaskItem({ task, onToggle, onDelete }) {
  return (
    <div className="bg-white p-4 rounded shadow flex justify-between items-center">
      <span
        onClick={() => onToggle && onToggle(task)}
        className={task.completed ? 'line-through text-gray-500 cursor-pointer' : 'cursor-pointer'}
      >
        {task.title}
      </span>
      {onDelete && (
        <button onClick={() => onDelete(task._id)} className="text-red-600">
          Delete
        </button>
      )}
    </div>
  );
}
