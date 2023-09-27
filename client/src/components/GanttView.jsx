import React, { useEffect, useState } from 'react';
import FormTask from '../components/FormTask';
import ManageTasks from './ManageTasks';
import { getTasks } from '../api/task-service';

const GanttView = () => {
  const [tasks, setTasks] = useState([]);

  async function fetchTasks() {
    try {
      const response = await getTasks();
      if (response.length || response.length === 0) {
        let taskList = response;
        setTasks(taskList);
        // setLoadingEventList(false);
      } else {
        throw Error('Something went wrong with retrieving tasks.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div
      style={{
        border: '1px solid blue',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <h1>Team Gantt Page</h1>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          border: '1px solid blue',
          backgroundColor: 'gray',
          height: '20rem',
          width: '55rem',
        }}
      >
        <h5>GANTT CHART</h5>
      </div>
      <ManageTasks tasks={tasks} fetchTasks={fetchTasks} />
    </div>
  );
};

export default GanttView;
