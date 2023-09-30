import React, { useState } from 'react';
import { createTask } from '../api/task-service';

const FormTask = ({ userData, fetchTasks }) => {
  const initState = {
    name: '',
    planned_duration: '',
    due_date: null,
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
    console.log(newData);
    try {
      const res = await createTask(newData);
      setNewTask(initState);
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{ border: '3px solid lightblue' }}>
      <h1>Create new task</h1>
      <form onSubmit={handleSubmit}>
        <div className='form-control'>
          <label className='label' htmlFor='name'>
            <span className='label-text'>Task name:</span>
          </label>
          <input
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
            <span className='label-text'>Task Duration [minutes]:</span>
          </label>
          <input
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
            <span className='label-text'>Due date:</span>
          </label>
          <input
            className=''
            type='date'
            value={newTask.date}
            onChange={handleChange}
            id='due_date'
            required
            name='due_date'
          />
        </div>
        <button className='' type='submit'>
          Create
        </button>
      </form>
    </div>
  );
};

export default FormTask;
