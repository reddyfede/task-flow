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
    first_part_shift_begin: '',
    first_part_shift_end: '',
    second_part_shift_begin: '',
    second_part_shift_end: '',
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
    let data = { ...addDay, user_id: member.appuserId };
    if (data.second_part_shift_begin === '') {
      data.second_part_shift_begin = null;
    }
    if (data.second_part_shift_end === '') {
      data.second_part_shift_end = null;
    }
    try {
      const res = await createAvailability(data);
      if (res.updatedAvailability) {
        member.availability = [...res.updatedAvailability];
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
              <td>{a.first_part_shift_begin}</td>
              <td>{a.first_part_shift_end}</td>
              <td>{a.second_part_shift_begin}</td>
              <td>{a.second_part_shift_end}</td>

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
                  name='first_part_shift_begin'
                  value={addDay.first_part_shift_begin}
                  max={addDay.first_part_shift_end}
                  onChange={handleChange}
                  required
                />
              </td>
              <td>
                <input
                  type='time'
                  name='first_part_shift_end'
                  min={addDay.first_part_shift_begin}
                  value={addDay.first_part_shift_end}
                  max={addDay.second_part_shift_begin}
                  onChange={handleChange}
                  required
                />
              </td>
              <td>
                <input
                  type='time'
                  name='second_part_shift_begin'
                  min={addDay.first_part_shift_end}
                  value={addDay.second_part_shift_begin}
                  max={addDay.second_part_shift_end}
                  onChange={handleChange}
                  required={addDay.second_part_shift_end}
                />
              </td>
              <td>
                <input
                  type='time'
                  name='second_part_shift_end'
                  min={addDay.second_part_shift_begin}
                  value={addDay.second_part_shift_end}
                  onChange={handleChange}
                  required={addDay.second_part_shift_begin}
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
