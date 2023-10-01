import { Link } from 'react-router-dom';

export default function BtnSignup() {
  return (
    <button className='btn'>
      <Link className='link' to='/signup'>
        Signup
      </Link>
    </button>
  );
}
