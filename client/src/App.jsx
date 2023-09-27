import './App.css';
import React, { useEffect, useState, createContext } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Home, PageNotFound, Signup, Login } from './pages';
import { Header } from './components';

const UserContext = createContext()

function App() {

  const [currUser, setCurrUser] = useState({ username: null, token: null })

  return (
    <div>
      <UserContext.Provider value={currUser}>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/*' element={<PageNotFound />} />
        </Routes>
      </UserContext.Provider>
    </div >
  )
}

export default App;
export { UserContext }

