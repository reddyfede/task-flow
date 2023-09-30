import { Link } from 'react-router-dom';

export default function BtnLogin() {
  return (
    <button className='btn'>
      <Link to='/login'>Login</Link>
    </button>
  );
}
