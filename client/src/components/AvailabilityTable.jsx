import { useEffect, useState } from 'react';
import { getDay } from '../utilities/days';

export default function AvailabilityTable({ member }) {
  const [days, setDays] = useState([]);

  function availableDays() {
    let init = [0, 1, 2, 3, 4, 5, 6];
    let arr = [];
    member.availability.map((a) => arr.push(a.day));
    let data = init.filter((el) => arr.indexOf(el) === -1);
    setDays(data);
  }

  useEffect(() => {
    availableDays();
  }, []);

  return (
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
        {member.availability.map((a) => (
          <tr key={a.day}>
            <td>{getDay(a.day)}</td>
            <td>{a.firstBegin}</td>
            <td>{a.firstEnd}</td>
            <td>{a.secondBegin}</td>
            <td>{a.secondEnd}</td>
            <td>
              <button>Edit</button>
            </td>
            <td>
              <button>Remove</button>
            </td>
          </tr>
        ))}
        <tr>
          <td>
            <select name='day'>
              {days.map((d) => (
                <option value={d} key={d}>
                  {getDay(d)}
                </option>
              ))}
            </select>
          </td>
          <td>
            <input type='time' />
          </td>
          <td>
            <input type='time' />
          </td>
          <td>
            <input type='time' />
          </td>
          <td>
            <input type='time' />
          </td>
          <td>
            <button>Add New</button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}
