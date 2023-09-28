import { EmployeeList } from '.';

export default function ManagerTeam({
  userData,
  teamMembers,
  setTeamMembers,
  nonTeamMembers,
  setNonTeamMembers,
}) {
  return (
    <div>
      {!userData.teamName ? (
        <>
          <h2>You don't have a team yet.</h2>
          <h3>Create a team.</h3>
          <form action=''>
            <input type='text' />
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
