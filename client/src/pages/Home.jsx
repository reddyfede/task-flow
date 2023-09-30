import { useContext } from 'react';
import { UserContext } from '../App';
import Wrapper from '../assets/page-wrappers/Home';

export default function Home() {
  const { currUser } = useContext(UserContext);

  return (
    <Wrapper>
      {!currUser.id ? <h2>Login to start your work day.</h2> : null}
    </Wrapper>
  );
}
