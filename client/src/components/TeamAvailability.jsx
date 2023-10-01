export default function TeamAvailability({ teamMembers }) {
  // const result = words.filter((word) => word.length > 6)

  function DayAv(member, num, part) {
    const av = member.availability.filter((a) => a.day === num);
    const fb = av[0]?.first_part_shift_begin?.slice(0, 5) || '';
    const fe = av[0]?.first_part_shift_end?.slice(0, 5) || '';
    const sb = av[0]?.second_part_shift_begin?.slice(0, 5) || '';
    const se = av[0]?.second_part_shift_end?.slice(0, 5) || '';
    if (part === 1) {
      return `${fb}-${fe}`;
    } else {
      return `${sb}-${se}`;
    }
  }

  return (
    <div>
      <h1>Team Availability</h1>
      <table style={{ width: '90%' }}>
        <thead>
          <tr>
            <th>Team Member</th>
            <th>Monday</th>
            <th>Tuesday</th>
            <th>Wednesday</th>
            <th>Thursday</th>
            <th>Friday</th>
            <th>Saturday</th>
            <th>Sunday</th>
          </tr>
        </thead>
        <tbody>
          {teamMembers.map((tm) => (
            <tr key={tm.appuserId}>
              <td>
                {tm.first_name} {tm.last_name}
              </td>
              <td>
                <div>{DayAv(tm, 0, 1)}</div>
                <div>{DayAv(tm, 0, 2)}</div>
              </td>
              <td>
                <div>{DayAv(tm, 1, 1)}</div>
                <div>{DayAv(tm, 1, 2)}</div>
              </td>
              <td>
                <div>{DayAv(tm, 2, 1)}</div>
                <div>{DayAv(tm, 2, 2)}</div>
              </td>
              <td>
                <div>{DayAv(tm, 3, 1)}</div>
                <div>{DayAv(tm, 3, 2)}</div>
              </td>
              <td>
                <div>{DayAv(tm, 4, 1)}</div>
                <div>{DayAv(tm, 4, 2)}</div>
              </td>
              <td>
                <div>{DayAv(tm, 5, 1)}</div>
                <div>{DayAv(tm, 5, 2)}</div>
              </td>
              <td>
                <div>{DayAv(tm, 6, 1)}</div>
                <div>{DayAv(tm, 6, 2)}</div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
