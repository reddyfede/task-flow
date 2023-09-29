import React from 'react';
import Wrapper from '../assets/wrappers/GanttChart';

const GanttChart = () => {
  const timeBlock = new Array(72).fill();

  return (
    <Wrapper>
      <div className='chart-grid'>
        {timeBlock.map(() => {
          return <div className='chart-item'></div>;
        })}
      </div>
    </Wrapper>
  );
};

export default GanttChart;
