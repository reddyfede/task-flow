import React, { useState } from 'react';
import { updateTaskAssignment } from '../api/task-service';
import { todayDate } from '../utilities/days';
import { displayToast } from '../utilities/toast';

const FormTaskAssign = ({ task, teamMembers, fetchTasks }) => {
  const [formData, setFormData] = useState({ employee: '', date: '' });
  const [msg, setMsg] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg('');
    const data = { ...formData };
    try {
      const res = await updateTaskAssignment(task.id, data.employee, data.date);
      if (res.taskId) {
        fetchTasks();
      } else if (res.message) {
        setMsg(res.message);
        displayToast(res.message, 'error');
      }
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
        <h5 style={{ color: 'red' }}>{msg}</h5>
      </form>
    </div>
  );
};

export default FormTaskAssign;
