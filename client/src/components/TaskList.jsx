import React, { useEffect, useState } from 'react';
import TaskListItem from './TaskListItem';

const TaskList = ({ fetchTasks, tasks, teamMembers }) => {
  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div>
      <h3>Task List</h3>
      {console.log(tasks)}
      <div>
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
    </div>
  );
};

export default TaskList;
