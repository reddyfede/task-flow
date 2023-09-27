import { logoutService } from "../api/users-service"
import { Link } from "react-router-dom"

export default function BtnLogout(){

    
    return(
        <div>
            <Link onClick={logoutService}>Logout</Link>
        </div>
    )
}