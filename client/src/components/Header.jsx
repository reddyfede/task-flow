import React, { useContext } from 'react';
import { Link } from "react-router-dom";
import { BtnSignup,BtnLogin,BtnLogout } from ".";
import { UserContext } from "../App";

export default function Header (){

  const currUser = useContext(UserContext);

  return (
    <header>
        <h3>Header</h3>  
        <Link to='/'>Home</Link>
        { currUser.token ? (
          <BtnLogout/>
        ) : (
          <>
            <BtnSignup/>
            <BtnLogin/>
          </>
        )}
        <hr/>
    </header>
  );
};
