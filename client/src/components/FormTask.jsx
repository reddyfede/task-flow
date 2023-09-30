import React, { useContext, useState } from 'react';
import { createTask } from '../api/task-service';
import { UserContext } from '../App';

const FormTask = ({ fetchTasks }) => {
  const { currUser, setCurrUser } = useContext(UserContext);
  console.log(currUser);
  const initState = {
    name: '',
    plannedDuration: 0,
    dueDate: null,
    team: currUser.team,
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
          <label className='label' htmlFor='plannedDuration'>
            <span className='label-text'>Task Duration:</span>
          </label>
          <input
            type='number'
            required
            name='plannedDuration'
            maxLength={3}
            value={newTask.plannedDuration}
            onChange={handleChange}
          />
        </div>
        <div className='form-control '>
          <label className='label' htmlFor='dueDate'>
            <span className='label-text'>Due date:</span>
          </label>
          <input
            className=''
            type='date'
            value={newTask.date}
            onChange={handleChange}
            id='dueDate'
            required
            name='dueDate'
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
