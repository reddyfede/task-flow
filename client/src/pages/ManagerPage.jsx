import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../App';
import GanttView from '../components/GanttView';
import { Link } from 'react-router-dom';
import { userDetails } from '../api/users-service';

export default function ManagerPage() {
    const { currUser } = useContext(UserContext);
    const [userData, setUserData] = useState({ username: null, appuserId: null, firstName: null, lastName: null, teamName: null, teamId: null })
    const [teamMembers, setTeamMembers] = useState([])
    const [nonTeamMembers, setNonTeamMembers] = useState([])

    async function retrieveUser() {
        try {
            const res = await userDetails({ id: currUser.id });
            console.log(res)
            if (res.user) {
                console.log(res)
                setUserData({ ...userData, ...res.user })

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
                    <div
                        style={{
                            border: '1px solid red',
                        }}
                    >
                        <Link
                            to='/manager/gantt'
                            style={{
                                margin: '5rem',
                            }}
                        >
                            Gantt View
                        </Link>
                    </div>
                    <h1>Manager Page</h1>
                    <h2>First Name: {userData.firstName}</h2>
                    <h2>Last Name: {userData.lastName}</h2>
                    <h2>AppUser ID: {userData.appuserId}</h2>
                    {!userData.teamName ?
                        <h2>You don't have a team yet. Create a team.</h2>
                        :
                        <h2>Team Name : {userData.teamName} - TeamId: {userData.teamId}</h2>
                    }
                </div>
            )}
        </div>
    );
}
