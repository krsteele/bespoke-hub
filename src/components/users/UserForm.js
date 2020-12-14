import React, { useContext, useState, useEffect } from "react"
import { UserContext } from "./UsersDataProvider"
import { UserTypeContext } from "./UserTypeDataProvider"
// import { useForm } from "react-hook-form"
// import Form from "react-bootstrap/Form"
// import Button from "react-bootstrap/Button"

export const UserForm = (props) => {
    // necessary context providers
    const { addUser, users, updateUser, getUsers } = useContext(UserContext)
    const { userTypes, getUserTypes } = useContext(UserTypeContext)
    // component state
    const [user, setUser] = useState({})
    // URL parameter?
    const editMode = props.match.params.hasOwnProperty("userId")
    // changing state
    const handleControlledInputChange = (event) => {
        const newUser = Object.assign({}, user)
        newUser[event.target.name] = event.target.value
        setUser(newUser)
    }

    const getUserInEditMode = () => {
        if (editMode) {
            // console.log("get user in edit mode:", props.match.params)
            const userToEdit = parseInt(props.match.params.userId)
            console.log("user to edit",userToEdit)
            console.log("users:", users)
            const selectedUser = users.find(user => user.id === userToEdit)
            console.log("selected for edit:", selectedUser)
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
            window.alert("Please select a user type")
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
        <form className="userForm">
            <h3 className="userForm__title">{editMode ? "Edit Person Info" : "Add New Person"}</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" required autoFocus className="form-control"
                        proptype="varchar"
                        defaultValue={user.firstName}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" required autoFocus className="form-control"
                        proptype="varchar"
                        defaultValue={user.lastName}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" required autoFocus className="form-control"
                        proptype="varchar"
                        defaultValue={user.email}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="phone">Phone</label>
                    <input type="text" name="phone" autoFocus className="form-control"
                        proptype="varchar"
                        defaultValue={user.phone}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" required autoFocus className="form-control"
                        proptype="varchar"
                        defaultValue={user.password}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="userTypeId">User Type </label>
                    <select name="userTypeId" className="form-control"
                        proptype="int"
                        value={user.userTypeId}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a type</option>
                        {userTypes.map(t => (
                            <option key={t.id} value={t.id}>
                                {t.type}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    createNewUser()
                }}
                className="btn btn-primary">
                {editMode ? "Save Updates" : "Save"}
            </button>
        </form>
    )
}