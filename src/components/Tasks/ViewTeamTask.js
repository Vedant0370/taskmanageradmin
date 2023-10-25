import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import './ViewTeamTask.css'; // Import your CSS file
import {AiFillDelete} from 'react-icons/ai'

const ViewTeamTask = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch('https://taskmanager-ytz6.onrender.com/api/myteamtask')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://taskmanager-ytz6.onrender.com/api/myteamtask/${taskId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        // Remove the deleted task from the state
        setTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
      } else {
        console.error('Error deleting task:', response.status);
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };


  return (
    <>
      <Header />
     
      <div className="task-container">
      {tasks.map((task, index) => (
          <div className="task-card fw-bold fs-5" key={task._id}>
            <h2>Task {index + 1}: {task.title}</h2>
            <p>Description :{task.description}</p>
            <p>Priority: {task.priority}</p>
            <p>Assigned to: {task.teamMember}</p>
            <p>Status: </p>
            <div className='edit-icon'>
               
                 <h4 className='text-danger' onClick={() => handleDeleteTask(task._id)}>
                <AiFillDelete />
                </h4>
                
                </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ViewTeamTask;
