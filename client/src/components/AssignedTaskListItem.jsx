import { updateTask } from '../api/task-service';

export default function AssignedTaskListItem({ task, fetchTasks }) {
  async function handleRemove() {
    const data = { ...task, user_id: null };
    try {
      await updateTask(task.id, data);
      await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {console.log(task)}
      Task: {task.name} | Due {task.due_date} | Duration:{' '}
      {task.planned_duration}
      <button className='btn' onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
}
