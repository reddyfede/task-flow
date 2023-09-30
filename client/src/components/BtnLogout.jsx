import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../App';

export default function BtnLogout() {
  const navigate = useNavigate();
  const { currUser, setCurrUser } = useContext(UserContext);

  // on click: clear localstorage, clear context, redirect to home
  function handleLogout() {
    localStorage.clear('username');
    localStorage.clear('token');
    setCurrUser({ username: null, token: null, role: null, id: null });
    navigate('/');
  }

  return (
    <div>
      <button onClick={handleLogout} className='btn'>
        Logout
      </button>
    </div>
  );
}
