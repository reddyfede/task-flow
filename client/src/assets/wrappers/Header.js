import styled from 'styled-components'

const Wrapper = styled.nav`
  
  h1 {
    
  }
  .nav-center {
    display: flex;
    width: 90vw;
    align-items: center;
    justify-content: space-between;
  }
  
  .btn-container {
    position: relative;
  }
  .btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0 0.5rem;
    position: relative;
    box-shadow: var(--shadow-2);
  }

  @media (min-width: 992px) {
    
  }
`
export default Wrapper