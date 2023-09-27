import { useState } from "react"
import { Slide, ToastContainer, toast } from 'react-toastify';
import { FormLogin } from "../components";

export default function Login() {
    let username = ""
    if (localStorage.username){
        username = localStorage.username
    }

    const [user,setUser] = useState({
        username : username,
        password : ""
    })

    return (
        <div>
            <h1>Login Page</h1>
            <ToastContainer transition={Slide} />
            <FormLogin user={user} setUser={setUser}/>
        </div>
    )
}