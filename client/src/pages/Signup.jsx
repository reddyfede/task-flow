import { useState } from "react"

export default function Signup() {

    const [user,setUser] = useState({
        username : "",
        first_name : "",
        last_name : "",
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

    function handleSubmit(e){
        e.preventDefault()
        console.log(user)
    }

    return (
        <div>
            <form action="" onSubmit={handleSubmit}>
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
                    <label  htmlFor='first_name'>
                        <span>First Name:</span>
                    </label>
                    <input
                        type='text'
                        name='first_name'
                        required
                        maxLength={20}
                        value={user.first_name}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label  htmlFor='last_name'>
                        <span>Last Name:</span>
                    </label>
                    <input
                        type='text'
                        name='last_name'
                        required
                        maxLength={20}
                        value={user.last_name}
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
                
                <button >Submit</button>
            </form>
        </div>
    )
}