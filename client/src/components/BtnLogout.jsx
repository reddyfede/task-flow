import { useContext } from "react";
import { Link } from "react-router-dom"
import { UserContext } from "../App";


export default function BtnLogout(){

    const {currUser,setCurrUser} = useContext(UserContext);

    // on click: clear localstorage and clear context
    function handleLogout(){
        localStorage.clear("username")
        localStorage.clear("token")
        data = {username:null, token:null}
        setCurrUser(data)
    }
    
    return(
        <div>
            <Link onClick={handleLogout}>Logout</Link>
        </div>
    )
}