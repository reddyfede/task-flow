import { userDetails } from '../api/users-service';
import { useEffect, useState } from 'react';

export default function AssignedTaskList({ member, tasks }) {
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
      <h4>
        Employee {member.first_name} {member.last_name} tasklist
      </h4>

      {loading ? (
        <p>Loading employee data...</p>
      ) : (
        <div>
          {employeeData.tasks.length ? (
            <div>
              <ul>
                {employeeData.tasks.map((task) => (
                  <li key={task.id}>
                    Task: {task.name} | Due {task.due_date} | Duration:{' '}
                    {task.planned_duration}
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
