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
      <div className="min-h-screen bg-[#f4faee]"> {/* light pistachio background */}
        <AppBars />

        <div className="container mx-auto px-4 py-10">
          <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-2xl p-8 border border-[#d9f1d1]">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-[#3b7b4f] mb-2">Study Buddy</h1>
              <p className="text-[#789262]">
                Welcome back, <span className="font-semibold">{user?.email}</span>! Manage your tasks efficiently.
              </p>
            </div>

            <div className="mb-6">
              <TaskForm onAddTask={addTask} />
            </div>

            <div className="mb-6">
              <TaskList
                tasks={tasks}
                onToggleComplete={toggleTaskComplete}
                onDeleteTask={handleDeleteTask}
                onEditTask={handleEditTask}
              />
            </div>

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
