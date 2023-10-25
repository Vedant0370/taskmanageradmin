import React, { useState, useEffect } from 'react';
import { BiUserCircle } from 'react-icons/bi';
import Header from '../Header/Header';

const CreateTask = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: '',
    teamMember: '',
    teamMemberId: '', // Added teamMemberId property
  });

  const [users, setUsers] = useState([]);
  const [isUserListOpen, setIsUserListOpen] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://taskmanager-ytz6.onrender.com/api/employeelist');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUserClick = (user) => {
    setFormData({ ...formData, teamMember: user.name, teamMemberId: user._id }); // Added teamMemberId
    setIsUserListOpen(false);
  };

  const handleSubmit = async (e) => {
    // e.preventDefault();

    try {
      const response = await fetch('https://taskmanager-ytz6.onrender.com/api/myteamtask', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      // Task saved successfully
      console.log('Task saved successfully');
      alert('Task saved successfully')
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  return (
    <>
      <Header />
      <div className='flex justify-center min-h-screen bg-gray-200'>
        <div className='w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl h-3/4 mt-20'>
          <div className='max-w-md mx-auto space-y-6'>
            <form onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold">Add new task for team</h2>
              <p className="my-4 opacity-70">
                Add a new task to help you keep track of your responsibilities and improve your organization.
              </p>
              <hr className="my-4" />

              <label className="uppercase text-sm font-bold opacity-70">Title</label>
              <input
                type="text"
                className="p-1 mt-2 mb-4 w-full bg-slate-200 rounded border-2 border-slate-200 focus:border-slate-600 focus:outline-none"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />

              <label className="uppercase text-sm font-bold opacity-70">Description</label>
              <textarea
                rows={4}
                type="text"
                className="p-1 mt-2 mb-4 w-full bg-slate-200 rounded"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />


              <label className="uppercase text-sm font-bold opacity-70">Priority</label>
              <select
                className="p-1 mt-2 mb-4 w-full bg-slate-200 h-auto rounded"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                required
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>

              <div className="flex items-center relative">
                <label className="uppercase text-sm font-bold opacity-70 mr-2 text-danger fs-5">Select Team Member</label>

                <div className='edit-icon' onClick={() => setIsUserListOpen(!isUserListOpen)}>
                  <h4 className='text-danger fs-5'>
                    <BiUserCircle /></h4>
                </div>
                {isUserListOpen && (
                  <div className="absolute mt-2 p-2 bg-white border border-gray-300 rounded shadow-md">
                    {users.map((user) => (
                      <div
                        key={user._id}
                        className="cursor-pointer"
                        onClick={() => handleUserClick(user)}
                      >
                        <div className='user-profile text-success fw-bold'>

                          <BiUserCircle />{user.name}<hr />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="mt-3 mx-auto block px-4 py-2 rounded-md bg-teal-500 text-white font-bold"
              >
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default CreateTask;
