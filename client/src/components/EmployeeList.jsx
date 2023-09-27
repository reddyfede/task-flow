import { EmployeeItem } from '.';

export default function EmployeeList({
  teamMembers,
  setTeamMembers,
  nonTeamMembers,
  setNonTeamMembers,
}) {
  return (
    <>
      <EmployeeItem teamMembers={teamMembers} setTeamMembers={setTeamMembers} />
      <h2>Non Team Members: {nonTeamMembers.length}</h2>
    </>
  );
}
