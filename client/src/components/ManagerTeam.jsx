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
        <h2>You don't have a team yet. Create a team.</h2>
      ) : (
        <>
          <h2>
            Team Name : {userData.teamName} - TeamId: {userData.teamId}
          </h2>

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
