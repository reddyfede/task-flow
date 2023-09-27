import { useContext } from 'react';
import { UserContext } from "../App";

export default function Home(){
    const { currUser } = useContext(UserContext)

    return(
        <div>
            <h1>Home Page</h1>
            {!currUser.id ? <h2>Login to start your work day.</h2> : null }
        </div>
    )
}