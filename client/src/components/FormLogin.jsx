import { useState,useEffect,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { loginService } from "../api/users-service"
import { displayToast } from "../utilities/toast";
import { UserContext } from "../App";

export default function FormLogin({user,setUser}) {
    const [count, setCount] = useState(null);
    const navigate = useNavigate();
    const {currUser,setCurrUser} = useContext(UserContext);
  
    // set a timer to redirect to home page after succesful login
    useEffect(() => {
        if (count !== null){
            const interval = setInterval(() => {
                setCount((currentCount) => currentCount - 1);
            }, 1000);
            count === 0 && navigate("/");
            return () => clearInterval(interval);
        }
    }, [count, navigate]);

    // on form data change setUser to form data
    function handleChange(e){
        let data = {
            ...user,
            [e.target.name]: e.target.value
        }
        setUser(data)
    }

    // on form submit call login service, display a toast, redirect to homepage if response from server is ok
    async function handleSubmit(e) {
        e.preventDefault();
        const data = user
        try {
          const res = await loginService(data);
          if (res.token) {
            displayToast(`User ${res.user} has logged in .`)
            setCount(3)
            localStorage.setItem("token", res.token)
            setCurrUser({...currUser, token: res.token})
          } else {
            displayToast(`Login unsuccesful.`)
            displayToast(`Error: ${res.error}`)
          }
        } catch (err) {
          console.log(err);
        }
    }

    return (
        <form action="POST" onSubmit={handleSubmit}>
            <h3>Login Form</h3>
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
                />
            </div>
            <div>
                <label htmlFor='password'>
                    <span>Password:</span>
                </label>
                <input
                    type='text'
                    name='password'
                    required
                    maxLength={20}
                    value={user.password}
                    onChange={handleChange}
                />
            </div>
            <button>Submit</button>
        </form>
    )
}