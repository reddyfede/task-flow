import React from 'react';
import FormTask from './FormTask';
import TaskList from './TaskList';
import { AssignedTaskList } from '.';

const ManageTasks = ({ userData, tasks, fetchTasks, teamMembers }) => {
  return (
    <div style={{ border: '2px solid lightgreen', width: '90%' }}>
      <h1>Manage Tasks</h1>
      <hr />
      <hr />

      <h3>Assigned Tasks</h3>
      {console.log(teamMembers)}

      {teamMembers.map((member) => (
        <div key={member.appuserId}>
          <AssignedTaskList member={member} />
          {member === undefined ? <>{console.log('now', member)}</> : null}
          <hr />
        </div>
      ))}

      <hr />

      <h3>Unassigned Tasks</h3>
      <TaskList
        fetchTasks={fetchTasks}
        tasks={tasks}
        teamMembers={teamMembers}
      />
      <FormTask userData={userData} fetchTasks={fetchTasks} />
    </div>
  );
};

export default ManageTasks;
