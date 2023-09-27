
import React, { useContext } from 'react';
import { UserContext } from '../App';
import GanttView from '../components/GanttView';
import { Link } from 'react-router-dom';
import { userDetails } from '../api/users-service';


export default function ManagerPage() {
  const { currUser } = useContext(UserContext);
  
   async function retrieveUser() {
        try {
          const res = await userDetails({id: currUser.id});
          console.log(res)  
        } catch (err) {
          console.log(err);
        }
    }

    useEffect(() => {
        retrieveUser();
      }, []);

  return (
    <div>
      {currUser.role !== 'M' ? (
        <div>
          <h1>You are not permitted to view this page.</h1>
          <h2>Login with an appropriate user.</h2>
        </div>
      ) : (
        <div>
          <div
            style={{
              border: '1px solid red',
            }}
          >
            <Link
              to='/manager/gantt'
              style={{
                margin: '5rem',
              }}
            >
              Gantt View
            </Link>
          </div>
          <h1>Manager Page</h1>
          <h2>Team: teamName</h2>
          <h2>Employee: person1</h2>
          <h2>person1: AVAILABILITY</h2>
          <h2>Unassigned Tasks</h2>
        </div>
      )}
    </div>
  );
}
