import { useEffect, useState } from 'react';
import { getDay } from '../utilities/days';
import {
  createAvailability,
  updateAvailability,
  deleteAvailability,
} from '../api/availability-service';

export default function AvailabilityTable({
  member,
  teamMembers,
  setTeamMembers,
}) {
  const [days, setDays] = useState([]);
  const initState = {
    day: '',
    firstBegin: '',
    firstEnd: '',
    secondBegin: '',
    secondEnd: '',
  };
  const [editDay, setEditDay] = useState(null);
  const [addDay, setAddDay] = useState(initState);

  function availableDays() {
    let init = [0, 1, 2, 3, 4, 5, 6];
    let arr = [];
    member.availability.map((a) => {
      let pos = init.indexOf(a.day);
      init.splice(pos, 1);
    });

    setDays(init);
    setAddDay({ ...addDay, day: init[0] });
  }

  useEffect(() => {
    availableDays();
  }, []);

  function handleAdd(e) {
    const data = { ...addDay, [e.target.name]: e.target.value };
    setAddDay(data);
  }

  async function handleAddSubmit(e) {
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

  return (
    <form action='' onSubmit={handleAddSubmit}>
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
                <button>Edit</button>
              </td>
              <td>
                <button>Remove</button>
              </td>
            </tr>
          ))}

          {days.length ? (
            <tr>
              <td>
                <select
                  name='day'
                  defaultValue={days[0]}
                  value={addDay.day}
                  onChange={handleAdd}
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
                  onChange={handleAdd}
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
                  onChange={handleAdd}
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
                  onChange={handleAdd}
                  required={addDay.secondEnd}
                />
              </td>
              <td>
                <input
                  type='time'
                  name='secondEnd'
                  min={addDay.secondBegin}
                  value={addDay.secondEnd}
                  onChange={handleAdd}
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
