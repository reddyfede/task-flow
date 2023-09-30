import { useState } from 'react';
import { Slide, ToastContainer, toast } from 'react-toastify';
import { FormLogin } from '../components';
import Wrapper from '../assets/page-wrappers/Login';

export default function Login() {
  let username = '';
  if (localStorage.username) {
    username = localStorage.username;
  }

  const [user, setUser] = useState({
    username: username,
    password: '',
  });

  return (
    <Wrapper>
      <ToastContainer transition={Slide} />
      <FormLogin user={user} setUser={setUser} />
    </Wrapper>
  );
}
