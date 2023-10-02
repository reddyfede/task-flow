import React from 'react';
import FormTask from './FormTask';
import TaskList from './TaskList';
import { AssignedTaskList } from '.';
import Wrapper from '../assets/wrappers/ManageTasks';

const ManageTasks = ({ userData, tasks, fetchTasks, teamMembers }) => {
  return (
    <Wrapper>
      <div className='card'>
        <h2>Assigned Tasks</h2>
        {teamMembers.map((member) => (
          <div className='' key={member.appuserId}>
            <AssignedTaskList
              member={member}
              tasks={tasks}
              fetchTasks={fetchTasks}
            />
          </div>
        ))}
      </div>
      <div className='card'>
        <h2>Unassigned Tasks</h2>
        <TaskList
          fetchTasks={fetchTasks}
          tasks={tasks}
          teamMembers={teamMembers}
        />
      </div>
      <FormTask userData={userData} fetchTasks={fetchTasks} />
    </Wrapper>
  );
};

export default ManageTasks;
