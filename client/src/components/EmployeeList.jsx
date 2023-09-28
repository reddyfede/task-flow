import { EmployeeItem } from '.';

export default function EmployeeList({
  teamMembers,
  setTeamMembers,
  nonTeamMembers,
  setNonTeamMembers,
}) {
  function handleChange() {
    return;
  }

  function handleSubmit() {
    return;
  }

  return (
    <>
      <div>
        <h2>Team Members</h2>
        <hr />
        {teamMembers.map((teamMember) => (
          <EmployeeItem teamMember={teamMember} key={teamMember.appuserId} />
        ))}
      </div>

      <hr />

      <h2>Unassigned Employees: {nonTeamMembers.length}</h2>

      <form action='' onSubmit={handleSubmit}>
        <label htmlFor='ntm'>
          <span>Select Employee: </span>
        </label>
        <select name='employee' required value='' onChange={handleChange}>
          {nonTeamMembers.map((ntm) => (
            <option value={ntm.appuserId} key={ntm.appuserId}>
              {ntm.firstName} {ntm.lastName}
            </option>
          ))}
        </select>
        <button>Add to the Team</button>
      </form>
    </>
  );
}
