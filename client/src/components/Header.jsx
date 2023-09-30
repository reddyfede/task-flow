import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BtnSignup, BtnLogin, BtnLogout } from '.';
import { UserContext } from '../App';
import Wrapper from '../assets/wrappers/Header';
import Logo from '../assets/images/logo.png';

export default function Header() {
  const { currUser } = useContext(UserContext);

  return (
    <Wrapper>
      <div className='nav-center'>
        <div className='logo-container'>
          <img className='logo' src={Logo} alt='Task Flow Logo' srcset='' />
          <h1>Task Flow</h1>
        </div>
        <Link to='/' className='link'>
          Home{' '}
        </Link>
        {currUser.token ? (
          <>
            {currUser.role === 'M' ? (
              <Link className='link' to='/manager'>
                {' '}
                Manager Page
              </Link>
            ) : (
              <Link className='link' to='/employee'>
                {' '}
                Employee Page
              </Link>
            )}
            <div>Welcome, {currUser.username}</div>
            <BtnLogout />
          </>
        ) : (
          <div className='nav-right'>
            <BtnSignup />
            <BtnLogin />
          </div>
        )}
      </div>
    </Wrapper>
  );
}
