// Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaSignInAlt, FaSignOutAlt, FaTasks } from 'react-icons/fa';
import { IoIosCreate } from 'react-icons/io';
import { AiOutlineMenu } from 'react-icons/ai';
import { MdTask } from 'react-icons/md';
import './Header.css';

const Header = () => {


  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  }

  const handleLogout = () => {
    // Clear user data from local storage
    localStorage.removeItem('user');
    // Redirect to login page
    window.location.href = '/';
  };


  const user = "abc"; // Replace with actual user data

  return (
    <>
    <nav className="bg-teal-500 p-6 navbar">
      <div className="container mx-auto flex items-center justify-between flex-wrap">

        <Link to='/home' className='text-white font-semibold text-lg flex items-center mr-6 hover:opacity-80'>
          <MdTask className='mr-2' /> Task Management
        </Link>
        <div className="md:hidden">
          <AiOutlineMenu className="menu-icon" onClick={toggleMenu} />
        </div>
        <div className={`menu md:flex md:items-center w-auto ${isOpen ? 'block' : 'hidden'}`}>
          <div className='flex space-x-8'>
            {user ? (
              <div className='mx-4 flex'>
                {/* <button className='text-white text-lg font-bold mr-3'>Welcome, {user} |</button> */}
                <Link to='/my-task' className='text-white font-semibold text-lg flex items-center mx-6 hover:opacity-80'>
                  <FaTasks className='mr-2' /> <Link to={'/my-task'} className='text-white font-semibold text-lg flex items-center  hover:opacity-80'>My Tasks</Link>
                </Link>
                <Link to='/create-task' className='text-white font-semibold text-lg flex items-center mr-6 hover:opacity-80'>
                  <IoIosCreate className='mr-2' /> Create Team Task
                </Link>



                <div class="btn-group">
                  <button type="button" class="btn btn-info dropdown-toggle text-white" data-bs-toggle="dropdown" aria-expanded="false">
                    View All Tasks
                  </button>
                  <ul class="dropdown-menu fw-bold">
                    <li><a class="dropdown-item" ><Link to={'/viewmytask'} className='fw-bold'>My Tasks</Link></a></li>
                    <li><a class="dropdown-item" ><Link to={'/viewteamtask'} className='fw-bold'>Team Tasks</Link></a></li>


                  </ul>
                </div>

                <button className='text-white ms-4 font-semibold text-lg flex items-center hover:opacity-80'
                  onClick={handleLogout}>
                  <FaSignOutAlt className='mr-2' /> Logout
                </button>

              </div>
            ) : (
              <div className='flex space-x-8 mx-4'>
                <Link to='/login' className='text-white font-semibold text-lg flex items-center'>
                  <FaSignInAlt className='mr-2' /> Login
                </Link>
                <Link to='/' className='text-white font-semibold text-lg flex items-center'>
                  <FaUser className='mr-2' /> Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>


    </>
  )
}

export default Header;
