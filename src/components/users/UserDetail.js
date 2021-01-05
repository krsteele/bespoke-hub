import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
// import contexts
import { UserContext } from "./UsersDataProvider"
import { ProjectContext } from "../projects/ProjectsDataProvider"
// import react-bootstrap components
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Card from "react-bootstrap/Card"
import ListGroup from 'react-bootstrap/ListGroup'

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
        <>
            <Card>
                <Card.Header><h3 className="user__name">{user.firstName} {user.lastName}</h3></Card.Header>
                <Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroup.Item className="user__email">Email: {user.email}</ListGroup.Item>
                        <ListGroup.Item className="user__phone">Phone: {user.phone}</ListGroup.Item>
                        <ListGroup.Item className="user__password">Password: {user.password}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
                    {
                        // only render links if there is a project found for this user
                        (project === {} || project === undefined)
                        ? "" 
                        : <Card.Body>
                        <Card.Link href={`/${user.id}`}>
                            View project page
                        </Card.Link>
                        <Card.Link href={`/dashboards/${user.id}`}>
                            View client dashboard
                        </Card.Link>
                        </Card.Body>
                    }

            </Card>
            <Button className="btn" variant="secondary" onClick={() => {
                props.history.push(`/people/edit/${user.id}`)}}>
                Edit
            </Button>
            <Button className="btn" variant="secondary" onClick={() => deleteUser(user.id).then(()=>props.history.push("/people"))}>
                Delete
            </Button>
        </>
    )
}