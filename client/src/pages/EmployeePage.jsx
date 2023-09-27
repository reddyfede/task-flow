import React, { useContext, useState, useEffect } from 'react';
import { UserContext } from '../App';
import { userDetails } from '../api/users-service';

export default function EmployeePage() {
  const { currUser } = useContext(UserContext);
  const [userData, setUserData] = useState({
    username: null,
    appuserId: null,
    firstName: null,
    lastName: null,
    teamName: null,
    teamId: null,
  });

  async function retrieveUser() {
    try {
      const res = await userDetails({ id: currUser.id });
      if (res.user) {
        const data = { ...userData, ...res.user };
        setUserData(data);
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
      {currUser.role !== 'E' ? (
        <div>
          <h1>You are not permitted to view this page.</h1>
          <h2>Login with an appropriate user.</h2>
        </div>
      ) : (
        <div>
          <h1>Employee Page</h1>
          <h2>First Name: {userData.firstName}</h2>
          <h2>Last Name: {userData.lastName}</h2>
          <h2>AppUser ID: {userData.appuserId}</h2>
          {!userData.teamName ? (
            <h2>A Manager has not yet assigned you to a team.</h2>
          ) : (
            <h2>
              Team Name : {userData.teamName} - TeamId: {userData.teamId}
            </h2>
          )}
        </div>
      )}
    </div>
  );
}
