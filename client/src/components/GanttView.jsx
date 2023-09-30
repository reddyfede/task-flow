import React, { useEffect, useState } from 'react';
import ManageTasks from './ManageTasks';
import { getTasksByTeam } from '../api/task-service';
import GanttChart from './GanttChart';

const GanttView = ({ userData, teamMembers }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTasks();
  }, []);

  async function fetchTasks() {
    try {
      const response = await getTasksByTeam(userData.teamId);
      if (response.length || response.length === 0) {
        let taskList = response;
        setTasks(taskList);
        setLoading(false);
      } else {
        throw Error('Something went wrong with retrieving tasks.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {loading ? (
        <div>
          <h2>Loading Data...</h2>
        </div>
      ) : (
        <div>
          <h1>Team Gantt Page</h1>
          <GanttChart />
          <ManageTasks
            userData={userData}
            tasks={tasks}
            fetchTasks={fetchTasks}
            teamMembers={teamMembers}
          />
        </div>
      )}
    </>
  );
};

export default GanttView;
