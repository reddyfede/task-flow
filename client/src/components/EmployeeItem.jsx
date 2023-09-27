import './EmployeeItem.css';

export default function EmployeeItem({ teamMember }) {
  return (
    <div>
      <h3>
        Name: {teamMember.firstName} {teamMember.lastName}
      </h3>
      <h3>ID: {teamMember.appuserId} </h3>
      <h3>Availability: </h3>
      <table>
        <thead>
          <tr>
            <th>Day</th>
            <th>Pre Pause Start</th>
            <th>Pre Pause End</th>
            <th>Post Pause Start</th>
            <th>Post Pause End</th>
          </tr>
        </thead>
        <tbody>
          {teamMember.availability.map((a) => (
            <tr key={a.day}>
              <td>{a.day}</td>
              <td>{a.firstBegin}</td>
              <td>{a.firstEnd}</td>
              <td>{a.secondBegin}</td>
              <td>{a.secondEnd}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <hr />
    </div>
  );
}
