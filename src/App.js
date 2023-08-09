import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    // Fetch all tasks from the backend when the component mounts
    fetchTasks();
  }, []);

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
      console.error('Error adding task:', error);
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
    <div>
      <h1>To-Do List</h1>
      <input type="text" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
      <button onClick={addTask}>Add Task</button>
      <ul>
        {tasks.map((task) => (
          <li>
            {task.title}
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
