import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { BiSolidEdit } from 'react-icons/bi';
import { AiFillDelete } from 'react-icons/ai';
import './ViewMyTask.css';

const ViewMyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTask, setEditedTask] = useState({});

  useEffect(() => {
    fetch('https://taskmanager-ytz6.onrender.com/api/mytask')
      .then(response => response.json())
      .then(data => setTasks(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await fetch(`https://taskmanager-ytz6.onrender.com/api/mytask/${taskId}`, {
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

  const handleEditTask = (task) => {
    setEditedTask(task);
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      const response = await fetch(`https://taskmanager-ytz6.onrender.com/api/mytask/${editedTask._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editedTask),
      });

      if (response.ok) {
        // Update the edited task in the state
        setTasks(prevTasks =>
          prevTasks.map(task =>
            task._id === editedTask._id ? editedTask : task
          )
        );
        setIsEditing(false);
      } else {
        console.error('Error updating task:', response.status);
      }
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <>
      <Header />
      <div className="task-container">
        {tasks.map((task, index) => (
          <div className="task-card fw-bold fs-5" key={task._id}>
            <h2>Task {index + 1} : {task.title}</h2>
            <p>Description : {task.description}</p>
            {/* <p>Priority: {task.priority}</p>
            <p>Assigned to: {task.teamMember}</p>
            <p>Status: </p> */}
            <div className='edit-icon'>
              <h4 className='text-danger' onClick={() => handleEditTask(task)}>
                <BiSolidEdit />
              </h4>
              <h4 className='text-danger' onClick={() => handleDeleteTask(task._id)}>
                <AiFillDelete />
              </h4>
            </div>
          </div>
        ))}
      </div>
      {isEditing && (
        <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded shadow-lg">
            <h2 className="text-2xl font-bold mb-2">Edit Task</h2>
            <input
              type="text"
              value={editedTask.title}
              onChange={(e) => setEditedTask({ ...editedTask, title: e.target.value })}
              className="w-full p-2 mb-2 border border-gray-300 rounded"
            />
            <textarea
              value={editedTask.description}
              onChange={(e) => setEditedTask({ ...editedTask, description: e.target.value })}
              rows="4"
              className="w-full p-2 mb-4 border border-gray-300 rounded"
            />
            <button onClick={handleSave} className="px-4 py-2 bg-blue-500 text-white rounded">Save</button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 ml-2 bg-red-500 text-white rounded">Cancel</button>
          </div>
        </div>
      )}
    </>
  );
}

export default ViewMyTask;
