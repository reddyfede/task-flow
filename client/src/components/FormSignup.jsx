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
    <form className='form' action='POST' onSubmit={handleSubmit}>
      <h3>Signup Form</h3>
      <div>
        <label className='form-label' htmlFor='username'>
          <span>Username:</span>
        </label>
        <input
          className='form-input'
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
        <label className='form-label' htmlFor='first_name'>
          <span>First Name:</span>
        </label>
        <input
          className='form-input'
          type='text'
          name='first_name'
          required
          maxLength={20}
          value={user.first_name}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <label className='form-label' htmlFor='last_name'>
          <span>Last Name:</span>
        </label>
        <input
          className='form-input'
          type='text'
          name='last_name'
          required
          maxLength={20}
          value={user.last_name}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <div>
        <label className='form-label' htmlFor='role'>
          <span>Role:</span>
        </label>
        <select
          className='form-select'
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
        <label className='form-label' htmlFor='password'>
          <span>Password:</span>
        </label>
        <input
          className='form-input'
          type='password'
          name='password'
          required
          maxLength={20}
          value={user.password}
          onChange={handleChange}
          disabled={loading}
        />
      </div>
      <button className='btn' disabled={loading}>
        Submit
      </button>
    </form>
  );
}
