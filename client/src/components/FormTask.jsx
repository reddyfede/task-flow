import React, { useState } from 'react';
import { createTask } from '../api/task-service';

const FormTask = ({ fetchTasks }) => {
  const initState = {
    id: 0,
    name: '',
    planned_duration: 0,
    due_date: null,
    team: 1,
  };
  const [newTask, setNewTask] = useState(initState);

  function handleChange(e) {
    console.log(e.target.value);
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
      // handleCancel();
      fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div style={{ border: '3px solid lightblue' }}>
      <h1>Tasks</h1>
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
            <span className='label-text'>Task Duration:</span>
          </label>
          <input
            type='number'
            required
            name='planned_duration'
            maxLength={3}
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
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormTask;
