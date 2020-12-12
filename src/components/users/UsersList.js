import React, { useContext, useEffect } from "react"
import { UserContext } from "./UsersDataProvider"
import { Link } from "react-router-dom"

export const UsersList = (props) => {
    const { users, getUsers } = useContext(UserContext)

    useEffect(() => {
        // console.log("I'm UsersList initial render!")
        getUsers()
    }, [])

    useEffect(() => {
        // console.log("I'm UsersList second render with data:", users)
    }, [users])

    return (
        <div className="users">
            <h1>People</h1>
            <button onClick={() => props.history.push("/people/create")}>
                Add New
            </button>
            <button onClick={(()=>console.log("I will filter teammates."))}>
                Teammates
            </button>
            <button onClick={(()=>console.log("I will filter Clients."))}>
                Clients
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