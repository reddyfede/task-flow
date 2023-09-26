import { useState } from "react"
import { signupService } from "../api/users-service"
import { Slide, ToastContainer, toast } from 'react-toastify';
import { displayToast } from "../utilities/toast";

export default function Signup() {

    const [user,setUser] = useState({
        username : "",
        firstName : "",
        lastName : "",
        role : "E",
        password : ""
    })

    function handleChange(e){
        let data = {
            ...user,
            [e.target.name]: e.target.value
        }
        setUser (data)
    }

    async function handleSubmit(e) {
        e.preventDefault();
        const data = user
        try {
          const res = await signupService(data);
          if (res.token) {
            displayToast(`User ${user.username} has been created.`)
          } else {
            displayToast(`Something went wrong. User ${user.username} has not been created.`)
          }
        } catch (err) {
          console.log(err);
        }
    }

    return (
        <div>
            <ToastContainer transition={Slide} />
            <form action="POST" onSubmit={handleSubmit}>
                <h3>Signup Form</h3>
                <div>
                    <label  htmlFor='username'>
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
                    <label  htmlFor='firstName'>
                        <span>First Name:</span>
                    </label>
                    <input
                        type='text'
                        name='firstName'
                        required
                        maxLength={20}
                        value={user.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label  htmlFor='lastName'>
                        <span>Last Name:</span>
                    </label>
                    <input
                        type='text'
                        name='lastName'
                        required
                        maxLength={20}
                        value={user.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label  htmlFor='role'>
                        <span>Role:</span>
                    </label>
                    <select
                        name='role'
                        required
                        value={user.role}
                        onChange={handleChange}
                    >
                        <option value="E">Employee</option>
                        <option value="M">Manager</option>
                    </select>
                </div>
                <div>
                    <label  htmlFor='passwprd'>
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
        </div>
    )
}