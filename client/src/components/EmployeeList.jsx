import { useState } from 'react';
import { EmployeeItem } from '.';
import { addToTeam, removeFromTeam } from '../api/team-service';
import { displayToast } from '../utilities/toast';

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

  async function handleAdd(e) {
    e.preventDefault();
    const userId = toAdd;
    if (userId !== '') {
      try {
        const res = await addToTeam(userData.teamId, userId);
        if (res.appuserId) {
          setTeamMembers([...teamMembers, res]);
          let arr = [...nonTeamMembers];
          const filtered_arr = arr.filter(
            (el) => el.appuserId !== res.appuserId
          );
          setNonTeamMembers(filtered_arr);
          setToAdd('');
        } else {
          throw Error('Something went wrong with adding a member to the team.');
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function handleRemove(e) {
    e.preventDefault();
    const userId = e.target.name;
    try {
      const res = await removeFromTeam(userData.teamId, userId);
      if (res.appuserId) {
        let arr = [...teamMembers];
        const filtered_arr = arr.filter((el) => el.appuserId !== res.appuserId);
        setTeamMembers(filtered_arr);
        setNonTeamMembers([...nonTeamMembers, res]);
      } else if (res.tasksNum) {
        displayToast(
          `Cannot be removed. The user has ${res.tasksNum} tasks assigned to him.`,
          'error'
        );
      } else {
        throw Error(
          'Something went wrong with removing a member from the team.'
        );
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div className='card'>
        <h2>Unassigned Employees: {nonTeamMembers.length}</h2>

        <form action='' onSubmit={handleAdd}>
          <label className='form-label' htmlFor='employee'>
            <span>Select Employee: </span>
          </label>
          <select
            className='form-select'
            name='employee'
            value={toAdd}
            required
            onChange={handleChange}
          >
            <option value=''>select one</option>
            {nonTeamMembers.map((ntm, idx) => (
              <option value={ntm.appuserId} key={idx}>
                {ntm.first_name} {ntm.last_name} - {ntm.appuserId}
              </option>
            ))}
          </select>
          <button className='btn'>Add to the Team</button>
        </form>
      </div>
      <div className='card'>
        <h2>Team Members: {teamMembers.length}</h2>
        {teamMembers.map((member) => (
          <div key={member.appuserId}>
            <EmployeeItem
              member={member}
              teamMembers={teamMembers}
              setTeamMembers={setTeamMembers}
              handleRemove={handleRemove}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
