import React, { useContext } from 'react';
import { UserContext } from '../App';
import GanttView from '../components/GanttView';
import { Link } from 'react-router-dom';

export default function ManagerPage() {
  const { currUser } = useContext(UserContext);

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
            <Link to='/manager/tasks'>Manage Tasks</Link>
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
