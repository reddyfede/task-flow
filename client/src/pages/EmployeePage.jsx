import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../App';
import { userDetails } from '../api/users-service';

export default function EmployeePage() {
  const [loading, setLoading] = useState(true);
  const { currUser } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState({
    username: null,
    appuserId: null,
    first_name: null,
    last_name: null,
    teamName: null,
    teamId: null,
  });

  async function retrieveUser() {
    try {
      const res = await userDetails(currUser.id);
      if (res.user) {
        const data = { ...userData, ...res.user };
        setUserData(data);
        if (res.tasks) {
          setTasks([...res.tasks]);
        }
        setLoading(false);
      } else {
        throw Error('Something went wrong with retrieving the user.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    retrieveUser();
  }, []);

  return (
    <div>
      {currUser.role !== 'E' ? (
        <div>
          <h1>You are not permitted to view this page.</h1>
          <h2>Login with an appropriate user.</h2>
        </div>
      ) : (
        <div>
          {loading ? (
            <div>
              <h2>Loading Data...</h2>
            </div>
          ) : (
            <div className='container'>
              {!userData.teamName ? (
                <h2>A Manager has not yet assigned you to a team.</h2>
              ) : (
                <div>
                  <div>
                    <h2>Team Name : {userData.teamName}</h2>
                  </div>
                  <div>
                    <h2>Assigned Tasks: {tasks.length}</h2>
                    {tasks.length ? (
                      <ul>
                        {tasks.map((t, idx) => (
                          <div className='card flex-ctr-ctr form-row'>
                            <li key={idx}>
                              <div>
                                {t.name} {t.planned_duration} {t.due_date}
                              </div>
                            </li>
                          </div>
                        ))}
                      </ul>
                    ) : (
                      <h3>No tasks assigned yet.</h3>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
