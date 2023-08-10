import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    fetchTasks();
  }, []);
  
  const displayErrorMessage = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
        setErrorMessage('');
    }, 1000);
};
  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  

  const addTask = async () => {
    if (newTask.trim() === '') return;
    try {
      const response = await axios.post('/api/tasks/add', { title: newTask, completed: false });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      displayErrorMessage('Data is already present in list');
    }
  };

  const removeTaskFromFrontend = (taskId) => {
    setTasks(tasks.filter(task => task._id !== taskId));
  };
  
  

  const deleteTask = async (taskId) => {
    try {
      removeTaskFromFrontend(taskId); 
      await axios.delete(`/api/tasks/${taskId}`);
      
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  

  return (
    <body>
    <div id="Ma">
      <h1>To-Do List</h1>
      <div id="In">
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={addTask}>Add Task</button>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
</div>
      <ul id="ta">
        {tasks.map((task) => (
          <li>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
    </body>
  );
};

export default App;
