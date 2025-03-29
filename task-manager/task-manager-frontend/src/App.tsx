import React, { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import './styles.css';

const App: React.FC = () => {
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="app">
      <h1>Simple Task Manager</h1>
      <TaskForm onTaskAdded={() => setRefreshKey(prev => prev + 1)} />
      <TaskList key={refreshKey} />
    </div>
  );
};

export default App;