import React, { useEffect, useState } from 'react';
import { Task } from '../types/task';
import api from '../hooks/useApi';
import TaskItem from './TaskItem';

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks/');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  if (loading) return <div>Loading tasks...</div>;

  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <p>No tasks found. Add one above!</p>
      ) : (
        <ul>
          {tasks.map((task) => (
            <TaskItem 
              key={task.id} 
              task={task} 
              onTaskUpdated={fetchTasks} 
            />
          ))}
        </ul>
      )}
    </div>
  );
};

export default TaskList;