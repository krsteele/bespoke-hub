import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
// import context
import { UserContext } from "./UsersDataProvider"

export const UsersList = (props) => {
//  context
    const { users, getUsers } = useContext(UserContext)
//  get all users
    useEffect(() => {
        getUsers()
    }, [])

    return (
        <div className="users">
            <h1>People</h1>

            <button onClick={() => props.history.push("/people/create")}>
                Add New
            </button>
            
            <article className="usersList">
                {
                    users.map(user => {
                        return <Link key={user.id} to={`/people/${user.id}`}>
                            <p>{user.firstName} {user.lastName}</p>
                        </Link>
                    })
                }
            </article>
        </div>
    )
}