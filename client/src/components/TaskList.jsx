import React from 'react';

const TaskList = ({ tasks }) => {
  return (
    <div>
      <h3>Task List</h3>
      <div>
        {tasks.map((t) => {
          console.log(t);
          return (
            <div>
              <p>
                Name: {t.name} | Due: {t.due_date} | Duration:{' '}
                {t.planned_duration} | Planned Start: {t.planned_start}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TaskList;
