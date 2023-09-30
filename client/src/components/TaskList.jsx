import TaskListItem from './TaskListItem';

const TaskList = ({ fetchTasks, tasks, teamMembers }) => {
  return (
    <div>
      {tasks.map((task) => (
        <div key={task.id}>
          <TaskListItem
            task={task}
            fetchTasks={fetchTasks}
            teamMembers={teamMembers}
          />
        </div>
      ))}
      <hr />
    </div>
  );
};

export default TaskList;
