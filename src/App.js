import './App.css';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'
import Login from './components/Login/login'
import Register from './components/Register/Register'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import CreateTask from './components/Tasks/CreateTask';
import MyTask from './components/Tasks/MyTask'
import ViewMyTask from './components/Tasks/ViewMyTask'
import ViewTeamTask from './components/Tasks/ViewTeamTask'
import React, { useState, useEffect } from 'react';


const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
   <Router>
    <Routes>
      <Route path='/' element={<Login/>}/>
      <Route path='/register' element={<Register/>}/>
      <Route path='/header' element={<Header/>}/> 
      <Route path='/home' element={<Home/>}/> 
      <Route path='/create-task' element={<CreateTask/>}/> 
      <Route path='/my-task' element={<MyTask/>}/> 
      <Route path='/viewmytask' element={<ViewMyTask/>}/> 
      <Route path='/viewteamtask' element={<ViewTeamTask/>}/> 

    </Routes>
   </Router>
  );
}

export default App;
