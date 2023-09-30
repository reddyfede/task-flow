import './EmployeeItem.css';
import { useEffect, useState } from 'react';
import { AvailabilityTable } from '.';
import { userDetails } from '../api/users-service';

export default function EmployeeItem({
  member,
  teamMembers,
  setTeamMembers,
  handleRemove,
}) {
  const [showRemove, setShowRemove] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function retrieveEmployee() {
    try {
      const res = await userDetails({ id: member.userId });
      if (res.user) {
        console.log(res);
        setEmployeeData({ ...res });
        setLoading(false);
      } else {
        throw Error('Something went wrong with retrieving employee data.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    retrieveEmployee();
  }, []);

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
      {!loading ? (
        <div>
          <h3>Availability: </h3>
          <AvailabilityTable
            employeeData={employeeData}
            retrieveEmployee={retrieveEmployee}
          />
        </div>
      ) : (
        <p>Loading user data</p>
      )}
    </div>
  );
}
