import React from 'react';
import { Task } from '../types/task';
import api from '../hooks/useApi';

interface TaskItemProps {
  task: Task;
  onTaskUpdated: () => void;
}

const TaskItem: React.FC<TaskItemProps> = ({ task, onTaskUpdated }) => {
const toggleCompletion = async () => {
  try {
    await api.put(`/tasks/${task.id}`, { 
      completed: !task.completed  // Send as plain object
    });
    onTaskUpdated(); // Refresh the task list
  } catch (error) {
    console.error('Error updating task:', error);
  }
};

  const deleteTask = async () => {
    try {
      await api.delete(`/tasks/${task.id}`);
      onTaskUpdated();
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <li className={task.completed ? 'completed' : ''}>
      <div className="task-info">
        <h3>{task.title}</h3>
        {task.description && <p>{task.description}</p>}
      </div>
      <div className="task-actions">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={toggleCompletion}
        />
        <button onClick={deleteTask}>Delete</button>
      </div>
    </li>
  );
};

export default TaskItem;