import { useState,useEffect,useContext } from "react";
import { useNavigate } from 'react-router-dom';
import { loginService } from "../api/users-service"
import { displayToast } from "../utilities/toast";
import { UserContext } from "../App";

export default function FormLogin({user,setUser}) {
    const [count, setCount] = useState(null);
    const navigate = useNavigate();
    const {currUser,setCurrUser} = useContext(UserContext);
    const [loading, setLoading] = useState(false)    

    // set a timer to redirect to home page after succesful login
    useEffect(() => {
        if (count !== null){
            const interval = setInterval(() => {
                setCount((currentCount) => currentCount - 1);
            }, 1000);
            let navigateTo ="/"
            if (currUser.role === "M"){
                navigateTo = "/manager"
            }
            if (currUser.role === "E"){
                navigateTo = "/employee"
            }
            count === 0 && navigate(navigateTo);
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

    ////
    // on form submit: call login service,
    // on response: display a toast
    // if response is ok: set token in localstorage, set token in usercontext, redirect to homepage
    ////
    async function handleSubmit(e) {
        e.preventDefault();
        const data = user
        try {
          const res = await loginService(data);
          if (res.token) {
            setLoading(true)
            displayToast(`User ${res.user} has logged in .`)
            localStorage.setItem("username", res.user)
            localStorage.setItem("token", res.token)
            localStorage.setItem("role", res.role)
            localStorage.setItem("id", res.id)
            setCurrUser({username:res.user, token: res.token, role:res.role, id: res.id})
            setCount(2)
          } else {
            setLoading(false)
            displayToast(`Login unsuccesful.`)
            displayToast(`Error: ${res.error}`)
          }
        } catch (err) {
          console.log(err);
        }
    }

    return (
        <form action="POST" onSubmit={handleSubmit} >
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
                    disabled={loading}
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
                    disabled={loading}
                />
            </div>
            <button disabled={loading}>Submit</button>
        </form>
    )
}