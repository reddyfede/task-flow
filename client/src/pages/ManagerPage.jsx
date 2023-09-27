import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import { userDetails } from '../api/users-service';
import { ManagerTeam } from '../components';

export default function ManagerPage() {
  const [loading, setLoading] = useState(true);
  const { currUser } = useContext(UserContext);
  const [userData, setUserData] = useState({
    username: null,
    appuserId: null,
    firstName: null,
    lastName: null,
    teamName: null,
    teamId: null,
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [nonTeamMembers, setNonTeamMembers] = useState([]);

  async function retrieveUser() {
    try {
      const res = await userDetails({ id: currUser.id });
      if (res.user) {
        setUserData({ ...userData, ...res.user });
        setTeamMembers([...res.teamList]);
        setNonTeamMembers([...res.notTeamList]);
        setLoading(false);
      } else {
        throw Error('Something went wrong with retrieving the user.');
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    retrieveUser();
  }, []);

  return (
    <div>
      {console.log(teamMembers)}
      {console.log(nonTeamMembers)}
      {currUser.role !== 'M' ? (
        <div>
          <h1>You are not permitted to view this page.</h1>
          <h2>Login with an appropriate user.</h2>
        </div>
      ) : (
        <div>
          <div style={{ border: '1px solid red' }}>
            <Link to='/manager/gantt' style={{ margin: '5rem' }}>
              Gantt View
            </Link>
          </div>
          <h1>Manager Page</h1>
          {loading ? (
            <div>
              <h2>Loading Data...</h2>
            </div>
          ) : (
            <div>
              <h2>First Name: {userData.firstName}</h2>
              <h2>Last Name: {userData.lastName}</h2>
              <h2>AppUser ID: {userData.appuserId}</h2>
              <hr />
              <hr />
              <ManagerTeam
                userData={userData}
                teamMembers={teamMembers}
                setTeamMembers={setTeamMembers}
                nonTeamMembers={nonTeamMembers}
                setNonTeamMembers={setNonTeamMembers}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
