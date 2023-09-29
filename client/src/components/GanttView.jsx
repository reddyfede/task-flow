import React, { useEffect, useState } from 'react';
import FormTask from '../components/FormTask';
import ManageTasks from './ManageTasks';
import { getTasks, getTasksByTeam } from '../api/task-service';
import { useContext } from 'react';
import { UserContext } from '../App';
import { userDetails } from '../api/users-service';
import GanttChart from './GanttChart';

const GanttView = () => {
  const { currUser, setCurrUser } = useContext(UserContext);
  const [tasks, setTasks] = useState([]);
  const [userData, setUserData] = useState([]);
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {}, [currUser]);

  useEffect(() => {
    retrieveUser();
    fetchTasks();
  }, []);

  // function user-tasklist{
  //   for each userID in teamMembers
  //     -> task if task.userID === teamMembers.userID
  //     _> user tasklist
  // }

  async function retrieveUser() {
    try {
      const res = await userDetails({ id: currUser.id });
      if (res.user) {
        setUserData({ ...userData, ...res.user });
        setCurrUser({ ...currUser, team: res.user.teamId });
        if (res.teamList) {
          setTeamMembers([...res.teamList]);
        }
        // setLoading(false);
      } else {
        throw Error('Something went wrong with retrieving the user.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function fetchTasks() {
    try {
      const response = await getTasksByTeam(currUser.team);
      console.log(response);
      if (response.length || response.length === 0) {
        let taskList = response;
        setTasks(taskList);
        setLoading(false);
      } else {
        throw Error('Something went wrong with retrieving tasks.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {loading ? (
        <div>
          <h2>Loading Data...</h2>
        </div>
      ) : (
        <div
          style={{
            border: '1px solid blue',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            width: '90vw',
          }}
        >
          <h1>Team Gantt Page</h1>
          <GanttChart />
          <ManageTasks
            tasks={tasks}
            fetchTasks={fetchTasks}
            setTasks={setTasks}
            teamMembers={teamMembers}
          />
        </div>
      )}
    </>
  );
};

export default GanttView;
