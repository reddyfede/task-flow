import styled from 'styled-components'

const Wrapper = styled.nav`

  h1 {
    margin: 0;
  }

  .nav-center {
    display: flex;
    width: 95vw;
    height: 10vh;
    align-items: center;
    justify-content: space-between;
  }

  .nav-right {
    display: flex;
    flex-direction: row;
    gap: 1rem;
  }

  .logo-container {
    display: flex;
  }

  .logo {
    width: 50px;
    margin: 1rem;
    height: 30px;
  }

  @media (min-width: 992px) {
    
  }
`
export default Wrapper