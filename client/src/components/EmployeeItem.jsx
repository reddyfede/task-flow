import './EmployeeItem.css';
import { useState } from 'react';

export default function EmployeeItem({ member, handleRemove }) {
  const [showRemove, setShowRemove] = useState(false);

  return (
    <div>
      <h3>
        Name: {member.firstName} {member.lastName}
      </h3>
      <h3>ID: {member.appuserId} </h3>

      {showRemove ? (
        <div>
          <p>
            Are you sure you want to remove {member.firstName} {member.lastName}
            ?
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
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Pre Pause Start</th>
            <th>Pre Pause End</th>
            <th>Post Pause Start</th>
            <th>Post Pause End</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {member.availability.map((a) => (
            <tr key={a.day}>
              <td>{a.day}</td>
              <td>{a.firstBegin}</td>
              <td>{a.firstEnd}</td>
              <td>{a.secondBegin}</td>
              <td>{a.secondEnd}</td>
              <td>
                <button>Edit</button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <input type='text' />
            </td>
            <td>
              <input type='text' />
            </td>
            <td>
              <input type='text' />
            </td>
            <td>
              <input type='text' />
            </td>
            <td>
              <input type='text' />
            </td>
            <td>
              <button>Add New</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
