import styled from 'styled-components'

const Wrapper = styled.div`
    height: 100%;
    width: 90%;

  .chart-grid {
    display: grid;
    grid-template-columns: repeat(72, 1fr);
    grid-template-rows: 1fr;
    grid-column-gap: 0px;
    grid-row-gap: 0px;
    min-height: 5vh;
  }
  .chart-item {
    background-color: gray;
    border: 1px solid rgba(0, 0, 0, 0.1);
  } 
`

export default Wrapper