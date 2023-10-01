import React, { useState } from 'react';
import { updateTaskAssignment } from '../api/task-service';
import { todayDate } from '../utilities/days';

const FormTaskAssign = ({ task, teamMembers, fetchTasks }) => {
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [formData, setFormData] = useState({ employee: '', date: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    const data = { ...formData };
    try {
      const res = await updateTaskAssignment(task.id, data.employee, data.date);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const data = { ...formData, [e.target.name]: e.target.value };
    setFormData(data);
  };

  return (
    <div className='flex-col'>
      {console.log(task)}
      <form className='' action='' onSubmit={handleSubmit}>
        <label htmlFor='employee'>
          <span className='form-label'>Assign to an employee: </span>
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
        <input
          className='form-input'
          type='date'
          name='date'
          min={todayDate()}
          value={formData.date}
          onChange={handleChange}
          required
        />
        <button className='btn'>Assign Task</button>
      </form>
    </div>
  );
};

export default FormTaskAssign;
