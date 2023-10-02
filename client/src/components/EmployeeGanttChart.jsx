import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/GanttChart';
import { dateToZ } from '../utilities/days';

const EmployeeGanttChart = ({ employeeData }) => {
  const timeBlock = new Array(24).fill();
  const [taskBlocks, setTaskBlocks] = useState([]);

  function populateTaskBlocks() {
    let taskHours = [];
    const d = new Date();
    let todayDate = d.getDate();

    if (employeeData) {
      employeeData.tasks.forEach((task) => {
        let taskDate = new Date(dateToZ(task.planned_start)).getDate();
        if (taskDate === todayDate) {
          let taskSpan = task.planned_duration / 60;
          let h = new Date(dateToZ(task.planned_start)).getHours();
          for (let i = 0; i < taskSpan; i++) {
            taskHours.push(h + i);
          }
        }
      });
      setTaskBlocks(taskHours);
    }
  }

  function renderTimeBlock(idx) {
    let hasTask = taskBlocks.includes(idx);
    const d = new Date();
    let h = d.getHours();

    return (
      <div
        className={`${h > idx ? 'chart-past' : ''} ${
          hasTask ? 'chart-task' : 'chart-slot'
        }`}
        key={idx}
      >
        <span>
          <div className={`${h === idx ? 'chart-time-bar' : ''}`}>{idx}</div>
        </span>
      </div>
    );
  }

  useEffect(() => {
    populateTaskBlocks();
  }, []);

  return (
    <Wrapper>
      <div>
        <div className='chart-grid'>
          <div className='chart-user'>
            {employeeData.user.first_name} {employeeData.user.last_name}
          </div>
          {timeBlock.map((el, idx) => renderTimeBlock(idx))}
        </div>
      </div>
    </Wrapper>
  );
};

export default EmployeeGanttChart;
