import { Link } from 'react-router-dom';

export default function BtnLogin() {
  return (
    <button className='btn'>
      <Link className='link' to='/login'>
        Login
      </Link>
    </button>
  );
}
