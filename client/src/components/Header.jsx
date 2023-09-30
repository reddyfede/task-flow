import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BtnSignup, BtnLogin, BtnLogout } from '.';
import { UserContext } from '../App';
import Wrapper from '../assets/wrappers/Header';

export default function Header() {
  const { currUser } = useContext(UserContext);

  return (
    <Wrapper>
      <div className='nav-center'>
        <Link to='/'>Home </Link>
        {currUser.token ? (
          <>
            {currUser.role === 'M' ? (
              <Link to='/manager'> Manager Page</Link>
            ) : (
              <Link to='/employee'> Employee Page</Link>
            )}
            <p>Welcome, {currUser.username}</p>
            <BtnLogout />
          </>
        ) : (
          <div>
            <BtnSignup />
            <BtnLogin />
          </div>
        )}
      </div>
    </Wrapper>
  );
}
