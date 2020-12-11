import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "./UsersDataProvider"
import { Link } from "react-router-dom"

export const UserDetail = (props) => {
    const { users, getUsers } = useContext(UserContext)
    const [user, setUser] = useState({})

    useEffect(() => {
        getUsers()
    }, [])

    useEffect(() => {
        const person = users.find(p => p.id === parseInt(props.match.params.userId)) || {}
        setUser(person)
    }, [users])

    return (
        <section className="user">
            <h1 className="user__name">{user.firstName} {user.lastName}</h1>
            <button onClick={() => props.history.push("/users/update")}>
                Edit
            </button>
            <button onClick={() => props.history.push("/users/remove")}>
                Delete
            </button>
            <div>
            <Link key={user.id} to={"#projectpage"}>
                <p>View project page</p>
             </Link>
            <Link key={user.id} to={"#clientdashboard"}>
                <p>View client dashboard</p>
            </Link>
            </div>
            <div className="user__email">Email: {user.email}</div>
            <div className="user__phone">Phone: {user.phone}</div>
            <div className="user__password">Password: {user.password}</div>
        </section>
    )
}