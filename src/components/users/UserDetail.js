import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "./UsersDataProvider"
import { ProjectContext } from "../projects/ProjectsDataProvider"
import { Link } from "react-router-dom"

export const UserDetail = (props) => {
    const { users, getUsers } = useContext(UserContext)
    const [user, setUser] = useState({})

    const { projects, getProjects } = useContext(ProjectContext)
    const [project, setProject] = useState({})

    useEffect(() => {
        getUsers().then(getProjects)
    }, [])

    useEffect(() => {
        const person = users.find(p => p.id === parseInt(props.match.params.userId)) || {}
        setUser(person)
    }, [users])

    useEffect(() => {
        const proj = projects.find(j => j.userId === user.id)
        console.log("project found:", proj)
        setProject(proj)
    }, [projects, user])

    return (
        <section className="user">
            <h1 className="user__name">{user.firstName} {user.lastName}</h1>
            <button onClick={() => props.history.push("/people/update")}>
                Edit
            </button>
            <button onClick={() => props.history.push("/people/remove")}>
                Delete
            </button>
            <div>
                {
                    (project === {} || project === undefined)
                    ? "" 
                    : <>
                    <Link to={`/projects/${project.id}`}>
                        <p>View project page</p>
                    </Link>
                    <Link to={`/projects/${project.id}`}>
                        <p>View client dashboard</p>
                    </Link>
                    </>
                }
            </div>
            <div className="user__email">Email: {user.email}</div>
            <div className="user__phone">Phone: {user.phone}</div>
            <div className="user__password">Password: {user.password}</div>
        </section>
    )
}