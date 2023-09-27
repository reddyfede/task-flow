import { BtnSignup,BtnLogin } from ".";
import { Link } from "react-router-dom";

export default function Header (){

  return (
    <header>
        <h3>Header</h3>  
        <Link to='/'>Home</Link>
        <BtnSignup/>
        <BtnLogin/>
        <hr/>
    </header>
  );
};
