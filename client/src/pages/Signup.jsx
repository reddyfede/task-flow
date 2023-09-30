import { useState } from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { FormSignup } from '../components';

export default function Signup() {
  const [user, setUser] = useState({
    username: '',
    first_name: '',
    last_name: '',
    role: 'E',
    password: '',
  });

  return (
    <div>
      <h1>Singup Page</h1>
      <ToastContainer transition={Slide} />
      <FormSignup user={user} setUser={setUser} />
    </div>
  );
}
