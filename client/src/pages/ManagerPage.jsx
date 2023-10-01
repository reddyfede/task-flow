import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import { Link } from 'react-router-dom';
import { userDetails } from '../api/users-service';
import { ManagerTeam } from '../components';

export default function ManagerPage() {
  const { currUser, setCurrUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({
    username: null,
    appuserId: null,
    first_name: null,
    last_name: null,
    teamName: null,
    teamId: null,
  });
  const [teamMembers, setTeamMembers] = useState([]);
  const [nonTeamMembers, setNonTeamMembers] = useState([]);

  async function retrieveUser() {
    try {
      const res = await userDetails(currUser.id);
      if (res.user) {
        setUserData({ ...userData, ...res.user });
        setCurrUser({ ...currUser, team: res.user.teamId });
        localStorage.setItem('team', res.user.teamId);
        if (res.teamList) {
          setTeamMembers([...res.teamList]);
        }
        if (res.notTeamList) {
          setNonTeamMembers([...res.notTeamList]);
        }
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
      {currUser.role !== 'M' ? (
        <div>
          <h1>You are not permitted to view this page.</h1>
          <h2>Login with an appropriate user.</h2>
        </div>
      ) : (
        <div>
          {loading ? (
            <div>
              <h2>Loading Data...</h2>
            </div>
          ) : (
            <div>
              <ManagerTeam
                retrieveUser={retrieveUser}
                userData={userData}
                setUserData={setUserData}
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
