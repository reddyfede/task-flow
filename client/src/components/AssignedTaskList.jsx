import { userDetails } from '../api/users-service';
import { useEffect, useState } from 'react';
import { AssignedTaskListItem } from '.';

export default function AssignedTaskList({ member, tasks, fetchTasks }) {
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function retrieveEmployee() {
    try {
      const res = await userDetails(member.userId);
      if (res.user) {
        setEmployeeData({ ...res });
        setLoading(false);
      } else {
        throw Error('Something went wrong with retrieving employee data.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    retrieveEmployee();
  }, [tasks]);

  return (
    <div>
      <h5>
        {member.first_name} {member.last_name}
      </h5>

      {loading ? (
        <p>Loading employee data...</p>
      ) : (
        <div>
          {employeeData.tasks.length ? (
            <div>
              <ul>
                {employeeData.tasks.map((task) => (
                  <li className='card' key={task.id}>
                    <AssignedTaskListItem task={task} fetchTasks={fetchTasks} />
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>No task assigned to this employee.</p>
          )}
        </div>
      )}
    </div>
  );
}
