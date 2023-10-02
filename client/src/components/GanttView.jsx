import React, { useEffect, useState } from 'react';
import ManageTasks from './ManageTasks';
import { getTasksByTeam } from '../api/task-service';
import GanttChart from './GanttChart';
import { TeamAvailability } from '.';
import { userDetails } from '../api/users-service';
import { dateDisplay, dateToZ } from '../utilities/days';

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
          <div className='card'>
            <h2>Employee Gantt for {dateDisplay(new Date())}:</h2>
            {teamMembers.map((member) => (
              <div key={member.appuserId}>
                <GanttChart member={member} tasks={tasks} />
              </div>
            ))}
          </div>
          <div className='card'>
            <TeamAvailability teamMembers={teamMembers} />
            <ManageTasks
              userData={userData}
              tasks={tasks}
              fetchTasks={fetchTasks}
              teamMembers={teamMembers}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default GanttView;
