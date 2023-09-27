import { useContext } from "react";
import { useNavigate } from "react-router-dom"
import { UserContext } from "../App";


export default function BtnLogout(){

    const navigate = useNavigate();
    const {currUser,setCurrUser} = useContext(UserContext);

    // on click: clear localstorage, clear context, redirect to home
    function handleLogout(){
        localStorage.clear("username")
        localStorage.clear("token")
        const data = {username:null, token:null}
        setCurrUser(data)
        navigate("/")
    }
    
    return(
        <div>
            <button onClick={handleLogout}>Logout</button>
        </div>
    )
}