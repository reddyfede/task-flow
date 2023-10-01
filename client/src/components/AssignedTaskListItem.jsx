import { updateTask } from '../api/task-service';
import { fullDateDisplay, dateDisplay } from '../utilities/days';

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
      Task: {task.name} | Due: {task.due_date} | Duration:{' '}
      {task.planned_duration} | Start: {task.planned_start} | End:{' '}
      {task.planned_end}
      <button className='btn' onClick={handleRemove}>
        Remove
      </button>
    </div>
  );
}
