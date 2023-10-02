import { useEffect, useState } from 'react';
import { getWeekDay } from '../utilities/days';
import {
  createAvailability,
  deleteAvailability,
} from '../api/availability-service';
import { displayToast } from '../utilities/toast';

export default function AvailabilityTable({ employeeData, retrieveEmployee }) {
  const [options, setOptions] = useState([0, 1, 2, 3, 4, 5, 6]);
  const initState = {
    day: '',
    first_part_shift_begin: '',
    first_part_shift_end: '',
    second_part_shift_begin: '',
    second_part_shift_end: '',
  };
  const [addDay, setAddDay] = useState(initState);

  function availableDays() {
    let arr = [...options];
    for (const a of employeeData.availability) {
      let pos = arr.indexOf(parseInt(a.day));
      if (pos > -1) {
        arr.splice(pos, 1);
        setOptions(arr);
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
    let data = { ...addDay, user_id: employeeData.user.appuserId };
    if (data.second_part_shift_begin === '') {
      data.second_part_shift_begin = null;
    }
    if (data.second_part_shift_end === '') {
      data.second_part_shift_end = null;
    }
    try {
      const res = await createAvailability(data);
      if (res.id) {
        await retrieveEmployee();
        let days_arr = [...options];
        const pos = days_arr.indexOf(parseInt(data.day));
        days_arr.splice(pos, 1);
        setOptions(days_arr);
        setAddDay(initState);
      } else {
        throw Error('Something went wrong with creating an availability.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemove(id, day) {
    if (!employeeData.tasks.length) {
      const d = day;
      try {
        const res = await deleteAvailability(id);
        if (res.id) {
          await retrieveEmployee();
          let days_arr = [...options, day].sort();
          setOptions(days_arr);
        } else {
          throw Error('Something went wrong with deleting an availability.');
        }
      } catch (err) {
        console.log(err);
      }
    } else {
      displayToast(
        "Can't remove availabilities from a user with assingned task.",
        'error'
      );
    }
  }

  return (
    <form action='' onSubmit={handleSubmit}>
      <table style={{ width: '100%' }}>
        <thead>
          <tr>
            <th>Day</th>
            <th>Shift Start</th>
            <th>Lunch Start</th>
            <th>Lunch End</th>
            <th>Shift End</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {employeeData.availability.map((a) => (
            <tr key={a.id}>
              <td>{getWeekDay(a.day)}</td>
              <td>{a.first_part_shift_begin?.slice(0, 5)}</td>
              <td>{a.first_part_shift_end?.slice(0, 5)}</td>
              <td>{a.second_part_shift_begin?.slice(0, 5)}</td>
              <td>{a.second_part_shift_end?.slice(0, 5)}</td>
              <td>
                <a
                  className='btn btn-danger'
                  onClick={() => handleRemove(a.id, a.day)}
                >
                  Remove
                </a>
              </td>
            </tr>
          ))}

          {options.length ? (
            <>
              <tr>
                <td>
                  <select
                    className='form-select'
                    name='day'
                    onChange={handleChange}
                  >
                    <option value={''}>select one</option>
                    {options.map((d) => (
                      <option value={d} key={d}>
                        {getWeekDay(d)}
                      </option>
                    ))}
                  </select>
                </td>
                <td>
                  <input
                    className='form-input'
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
                    className='form-input'
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
                    className='form-input'
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
                    className='form-input'
                    type='time'
                    name='second_part_shift_end'
                    min={addDay.second_part_shift_begin}
                    value={addDay.second_part_shift_end}
                    onChange={handleChange}
                    required={addDay.second_part_shift_begin}
                  />
                </td>
                <td>
                  <button className='btn' type='submit'>
                    Add New
                  </button>
                </td>
              </tr>
            </>
          ) : null}
        </tbody>
      </table>
    </form>
  );
}
