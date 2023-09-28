import { useState } from 'react';
import { EmployeeItem } from '.';
import { addToTeam } from '../api/team-service';

export default function EmployeeList({
  userData,
  teamMembers,
  setTeamMembers,
  nonTeamMembers,
  setNonTeamMembers,
}) {
  const [toAdd, setToAdd] = useState('');

  function handleChange(e) {
    setToAdd(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const userId = toAdd;
    console.log(userId);
    if (userId !== '') {
      try {
        const res = await addToTeam(userData.teamId, userId);
        console.log(res);
        if (res.appuserId) {
          console.log(res);
          setTeamMembers([...teamMembers, res]);
        } else {
          throw Error('Something went wrong adding a member to the team.');
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <div>
        <h2>Team Members: {teamMembers.length}</h2>
        <hr />
        {teamMembers.map((teamMember) => (
          <EmployeeItem teamMember={teamMember} key={teamMember.appuserId} />
        ))}
      </div>

      <hr />

      <h2>Unassigned Employees: {nonTeamMembers.length}</h2>

      <form action='' onSubmit={handleSubmit}>
        <label htmlFor='employee'>
          <span>Select Employee: </span>
        </label>
        <select name='employee' required onChange={handleChange}>
          <option value=''></option>
          {nonTeamMembers.map((ntm, idx) => (
            <option value={ntm.appuserId} key={idx}>
              {ntm.firstName} {ntm.lastName} - {ntm.appuserId}
            </option>
          ))}
        </select>
        <button>Add to the Team</button>
      </form>
    </>
  );
}
