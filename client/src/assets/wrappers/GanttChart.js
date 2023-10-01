import styled from 'styled-components'

const Wrapper = styled.div`
    height: 100%;
    width: 100%;


  .chart-grid {
    display: grid;
    grid-template-columns: repeat(25, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    min-height: 5vh;
    text-align: center;
  }
  .chart-slot {
    background-color: var(--primary-100);
    color: var(--black);
    /* border: 1px solid rgba(0, 0, 0, 0.1); */
  } 

  .chart-task {
    background-color: var(--primary-500);
    color: var(--white);
    border: 0px solid rgba(0, 0, 0, 0.1);
  }

  .chart-user {
    background-color: rgba(255, 255, 0, 0.1);
    min-width: 10rem;
  }

  .chart-time-bar {
    position: relative;
    left: 1rem;
    background-color: red;
    width: 3px;
    height:100%;
  }
  .hide-bar{
    position: relative;
    display:none
  }

  .chart-past {
    filter: grayscale(60%);
  }
`

export default Wrapper