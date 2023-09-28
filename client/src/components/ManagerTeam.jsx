import { EmployeeList } from '.';
import { useState } from 'react';
import { createTeam } from '../api/team-service';

export default function ManagerTeam({
  retrieveUser,
  userData,
  teamMembers,
  setTeamMembers,
  nonTeamMembers,
  setNonTeamMembers,
}) {
  const [teamName, setTeamName] = useState(userData.teamName || '');

  async function handleCreate(e) {
    e.preventDefault();
    const data = { team: teamName, user: userData.appuserId };
    try {
      const res = await createTeam(data);
      if (res.teamName) {
        retrieveUser();
      } else {
        throw Error('Something went wrong creating a team.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  function handleChange(e) {
    setTeamName(e.target.value);
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
          <button>Edit Team Name</button>
          <button>Delete Team</button>
          <hr />
          <hr />
          <EmployeeList
            teamMembers={teamMembers}
            setTeamMembers={setTeamMembers}
            nonTeamMembers={nonTeamMembers}
            setNonTeamMembers={setNonTeamMembers}
          />
        </>
      )}
    </div>
  );
}
