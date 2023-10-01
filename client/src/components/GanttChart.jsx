import React, { useEffect, useState } from 'react';
import Wrapper from '../assets/wrappers/GanttChart';
import { userDetails } from '../api/users-service';

const GanttChart = ({ member, tasks }) => {
  const timeBlock = new Array(24).fill();
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [taskBlocks, setTaskBlocks] = useState([]);

  async function retrieveEmployee() {
    try {
      const res = await userDetails(member.userId);
      if (res.user) {
        setEmployeeData({ ...res });
        setLoading(false);
      } else {
        throw Error('Something went wrong with retrieving employee data.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  function populateTaskBlocks() {
    let taskHours = [];
    const d = new Date();
    let todayDate = d.getDate();

    if (employeeData) {
      employeeData.tasks.forEach((task) => {
        let taskDate = new Date(task.planned_start).getDate();
        if (taskDate === todayDate) {
          let taskSpan = task.planned_duration / 60;
          let h = new Date(task.planned_start).getHours();
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
    retrieveEmployee();
  }, [tasks]);

  useEffect(() => {
    populateTaskBlocks();
  }, [employeeData]);

  return (
    <Wrapper>
      {loading ? (
        <p>Loading employee data...</p>
      ) : (
        <div>
          <div className='chart-grid'>
            <div className='chart-user'>
              {employeeData.user.first_name} {employeeData.user.last_name}
            </div>
            {timeBlock.map((el, idx) => renderTimeBlock(idx))}
          </div>
        </div>
      )}
    </Wrapper>
  );
};

export default GanttChart;
