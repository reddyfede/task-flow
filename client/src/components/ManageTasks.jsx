import React from 'react';
import FormTask from './FormTask';
import TaskList from './TaskList';
import { AssignedTaskList } from '.';
import Wrapper from '../assets/wrappers/ManageTasks';

const ManageTasks = ({ userData, tasks, fetchTasks, teamMembers }) => {
  return (
    <Wrapper>
      <h3>Assigned Tasks</h3>
      {teamMembers.map((member) => (
        <div key={member.appuserId}>
          <AssignedTaskList
            member={member}
            tasks={tasks}
            fetchTasks={fetchTasks}
          />
          {member === undefined ? <>{console.log('now', member)}</> : null}
        </div>
      ))}

      <h3>Unassigned Tasks</h3>
      <TaskList
        fetchTasks={fetchTasks}
        tasks={tasks}
        teamMembers={teamMembers}
      />
      <FormTask userData={userData} fetchTasks={fetchTasks} />
    </Wrapper>
  );
};

export default ManageTasks;
