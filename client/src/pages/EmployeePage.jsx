import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../App';
import { userDetails } from '../api/users-service';
import {
  fullDateDisplay,
  dateDisplay,
  dateToZ,
  getWeekDay,
  getWeekDayJS,
} from '../utilities/days';
import EmployeeGanttChart from '../components/EmployeeGanttChart';
import EmployeeAvailability from '../components/EmployeeAvailability';

export default function EmployeePage() {
  const [loading, setLoading] = useState(true);
  const { currUser } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState(null);

  async function retrieveUser() {
    try {
      const res = await userDetails(currUser.id);
      if (res.user) {
        const data = { ...userData, ...res };
        setUserData(data);
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

  function renderTodayTasks(t, idx) {
    const d = new Date();
    const td = new Date(t.planned_start);
    let todayDate = d.getDate();
    let taskDate = td.getDate();

    if (todayDate === taskDate) {
      return (
        <>
          <td>{t.name}</td>
          <td>{fullDateDisplay(dateToZ(t.planned_start))}</td>
          <td>{fullDateDisplay(dateToZ(t.planned_end))}</td>
        </>
      );
    }
  }

  return (
    <div className='container'>
      {currUser.role !== 'E' ? (
        <div className='card'>
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
              {!userData.user.teamName ? (
                <h2>A Manager has not yet assigned you to a team.</h2>
              ) : (
                <div>
                  <div>
                    <h1>Team Name: {userData.user.teamName}</h1>
                  </div>
                  <div className='card'>
                    <h2>Gantt for {dateDisplay(new Date())}:</h2>
                    <EmployeeGanttChart employeeData={userData} />
                  </div>

                  <div className='card'>
                    <h2>Availability for {dateDisplay(new Date())}:</h2>
                    <EmployeeAvailability
                      availability={userData.availability}
                    />
                  </div>

                  <div className='card'>
                    <h2>Assigned Tasks for {dateDisplay(new Date())}:</h2>
                    {userData.tasks.length ? (
                      <table style={{ width: '100%' }}>
                        <thead>
                          <tr>
                            <th>Task Name</th>
                            <th>Start</th>
                            <th>End</th>
                          </tr>
                        </thead>
                        <tbody>
                          {userData.tasks.map((t, idx) => (
                            <tr key={t.id}>{renderTodayTasks(t, idx)}</tr>
                          ))}
                        </tbody>
                      </table>
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
