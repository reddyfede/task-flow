import React, { useState } from 'react';
import { updateTaskAssignment } from '../api/task-service';

const FormTaskAssign = ({ taskId, teamMembers, fetchTasks }) => {
  console.log(taskId);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const res = await updateTaskAssignment(taskId, selectedEmployee);
      // handleCancel();
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const employeeId = e.target.value;
    setSelectedEmployee(employeeId);
  };

  return (
    <div>
      <h1>FormTaskAssign</h1>

      <form action='' onSubmit={handleSubmit}>
        <label htmlFor='employee'>
          <span>Select Employee: </span>
        </label>
        <select name='employee' required onChange={handleChange}>
          <option value=''>select one</option>
          {teamMembers.map((tm, idx) => (
            <option value={tm.appuserId} key={idx}>
              {tm.firstName} {tm.lastName} - {tm.appuserId}
            </option>
          ))}
        </select>
        <button>Add to the Team</button>
      </form>
    </div>
  );
};

export default FormTaskAssign;
