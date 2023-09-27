import { useContext } from 'react';
import { Link } from "react-router-dom";
import { BtnSignup, BtnLogin, BtnLogout } from ".";
import { UserContext } from "../App";

export default function Header() {

  const { currUser } = useContext(UserContext);

  return (
    <header>
      <h3>Header</h3>
      <Link to='/'>Home </Link>  
      {currUser.token ? (
        <div>
          {currUser.role === "M" ?
            <Link to='/manager'> Manager Page</Link>
            :
            <Link to='/employee'> Employee Page</Link>
          }
          <p>Logged in as: {currUser.username}</p>
          <BtnLogout />
        </div>
      ) : (
        <div>
          <BtnSignup />
          <BtnLogin />
        </div>
      )}
      <hr />
    </header>
  );
};
