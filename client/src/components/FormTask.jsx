import React, { useState } from 'react';

const FormTask = () => {
  const initState = {
    name: '',
    duration: '',
    due: null,
    team: 1,
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
      if (res._id) {
        // handleCancel();
        console.log('created task');
        console.log(newData);
        fetchEvents();
      } else {
        console.log('error creating task');
      }
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
          <label className='label' htmlFor='due_date'>
            <span className='label-text'>Task Duration:</span>
          </label>
          <input
            type='text'
            required
            name='due_date'
            maxLength={3}
            value={newTask.duration}
            onChange={handleChange}
          />
        </div>
        <div className='form-control'>
          <label className='label' htmlFor='name'>
            <span className='label-text'>Task Duration:</span>
          </label>
          <input
            type='text'
            required
            name='due_date'
            maxLength={3}
            value={newTask.duration}
            onChange={handleChange}
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
