import React, { useContext, useEffect } from "react"
import { Link } from "react-router-dom"
// import context
import { UserContext } from "./UsersDataProvider"
// react-bootstrap components
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'

export const UsersList = (props) => {
//  context
    const { users, getUsers } = useContext(UserContext)
//  get all users
    useEffect(() => {
        getUsers()
    }, [])

    return (
        <Container className="users">
            <h1>People</h1>

            <Button className="btn" className="btn" variant="secondary" onClick={() => props.history.push("/people/create")}>
                + Contact
            </Button>
            
            <article className="usersList">
                <ListGroup>
                {
                    users.map(user => {
                        return <ListGroup.Item action href={`people/${user.id}`} key={user.id}>
                            {user.firstName} {user.lastName}
                        </ListGroup.Item>
                    })
                }
                </ListGroup>
            </article>
        </Container>
    )
}