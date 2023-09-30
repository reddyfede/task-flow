import { EmployeeList } from '.';
import { useContext, useState } from 'react';
import { createTeam, updateTeam, deleteTeam } from '../api/team-service';
import { UserContext } from '../App';
import { GanttView } from '../components';

export default function ManagerTeam({
  retrieveUser,
  userData,
  setUserData,
  teamMembers,
  setTeamMembers,
  nonTeamMembers,
  setNonTeamMembers,
}) {
  const [teamName, setTeamName] = useState(userData.teamName || '');
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const { currUser, setCurrUser } = useContext(UserContext);
  const [tab, setTab] = useState(1);

  function handleTab(e, num) {
    e.preventDefault();
    setTab(num);
  }

  function handleChange(e) {
    setTeamName(e.target.value);
  }

  async function handleCreate(e) {
    e.preventDefault();
    const data = { team: teamName, user: userData.appuserId };
    try {
      const res = await createTeam(data);
      if (res.teamName) {
        setCurrUser({ ...currUser, team: res.teamId });
        retrieveUser();
      } else {
        throw Error('Something went wrong creating the team.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdate(e) {
    e.preventDefault();
    try {
      const res = await updateTeam(userData.teamId, teamName);
      if (res.teamName) {
        setUserData({ ...userData, ...res });
        setShowEdit(false);
      } else {
        throw Error('Something went wrong updating the team.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleDelete(e) {
    e.preventDefault();
    try {
      const res = await deleteTeam(userData.teamId);
      if (res.message) {
        setUserData({ ...userData, teamName: null, teamId: null });
        setTeamMembers([]);
        setNonTeamMembers([]);
        setTeamName('');
      } else {
        throw Error('Something went wrong updating the team.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      {!userData.teamName ? (
        <>
          <h2>You don't have a team yet.</h2>
          <h3>Create a team.</h3>
          <form onSubmit={handleCreate}>
            <input type='text' value={teamName} onChange={handleChange} />
            <button>Create Team</button>
          </form>
        </>
      ) : (
        <>
          <h2>
            Team Name : {userData.teamName} - TeamId: {userData.teamId}
          </h2>
          {showEdit ? (
            <div>
              <form onSubmit={handleUpdate}>
                <label htmlFor=''>Team Name: </label>
                <input type='text' value={teamName} onChange={handleChange} />
                <button>Confirm Edit</button>
              </form>
              <button onClick={() => setShowEdit(false)}>Back</button>
            </div>
          ) : (
            <div>
              <button onClick={() => setShowEdit(true)}>Edit Team</button>
            </div>
          )}
          <br />
          {showDelete ? (
            <div>
              <p>Are you sure you want to delete team {userData.teamName}?</p>
              <button onClick={() => setShowDelete(false)}>Back</button>
              <button onClick={handleDelete}>Confirm Delete</button>
            </div>
          ) : (
            <div>
              <button onClick={() => setShowDelete(true)}>Delete Team</button>
            </div>
          )}
          <hr />
          <hr />
          <button disabled={tab === 1} onClick={(e) => handleTab(e, 1)}>
            Employee List
          </button>
          <button disabled={tab === 2} onClick={(e) => handleTab(e, 2)}>
            Team Gant
          </button>
          <hr />
          <hr />
          {tab === 1 ? (
            <EmployeeList
              userData={userData}
              teamMembers={teamMembers}
              setTeamMembers={setTeamMembers}
              nonTeamMembers={nonTeamMembers}
              setNonTeamMembers={setNonTeamMembers}
            />
          ) : null}

          {tab === 2 ? (
            <GanttView userData={userData} teamMembers={teamMembers} />
          ) : null}
        </>
      )}
    </div>
  );
}
