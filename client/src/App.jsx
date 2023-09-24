import { useEffect, useState } from 'react';
import './App.css';
import { getAllTasks } from './services/tasks-service';

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

  console.log(tasks);

  return (
    <>
      {tasks.length > 0 ? (
        <h1>
          {tasks.map((t) => {
            return (
              <div>
                {t.name}, {t.startTime}, {t.duration}
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
