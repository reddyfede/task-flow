export default function AssignedTaskListItem({ task }) {
  // TODO: remove -> call the update task api and set user as null

  return (
    <div>
      Task: {task.name} | Due {task.due_date} | Duration:{' '}
      {task.planned_duration} <button className='btn'>Remove</button>
    </div>
  );
}
