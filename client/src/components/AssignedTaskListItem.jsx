import { updateTask } from '../api/task-service';
import Wrapper from '../assets/wrappers/AssignedTaskListItem';
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
    <Wrapper>
      <div className='task-container'>
        <span>Task: {task.name}</span>
        <div className='task-details'>
          <span>Due: {task.due_date}</span>
          <span>Start: {task.planned_start}</span>
        </div>
        <div className='task-details'>
          <span>Duration: {task.planned_duration}</span>
          <span>End: {task.planned_end}</span>
        </div>
      </div>
      <button className='btn ' onClick={handleRemove}>
        Remove
      </button>
    </Wrapper>
  );
}
