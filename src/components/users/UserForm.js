import React, { useContext, useEffect } from "react"
import { UserContext } from "./UsersDataProvider"
import { UserTypeContext } from "./UserTypeDataProvider"
import { useForm } from "react-hook-form"
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export const UserForm = (props) => {
    const { addUser } = useContext(UserContext)
    const { userTypes, getUserTypes } = useContext(UserTypeContext)

    useEffect(() => {
        getUserTypes()
    }, [])

    return (
        <>
        <h3>Create New User</h3>
        <Form>
            <Form.Group controlId="form__firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control type="firstName" />
            </Form.Group>
            <Form.Group controlId="form__lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control type="lastName" />
            </Form.Group>
            <Form.Group controlId="form__email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
            </Form.Group>
            <Form.Group controlId="form__phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control type="phone" placeholder="xxx-xxx-xxxx" />
            </Form.Group>
            <Form.Group controlId="form__password">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" />
            </Form.Group>
            <Form.Group controlId="form__userType">
                <Form.Label>User type</Form.Label>
                <Form.Control as="select">
                <option value="0">Select user type</option>
                {
                    userTypes.map(t => (
                        <option key={t.id} value={t.id}>{t.type}</option>
                    ))
                }
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={() => console.log("user form submitted")}>Submit</Button>
        </Form>
        </>
    )
}