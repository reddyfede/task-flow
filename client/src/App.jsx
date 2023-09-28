import './App.css';
import React, { useEffect, useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  Home,
  PageNotFound,
  Signup,
  Login,
  ManagerPage,
  EmployeePage,
} from './pages';
import { Header } from './components';
import GanttView from './components/GanttView';
import ManageTasks from './components/ManageTasks';

const UserContext = createContext();

function App() {
  const [currUser, setCurrUser] = useState({
    username: localStorage.getItem('username') || null,
    token: localStorage.getItem('token') || null,
    role: localStorage.getItem('role') || null,
    id: localStorage.getItem('id') || null,
    team: localStorage.getItem('teamId') || null,
  });

  return (
    <div>
      <UserContext.Provider value={{ currUser, setCurrUser }}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/manager' element={<ManagerPage />} />
          <Route path='/manager/gantt' element={<GanttView />} />
          <Route path='/manager/tasks' element={<ManageTasks />} />
          <Route path='/employee' element={<EmployeePage />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </UserContext.Provider>
    </div>
  );
}

export default App;
export { UserContext };
