import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { BtnSignup, BtnLogin, BtnLogout } from '.';
import { UserContext } from '../App';
import Wrapper from '../assets/wrappers/Header';
import Logo from '../assets/images/logo.png';
import { Slide, ToastContainer, toast } from 'react-toastify';

export default function Header() {
  const { currUser } = useContext(UserContext);

  function logoLink() {
    if (currUser.role === 'M') return '/manager';
    else if (currUser.role === 'E') return '/employee';
    else return '/';
  }

  return (
    <Wrapper>
      <ToastContainer transition={Slide} />
      <div className='nav-center'>
        <Link to={`${logoLink()}`} className='logo-container'>
          <img className='logo' src={Logo} alt='Task Flow Logo' />
          <h1>Task Flow</h1>
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
