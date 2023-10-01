import React, { useState } from 'react';
import { createTask } from '../api/task-service';
import { todayDate } from '../utilities/days';

const FormTask = ({ userData, fetchTasks }) => {
  const initState = {
    name: '',
    planned_duration: '',
    due_date: todayDate(),
    team: userData.teamId,
  };
  const [newTask, setNewTask] = useState(initState);

  function handleChange(e) {
    let updatedData = {
      ...newTask,
      [e.target.name]: e.target.value,
    };
    setNewTask(updatedData);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let newData = { ...newTask };
    try {
      const res = await createTask(newData);
      setNewTask(initState);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <form className='card' onSubmit={handleSubmit}>
        <h3>Create new task</h3>
        <div className='form-control'>
          <label htmlFor='name'>
            <span className='form-label'>Task name:</span>
          </label>
          <input
            className='form-input'
            type='text'
            required
            name='name'
            maxLength={50}
            value={newTask.name}
            onChange={handleChange}
          />
        </div>

        <div className='form-control'>
          <label className='label' htmlFor='planned_duration'>
            <span className='form-label'>Task Duration [minutes]:</span>
          </label>
          <input
            className='form-input'
            type='number'
            required
            name='planned_duration'
            min='1'
            max='480'
            value={newTask.planned_duration}
            onChange={handleChange}
          />
        </div>
        <div className='form-control '>
          <label className='label' htmlFor='due_date'>
            <span className='form-label'>Due date:</span>
          </label>
          <input
            className='form-input'
            type='date'
            value={newTask.date}
            onChange={handleChange}
            id='due_date'
            min={todayDate()}
            required
            name='due_date'
          />
        </div>
        <button className='btn' type='submit'>
          Create
        </button>
      </form>
    </div>
  );
};

export default FormTask;
