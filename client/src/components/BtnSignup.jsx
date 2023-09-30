import { Link } from 'react-router-dom';

export default function BtnSignup() {
  return (
    <button className='btn'>
      <Link to='/signup'>Signup</Link>
    </button>
  );
}
