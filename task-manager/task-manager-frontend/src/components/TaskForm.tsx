import React, { useState } from 'react';
import { TaskFormData } from '../types/task';
import api from '../hooks/useApi';

interface TaskFormProps {
  onTaskAdded: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({ onTaskAdded }) => {
  const [formData, setFormData] = useState<TaskFormData>({
    title: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('/tasks/', formData);
      setFormData({ title: '', description: '' });
      onTaskAdded(); // Refresh task list
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        value={formData.title}
        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        placeholder="Task title"
        required
      />
      <textarea
        value={formData.description}
        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
        placeholder="Description (optional)"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;