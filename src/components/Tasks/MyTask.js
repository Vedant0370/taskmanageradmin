import React, { useState } from 'react';
import Header from '../Header/Header';

const MyTask = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        // e.preventDefault();

        try {
            const response = await fetch('https://taskmanager-ytz6.onrender.com/api/mytask', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (response.ok) {
                console.log('Task created successfully!');
                alert('Task created successfully!')
                // Optionally, you can redirect to another page here
            } else {
                console.error('Error creating task:', response.statusText);
                alert('Error creating task')
            }
        } catch (error) {
            console.error('Error creating task:', error);
        }
    };

    return (
        <>
            <Header />
            <div className='flex justify-center min-h-screen bg-gray-200'>
                <div className='w-full max-w-lg px-10 py-8 mx-auto bg-white rounded-lg shadow-xl h-3/4 mt-20'>
                    <div className='max-w-md mx-auto space-y-6'>
                        <form onSubmit={handleSubmit}>
                            <h2 className="text-2xl font-bold ">Add new task</h2>
                            <p className="my-4 opacity-70">Add a new task to help you keep track of your responsibilities and improve your organization.</p>
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
                            <button type="submit" className="mt-3 mx-auto block px-4 py-2 rounded-md bg-teal-500 text-white font-bold">Save</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MyTask;
