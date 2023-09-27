import React, { useContext } from 'react';
import { UserContext } from "../App";

export default function EmployeePage() {
    const { currUser } = useContext(UserContext)

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