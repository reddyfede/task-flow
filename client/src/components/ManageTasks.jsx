import React from 'react';
import FormTask from './FormTask';
import TaskList from './TaskList';

const ManageTasks = ({ tasks, fetchTasks, setTasks, teamMembers }) => {
  return (
    <div style={{ border: '2px solid lightgreen' }}>
      <h1>Manage Tasks</h1>
      <TaskList tasks={tasks} setTasks={setTasks} teamMembers={teamMembers} />
      <FormTask fetchTasks={fetchTasks} />
    </div>
  );
};

export default ManageTasks;
