import './App.css';
import { Route, Routes } from 'react-router-dom';
import { Home, PageNotFound, Signup, Login } from './pages';
import { Header } from './components';

function App() {
  return (
    <div>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        <Route path='/*' element={<PageNotFound />} />
      </Routes>
    </div>
  )
}

export default App;
