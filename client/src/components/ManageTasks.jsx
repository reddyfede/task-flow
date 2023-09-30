import React from 'react';
import FormTask from './FormTask';
import TaskList from './TaskList';

const ManageTasks = ({ userData, tasks, fetchTasks, teamMembers }) => {
  return (
    <div style={{ border: '2px solid lightgreen', width: '90%' }}>
      <h1>Manage Tasks</h1>
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
