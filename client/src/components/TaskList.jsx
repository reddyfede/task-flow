import React, { useEffect, useState } from 'react';
import TaskListItem from './TaskListItem';

const TaskList = ({ fetchTasks, tasks, teamMembers }) => {
  return (
    <div>
      <hr />
      <hr />
      <div>
        <h3>Assigned Tasks</h3>

        {teamMembers.map((tm) => (
          <div key={tm.appuserId}>
            <h3>{tm.first_name}</h3>
          </div>
        ))}
      </div>
      <hr />
      <hr />
      <div>
        <h3>Available Tasks</h3>
        {tasks.map((t) => (
          <div key={t.id}>
            <TaskListItem
              t={t}
              fetchTasks={fetchTasks}
              teamMembers={teamMembers}
            />
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default TaskList;
