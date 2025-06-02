// src/app/StudyBuddy/page.js
'use client';
import React, { useState } from 'react';
import AppBars from '../components/AppBars';
import RequireAuth from '../components/RequireAuth';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import EditTaskModal from '../components/EditTaskModal';
import useTaskStorage from '../hooks/useTaskStorage';

export default function StudyBuddyPage() {
  const [editingTask, setEditingTask] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  
  const {
    tasks,
    addTask,
    updateTask,
    deleteTask,
    toggleTaskComplete,
    user
  } = useTaskStorage();

  const handleEditTask = (task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  };

  const handleSaveTask = (updatedTask) => {
    updateTask(updatedTask);
    setEditingTask(null);
    setIsEditModalOpen(false);
  };

  const handleDeleteTask = (taskId) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      deleteTask(taskId);
    }
  };

  return (
    <RequireAuth>
      <div className="min-h-screen bg-gray-50">
        <AppBars />
        
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Task Management</h1>
              <p className="text-gray-600">
                Welcome back, {user?.email}! Manage your tasks efficiently.
              </p>
            </div>

            <TaskForm onAddTask={addTask} />
            
            <TaskList
              tasks={tasks}
              onToggleComplete={toggleTaskComplete}
              onDeleteTask={handleDeleteTask}
              onEditTask={handleEditTask}
            />

            <EditTaskModal
              task={editingTask}
              isOpen={isEditModalOpen}
              onClose={() => {
                setIsEditModalOpen(false);
                setEditingTask(null);
              }}
              onSaveTask={handleSaveTask}
            />
          </div>
        </div>
      </div>
    </RequireAuth>
  );
}