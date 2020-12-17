import React, { useState, useEffect, useContext } from "react"
import { UserContext } from "./UsersDataProvider"
import { ProjectContext } from "../projects/ProjectsDataProvider"
import { Link } from "react-router-dom"

export const UserDetail = (props) => {
    const { users, getUsers, deleteUser } = useContext(UserContext)
    const [user, setUser] = useState({})

    const { projects, getProjects } = useContext(ProjectContext)
    const [project, setProject] = useState({})

    useEffect(() => {
        getUsers().then(getProjects)
    }, [])

    useEffect(() => {
        // console.log(props.match.params)
        const person = users.find(p => p.id === parseInt(props.match.params.userId)) || {}
        setUser(person)
    }, [users])

    useEffect(() => {
        const proj = projects.find(j => j.userId === user.id)
        // console.log("project found:", proj)
        setProject(proj)
    }, [projects, user])

    return (
        <section className="user">
            <h1 className="user__name">{user.firstName} {user.lastName}</h1>
            <button onClick={() => {
                // console.log("edit:", user.id)
                props.history.push(`/people/edit/${user.id}`)}}>
                Edit
            </button>
            <button onClick={() => deleteUser(user.id).then(()=>props.history.push("/people"))}>
                Delete
            </button>
            <div>
                {
                    (project === {} || project === undefined)
                    ? "" 
                    : <>
                    <Link to={`/${project.id}`}>
                        <p>View project page</p>
                    </Link>
                    <Link to={`/dashboards/${project.userId}`}>
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