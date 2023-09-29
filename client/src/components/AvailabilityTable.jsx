import { useEffect, useState } from 'react';
import { getDay } from '../utilities/days';
import {
  createAvailability,
  deleteAvailability,
} from '../api/availability-service';

export default function AvailabilityTable({
  member,
  teamMembers,
  setTeamMembers,
}) {
  const [days, setDays] = useState([0, 1, 2, 3, 4, 5, 6]);
  const initState = {
    day: '',
    firstBegin: '',
    firstEnd: '',
    secondBegin: '',
    secondEnd: '',
  };

  const [addDay, setAddDay] = useState(initState);

  function availableDays() {
    let arr = [...days];
    for (const a of member.availability) {
      let pos = arr.indexOf(parseInt(a.day));
      if (pos > -1) {
        arr.splice(pos, 1);
        setDays(arr);
      }
    }
    setAddDay({ ...addDay, day: arr[0] });
  }

  useEffect(() => {
    availableDays();
  }, []);

  function handleChange(e) {
    const data = { ...addDay, [e.target.name]: e.target.value };
    setAddDay(data);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    let data = { ...addDay, userId: member.appuserId };
    if (data.secondBegin === '') {
      data.secondBegin = null;
    }
    if (data.secondEnd === '') {
      data.secondEnd = null;
    }
    try {
      const res = await createAvailability(data);
      if (res.id) {
        member.availability.push(res);
        let arr = [...teamMembers];
        let pos = arr.indexOf(member);
        arr[pos] = { ...member };
        setTeamMembers(arr);
        availableDays();
      } else {
        throw Error('Something went wrong with creating an availability.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemove(id, day) {
    const d = day;
    try {
      const res = await deleteAvailability(id);
      if (res.updatedAvailability) {
        member.availability = [...res.updatedAvailability];
        let arr = [...teamMembers];
        let pos = arr.indexOf(member);
        arr[pos] = { ...member };
        setTeamMembers(arr);
        let days_arr = [...days, day].sort();
        setDays(days_arr);
      } else {
        throw Error('Something went wrong with deleting an availability.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form action='' onSubmit={handleSubmit}>
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
            <tr key={a.id}>
              <td>{getDay(a.day)}</td>
              <td>{a.firstBegin}</td>
              <td>{a.firstEnd}</td>
              <td>{a.secondBegin}</td>
              <td>{a.secondEnd}</td>

              <td>
                <a onClick={() => handleRemove(a.id, a.day)}>Remove</a>
              </td>
            </tr>
          ))}

          {days.length ? (
            <tr>
              <td>
                <select
                  name='day'
                  defaultValue={days[0]}
                  onChange={handleChange}
                >
                  {days.map((d) => (
                    <option value={d} key={d}>
                      {getDay(d)}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <input
                  type='time'
                  name='firstBegin'
                  value={addDay.firstBegin}
                  max={addDay.firstEnd}
                  onChange={handleChange}
                  required
                />
              </td>
              <td>
                <input
                  type='time'
                  name='firstEnd'
                  min={addDay.firstBegin}
                  value={addDay.firstEnd}
                  max={addDay.secondBegin}
                  onChange={handleChange}
                  required
                />
              </td>
              <td>
                <input
                  type='time'
                  name='secondBegin'
                  min={addDay.firstEnd}
                  value={addDay.secondBegin}
                  max={addDay.secondEnd}
                  onChange={handleChange}
                  required={addDay.secondEnd}
                />
              </td>
              <td>
                <input
                  type='time'
                  name='secondEnd'
                  min={addDay.secondBegin}
                  value={addDay.secondEnd}
                  onChange={handleChange}
                  required={addDay.secondBegin}
                />
              </td>
              <td>
                <button type='submit'>Add New</button>
              </td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </form>
  );
}
