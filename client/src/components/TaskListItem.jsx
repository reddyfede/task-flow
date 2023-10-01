import React, { useState } from 'react';
import { deleteTask, updateTask } from '../api/task-service';
import FormTaskAssign from './FormTaskAssign';

const TaskListItem = ({ task, fetchTasks, teamMembers }) => {
  const [isEdit, setIsEdit] = useState(false);
  const [editTask, setEditTask] = useState({});

  const toggleEdit = (e, task) => {
    if (task !== undefined) {
      setEditTask({ ...task });
      setIsEdit(!isEdit);
    } else {
      setIsEdit(!isEdit);
    }
  };

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
      await fetchTasks();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className='card'>
      <h5>{task.name}</h5>
      <div className='flex-col'>
        <span>
          Due: {task.due_date} | Duration: {task.planned_duration} minutes
        </span>

        {isEdit ? (
          <div className=''>
            <form method='dialog' className='card' onSubmit={handleSubmit}>
              <h4>Edit Task</h4>
              <div className='form-control'>
                <label className='form-label'>Edit name:</label>
                <input
                  className='form-input'
                  type='text'
                  name='name'
                  required
                  onChange={handleChange}
                  value={editTask.name}
                />
              </div>

              <div className='form-control'>
                <label className='form-label'>Due:</label>
                <input
                  className='form-input'
                  type='date'
                  onChange={handleChange}
                  id='due_date'
                  name='due_date'
                  value={editTask.due_date}
                />
              </div>

              <div className='form-control'>
                <label className='form-label'>Duration:</label>
                <input
                  className='form-input'
                  type='number'
                  onChange={handleChange}
                  id='planned_duration'
                  name='planned_duration'
                  value={editTask.planned_duration}
                />
              </div>

              <button className='btn' type='submit'>
                Edit
              </button>
              <button className='btn' onClick={() => toggleEdit()}>
                Cancel
              </button>
            </form>
          </div>
        ) : (
          <div>
            <button className='btn' onClick={(e) => toggleEdit(e, task)}>
              EDIT
            </button>
            <button
              className='btn btn-danger'
              onClick={(e) => handleDelete(e, task)}
            >
              DEL
            </button>
          </div>
        )}
      </div>
      <FormTaskAssign
        teamMembers={teamMembers}
        taskId={task.id}
        fetchTasks={fetchTasks}
      />
    </div>
  );
};

export default TaskListItem;
