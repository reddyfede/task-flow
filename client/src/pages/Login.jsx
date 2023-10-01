import { useState } from 'react';
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
      <FormLogin user={user} setUser={setUser} />
    </Wrapper>
  );
}
