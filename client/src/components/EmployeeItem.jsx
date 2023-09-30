import './EmployeeItem.css';
import { useState } from 'react';
import { AvailabilityTable } from '.';

export default function EmployeeItem({
  member,
  teamMembers,
  setTeamMembers,
  handleRemove,
}) {
  const [showRemove, setShowRemove] = useState(false);

  return (
    <div>
      <h3>
        Name: {member.first_name} {member.last_name}
      </h3>
      <h3>ID: {member.appuserId} </h3>

      {showRemove ? (
        <div>
          <p>
            Are you sure you want to remove {member.first_name}{' '}
            {member.last_name}?
          </p>
          <p>All availabilities will be deleted.</p>
          <button onClick={() => setShowRemove(false)}>Back</button>
          <button onClick={handleRemove} name={member.appuserId}>
            Confirm Remove
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => setShowRemove(true)}>
            Remove user from team
          </button>
        </div>
      )}

      <h3>Availability: </h3>
      <AvailabilityTable
        member={member}
        teamMembers={teamMembers}
        setTeamMembers={setTeamMembers}
      />
    </div>
  );
}
