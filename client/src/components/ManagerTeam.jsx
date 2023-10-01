import { useContext, useState } from 'react';
import { createTeam, updateTeam, deleteTeam } from '../api/team-service';
import { UserContext } from '../App';
import { EmployeeList, GanttView } from '../components';
import Wrapper from '../assets/wrappers/ManagerTeam';

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
    retrieveUser();
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
    <Wrapper>
      {!userData.teamName ? (
        <div className='create-team-container'>
          <h2>You don't have a team yet.</h2>
          <h3>Create a team.</h3>
          <form className='form' onSubmit={handleCreate}>
            <div className='form-row'>
              <label className='form-label'>
                Name:{' '}
                <input
                  className='form-input'
                  type='text'
                  value={teamName}
                  onChange={handleChange}
                />
              </label>
            </div>
            <button className='btn'>Create Team</button>
          </form>
        </div>
      ) : (
        <div className='container'>
          <div className='card'>
            <h2>Team Name: {userData.teamName}</h2>
            <div>
              {showEdit ? (
                <div className='card'>
                  <form onSubmit={handleUpdate}>
                    <label htmlFor=''>Team Name: </label>
                    <input
                      type='text'
                      value={teamName}
                      onChange={handleChange}
                    />
                    <br />
                    <button className='btn' onClick={() => setShowEdit(false)}>
                      Back
                    </button>
                    <button className='btn'>Confirm Edit</button>
                  </form>
                </div>
              ) : (
                <div>
                  <button onClick={() => setShowEdit(true)} className='btn'>
                    Edit Team
                  </button>
                </div>
              )}
              {showDelete ? (
                <div className='card'>
                  <p>
                    Are you sure you want to delete team {userData.teamName}?
                  </p>
                  <button className='btn' onClick={() => setShowDelete(false)}>
                    Back
                  </button>
                  <button onClick={handleDelete} className='btn btn-danger'>
                    Confirm Delete
                  </button>
                </div>
              ) : (
                <div>
                  <button className='btn' onClick={() => setShowDelete(true)}>
                    Delete Team
                  </button>
                </div>
              )}
            </div>
          </div>
          <button
            className={`btn  ${tab === 1 ? 'btn-disabled' : null}`}
            disabled={tab === 1}
            onClick={(e) => handleTab(e, 1)}
          >
            Employee List
          </button>
          <button
            className={`btn  ${tab === 2 ? 'btn-disabled' : null}`}
            disabled={tab === 2}
            onClick={(e) => handleTab(e, 2)}
          >
            Team Gantt
          </button>
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
        </div>
      )}
    </Wrapper>
  );
}
