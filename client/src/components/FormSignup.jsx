import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { signupService } from '../api/users-service';
import { displayToast } from '../utilities/toast';
import { UserContext } from '../App';

export default function FormSignup({ user, setUser }) {
  const [count, setCount] = useState(null);
  const navigate = useNavigate();
  const { currUser, setCurrUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  // set a timer to redirect to login page after succesful signup
  useEffect(() => {
    if (count !== null) {
      const interval = setInterval(() => {
        setCount((currentCount) => currentCount - 1);
      }, 1000);
      count === 0 && navigate('/login');
      return () => clearInterval(interval);
    }
  }, [count, navigate]);

  // on form data change setUser to form data
  function handleChange(e) {
    let data = {
      ...user,
      [e.target.name]: e.target.value,
    };
    setUser(data);
  }

  ////
  // on form submit: call signup service,
  // on response: display a toast
  // if response is ok: set username in localstorage, set username in usercontext, redirect to login
  ////
  async function handleSubmit(e) {
    e.preventDefault();
    const data = user;
    try {
      const res = await signupService(data);
      if (!res.error) {
        setLoading(true);
        displayToast(`User ${res.user} has been created.`, 'success');
        localStorage.setItem('username', res.user);
        setCurrUser({ ...currUser, username: res.user });
        setCount(2);
      } else {
        setLoading(false);
        console.log(res);
        displayToast(`User ${res.user} has NOT been created.`, 'error');
        if (res.error?.username) {
          displayToast(res.error.username[0], 'error');
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form action='POST' onSubmit={handleSubmit}>
      <h3>Signup Form</h3>
      <div>
        <label htmlFor='username'>
          <span>Username:</span>
        </label>
        <input
          type='text'
          name='username'
          required
          maxLength={20}
          value={user.username}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor='firstName'>
          <span>First Name:</span>
        </label>
        <input
          type='text'
          name='firstName'
          required
          maxLength={20}
          value={user.firstName}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor='lastName'>
          <span>Last Name:</span>
        </label>
        <input
          type='text'
          name='lastName'
          required
          maxLength={20}
          value={user.lastName}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <label htmlFor='role'>
          <span>Role:</span>
        </label>
        <select
          name='role'
          required
          value={user.role}
          onChange={handleChange}
          disabled={loading}
        >
          <option value='E'>Employee</option>
          <option value='M'>Manager</option>
        </select>
      </div>
      <div>
        <label htmlFor='password'>
          <span>Password:</span>
        </label>
        <input
          type='password'
          name='password'
          required
          maxLength={20}
          value={user.password}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <button disabled={loading}>Submit</button>
    </form>
  );
}
