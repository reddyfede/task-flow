import React, { useState } from 'react';
import { updateTask } from '../api/task-service';

const FormTaskAssign = ({ task, teamMembers, fetchTasks }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { ...task, user_id: selectedEmployee };
    try {
      const res = await updateTask(task.id, data);
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
    <div className='flex-col'>
      {console.log(task)}
      <form className='' action='' onSubmit={handleSubmit}>
        <label htmlFor='employee'>
          <span className='form-label'>Select Employee: </span>
        </label>
        <select
          className='form-select'
          name='employee'
          required
          onChange={handleChange}
        >
          <option value=''>select one</option>
          {teamMembers.map((tm, idx) => (
            <option value={tm.appuserId} key={idx}>
              {tm.first_name} {tm.last_name} - {tm.appuserId}
            </option>
          ))}
        </select>
        <button className='btn'>Assign Task</button>
      </form>
    </div>
  );
};

export default FormTaskAssign;
