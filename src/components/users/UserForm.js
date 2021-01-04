import React, { useContext, useState, useEffect } from "react"
import { UserContext } from "./UsersDataProvider"
import { UserTypeContext } from "./UserTypeDataProvider"
// import react-bootstrap components
import Button from 'react-bootstrap/Button'
import Container from 'react-bootstrap/Container'
import Form from 'react-bootstrap/Form'

export const UserForm = (props) => {
    // necessary context providers
    const { addUser, users, updateUser, getUsers } = useContext(UserContext)
    const { userTypes, getUserTypes } = useContext(UserTypeContext)
    // component state
    const [user, setUser] = useState({})
    // checking to see if the user got to this page via the edit button
    const editMode = props.match.params.hasOwnProperty("userId")
    // changing state whenever input fields change
    const handleControlledInputChange = (event) => {
        const newUser = Object.assign({}, user)
        newUser[event.target.name] = event.target.value
        setUser(newUser)
    }
    // if user arrived via the edit button, find the selected user and set that user in state
    const getUserInEditMode = () => {
        if (editMode) {
            const userToEdit = parseInt(props.match.params.userId)
            
            const selectedUser = users.find(user => user.id === userToEdit)
            setUser(selectedUser)
        }
    }
    // get users and usertypes when component initializes
    useEffect(() => {
        getUserTypes().then(getUsers)
    }, [])
    // once provider state updated, determine the user to edit (if edit)
    useEffect(() => {
        getUserInEditMode()
    }, [users])

    
    const createNewUser = () => {
        const userTypeId = parseInt(user.userTypeId)

        if (userTypeId === 0) {
            window.alert("Please select a contact type")
        } else {
            if (editMode) {
                updateUser({
                    id: user.id,
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    password: user.password,
                    userTypeId: userTypeId
                })
                    .then(() => props.history.push(`/people/${user.id}`))
            } else {
                addUser({
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    phone: user.phone,
                    password: user.password,
                    userTypeId: userTypeId
                })
                .then(()=> props.history.push("/people"))
            }
        }
    }

    return (
        <Container>
            <Form className="userForm">
                <h3 className="userForm__title">{editMode ? "Edit Contact Info" : "Add New Contact"}</h3>
                <Form.Group>
                    <div className="form-group">
                        <Form.Label htmlFor="firstName">First Name</Form.Label>
                        <Form.Control type="text" name="firstName" required autoFocus className="form-control"
                            proptype="varchar"
                            defaultValue={user.firstName}
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </Form.Group>
                <Form.Group>
                    <div className="form-group">
                        <Form.Label htmlFor="lastName">Last Name</Form.Label>
                        <Form.Control type="text" name="lastName" required autoFocus className="form-control"
                            proptype="varchar"
                            defaultValue={user.lastName}
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </Form.Group>
                <Form.Group>
                    <div className="form-group">
                        <Form.Label htmlFor="email">Email</Form.Label>
                        <Form.Control type="email" name="email" required autoFocus className="form-control"
                            proptype="varchar"
                            defaultValue={user.email}
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </Form.Group>
                <Form.Group>
                    <div className="form-group">
                        <Form.Label htmlFor="phone">Phone</Form.Label>
                        <Form.Control type="text" name="phone" autoFocus className="form-control"
                            proptype="varchar"
                            defaultValue={user.phone}
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </Form.Group>
                <Form.Group>
                    <div className="form-group">
                        <Form.Label htmlFor="password">Password</Form.Label>
                        <Form.Control type="password" name="password" required autoFocus className="form-control"
                            proptype="varchar"
                            defaultValue={user.password}
                            onChange={handleControlledInputChange}
                        />
                    </div>
                </Form.Group>
                <Form.Group>
                    <div className="form-group">
                        <Form.Label htmlFor="userTypeId">Contact Type </Form.Label>
                        <Form.Control as="select" name="userTypeId" className="form-control"
                            proptype="int"
                            value={user.userTypeId}
                            onChange={handleControlledInputChange}>

                            <option value="0">Select a type</option>
                            {userTypes.map(t => (
                                <option key={t.id} value={t.id}>
                                    {t.type}
                                </option>
                            ))}
                        </Form.Control>
                    </div>
                </Form.Group>
                <Button className="btn" variant="secondary" type="submit"
                    onClick={evt => {
                        evt.preventDefault()
                        createNewUser()
                    }}
                    className="btn btn-primary">
                    {editMode ? "Save Updates" : "Save"}
                </Button>
            </Form>
        </Container>
    )
}