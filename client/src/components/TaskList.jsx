import React, { useEffect, useState } from 'react';
import { deleteTask, getTasks, updateTask } from '../api/task-service';
import FormTaskAssign from './FormTaskAssign';

const TaskList = ({ tasks, setTasks, teamMembers }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTask, setEditTask] = useState({});

  console.log(tasks);

  const toggleEdit = (e, task) => {
    if (task !== undefined) {
      setEditTask({ ...task });
      setIsEdit(!isEdit);
    } else {
      setIsEdit(!isEdit);
    }
  };

  async function fetchTasks() {
    try {
      const response = await getTasks();
      let taskList = response;
      console.log(taskList);
      setTasks(taskList);
      // setLoadingEventList(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const data = { ...editTask };
      await updateTask(editTask.id, data);
      await fetchTasks();
      toggleEdit();
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const data = {
      ...editTask,
      [e.target.name]: e.target.value,
    };
    setEditTask(data);
  };

  async function handleDelete(e, task) {
    try {
      e.preventDefault();
      await deleteTask(task.id);
      // await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <h3>Task List</h3>
      {isEdit ? (
        <div>
          <h1>Edit Task</h1>
          <h5>Task: {editTask.name}</h5>
          <h5>{editTask.id}</h5>
          <form method='dialog' className='' onSubmit={handleSubmit}>
            <div className='form-control'>
              <label className=''>Edit name:</label>
              <input
                type='text'
                name='name'
                required
                onChange={handleChange}
                className=''
                value={editTask.name}
              />
            </div>

            <div className='form-control'>
              <label className=''>Due:</label>
              <input
                className=''
                type='date'
                onChange={handleChange}
                id='due_date'
                name='due_date'
                value={editTask.due_date}
              />
            </div>

            <div className='form-control'>
              <label className=''>Duration:</label>
              <input
                className=''
                type='number'
                onChange={handleChange}
                id='planned_duration'
                name='planned_duration'
                value={editTask.planned_duration}
              />
            </div>

            <button className='' type='submit'>
              Edit
            </button>
          </form>

          <button onClick={() => toggleEdit()}>Cancel</button>
        </div>
      ) : (
        <div>
          {tasks.map((t) => {
            return (
              <div key={t.id}>
                <p>
                  id: {t.id} | Name: {t.name} | Due: {t.due_date} | Duration:{' '}
                  {t.planned_duration} | Planned Start: {t.planned_start}
                </p>
                <FormTaskAssign
                  teamMembers={teamMembers}
                  taskId={t.id}
                  fetchTasks={fetchTasks}
                />
                <button onClick={(e) => toggleEdit(e, t)}>EDIT</button>
                <button onClick={(e) => handleDelete(e, t)}>DEL</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TaskList;
