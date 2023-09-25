import { useEffect, useState } from 'react';
import './App.css';
import { getAllTasks, updateAllTasks } from './services/tasks-service';

function App() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  async function getTasks() {
    try {
      const res = await getAllTasks();
      setTasks(res);
    } catch (err) {
      console.log(err);
    }
  }

  async function updateTask(task) {
    try {
      const res = await updateAllTasks(task);
      setTasks(res);
    } catch (err) {
      console.log(err);
    }
  }

  console.log(tasks);

  const handleClick = (task) => {
    updateTask(task);
  };

  return (
    <>
      {tasks.length > 0 ? (
        <h1>
          {tasks.map((t) => {
            return t.is_complete ? (
              <div key={t.id}>{t.name} COMPLETE</div>
            ) : (
              <div
                key={t.id}
                className={`task_container ${
                  t.status ? 'task-status_active' : 'task-status_inactive'
                }`}
              >
                <div>
                  <h1>{t.name}</h1>
                  <h3>
                    Planned : <br /> {t.start_time} <br /> {t.end_time}
                  </h3>

                  <h3>
                    Actual : <br /> {t.actual_start_time} <br />{' '}
                    {t.actual_end_time}
                  </h3>
                  <h5>{t.duration}</h5>
                </div>
                <button onClick={() => handleClick(t)}>Click</button>
              </div>
            );
          })}
        </h1>
      ) : (
        <>loading...</>
      )}
    </>
  );
}

export default App;
