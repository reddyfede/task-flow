import './EmployeeItem.css';
import { useEffect, useState } from 'react';
import { AvailabilityTable } from '.';
import { userDetails } from '../api/users-service';
import Wrapper from '../assets/wrappers/EmployeeItem';

export default function EmployeeItem({ member, handleRemove }) {
  const [showRemove, setShowRemove] = useState(false);
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function retrieveEmployee() {
    try {
      const res = await userDetails(member.userId);
      if (res.user) {
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
    <Wrapper>
      {!loading ? (
        <div className=''>
          <div className='team-member-container'>
            <h3>
              Availability for {member.first_name} {member.last_name}{' '}
            </h3>
            {showRemove ? (
              <div className='card'>
                <p>
                  Are you sure you want to remove {member.first_name}{' '}
                  {member.last_name}?
                </p>
                <p>All availabilities will be deleted.</p>
                <button className='btn' onClick={() => setShowRemove(false)}>
                  Back
                </button>
                <button
                  className='btn btn-danger'
                  onClick={handleRemove}
                  name={member.appuserId}
                >
                  Confirm Remove
                </button>
              </div>
            ) : (
              <>
                <button className='btn' onClick={() => setShowRemove(true)}>
                  Remove user from team
                </button>
              </>
            )}
          </div>

          <AvailabilityTable
            employeeData={employeeData}
            retrieveEmployee={retrieveEmployee}
          />
        </div>
      ) : (
        <p>Loading user data</p>
      )}
    </Wrapper>
  );
}
