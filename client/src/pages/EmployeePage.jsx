import React, { useContext,useEffect } from 'react';
import { UserContext } from "../App";
import { userDetails } from '../api/users-service';

export default function EmployeePage() {
    const { currUser } = useContext(UserContext)

    async function retrieveUser() {
        try {
          const res = await userDetails({id: currUser.id});
          console.log(res)  
        } catch (err) {
          console.log(err);
        }
    }

    useEffect(() => {
        retrieveUser();
      }, []);


    return (
        <div>
            {currUser.role !== "E" ? (
                <div>
                    <h1>You are not permitted to view this page.</h1>
                    <h2>Login with an appropriate user.</h2>
                </div>
            ) : (
                <div>
                    <h1>Employee Page</h1>
                </div>
            )}
        </div>
    )
}