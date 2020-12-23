import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
// import contexts
import { UserContext } from "./UsersDataProvider"
import { ProjectContext } from "../projects/ProjectsDataProvider"

export const UserDetail = (props) => {
//  contexts
    const { users, getUsers, deleteUser } = useContext(UserContext)
    const { projects, getProjects } = useContext(ProjectContext)
//  state variables
    const [user, setUser] = useState({})
    const [project, setProject] = useState({})

//  get all users, then get all Projects
    useEffect(() => {
        getUsers().then(getProjects)
    }, [])

//  watch for users to update, then find the user that matches the userId in props and set in state
    useEffect(() => {
        const person = users.find(p => p.id === parseInt(props.match.params.userId)) || {}
        setUser(person)
    }, [users])

//  watch for change in projects and user state, then find the project related to that user
    useEffect(() => {
        const proj = projects.find(j => j.userId === user.id)
        setProject(proj)
    }, [projects, user])

    return (
        <section className="user">
            <h1 className="user__name">{user.firstName} {user.lastName}</h1>
            
            <div>
                {
                    // only render links if there is a project found for this user
                    (project === {} || project === undefined)
                    ? "" 
                    : <>
                    <Link to={`/${user.id}`}>
                        <p>View project page</p>
                    </Link>
                    <Link to={`/dashboards/${user.id}`}>
                        <p>View client dashboard</p>
                    </Link>
                    </>
                }
            </div>
            <div className="user__email">Email: {user.email}</div>
            <div className="user__phone">Phone: {user.phone}</div>
            <div className="user__password">Password: {user.password}</div>
            <button onClick={() => {
                props.history.push(`/people/edit/${user.id}`)}}>
                Edit
            </button>
            <button onClick={() => deleteUser(user.id).then(()=>props.history.push("/people"))}>
                Delete
            </button>
        </section>
    )
}