import { getWeekDay, getWeekDayJS } from '../utilities/days';

export default function EmployeeAvailability({ availability }) {
  return (
    <>
      {availability.map((a) => (
        <div key={a.id}>
          {getWeekDay(a.day) === getWeekDayJS(new Date().getDay()) ? (
            <table style={{ width: '100%' }}>
              <thead>
                <tr>
                  <th>Day</th>
                  <th>Shift Start</th>
                  <th>Lunch Start</th>
                  <th>Lunch End</th>
                  <th>Shift End</th>
                </tr>
              </thead>
              <tbody>
                <tr key={a.id}>
                  <td>{getWeekDay(a.day)}</td>
                  <td>{a.first_part_shift_begin?.slice(0, 5)}</td>
                  <td>{a.first_part_shift_end?.slice(0, 5)}</td>
                  <td>{a.second_part_shift_begin?.slice(0, 5)}</td>
                  <td>{a.second_part_shift_end?.slice(0, 5)}</td>
                </tr>
              </tbody>
            </table>
          ) : null}
        </div>
      ))}
    </>
  );
}
