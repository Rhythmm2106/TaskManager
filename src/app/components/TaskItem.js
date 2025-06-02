// src/components/TaskItem.js
'use client';
import React from 'react';

const TaskItem = ({ task, onToggleComplete, onDeleteTask, onEditTask }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString();
  };

  const isOverdue = (dueDate) => {
    if (!dueDate) return false;
    return new Date(dueDate) < new Date() && !task.completed;
  };

  return (
    <div className={`bg-white rounded-lg shadow-md p-4 border-l-4 ${
      task.completed ? 'border-green-500 bg-gray-50' : 
      isOverdue(task.dueDate) ? 'border-red-500' : 'border-blue-500'
    }`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => onToggleComplete(task.id)}
            className="mt-1 h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
          />
          
          <div className="flex-1">
            <h3 className={`font-medium ${
              task.completed ? 'line-through text-gray-500' : 'text-gray-900'
            }`}>
              {task.title}
            </h3>
            
            {task.description && (
              <p className={`text-sm mt-1 ${
                task.completed ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {task.description}
              </p>
            )}
            
            <div className="flex items-center gap-2 mt-2">
              <span className={`text-xs px-2 py-1 rounded border ${getPriorityColor(task.priority)}`}>
                {task.priority.toUpperCase()}
              </span>
              
              {task.dueDate && (
                <span className={`text-xs px-2 py-1 rounded ${
                  isOverdue(task.dueDate) ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                }`}>
                  Due: {formatDate(task.dueDate)}
                </span>
              )}
              
              {isOverdue(task.dueDate) && (
                <span className="text-xs px-2 py-1 rounded bg-red-500 text-white">
                  OVERDUE
                </span>
              )}
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 ml-4">
          <button
            onClick={() => onEditTask(task)}
            className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded hover:bg-blue-50"
          >
            Edit
          </button>
          <button
            onClick={() => onDeleteTask(task.id)}
            className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;