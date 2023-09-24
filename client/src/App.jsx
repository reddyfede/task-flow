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
            return (
              <div className='task_container'>
                <div>
                  <h1>{t.name}</h1>
                  <h3>
                    {t.start_time} - {t.end_time}
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
