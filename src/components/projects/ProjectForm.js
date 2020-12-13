import React from "react"
import { ProjectContext } from "./ProjectsDataProvider"
import { UserContext } from "../users/UsersDataProvider"
import { PartContext } from "../parts/PartsDataProvider"
import { ProjectPartContext } from "../parts/ProjectPartsDataProvider"
import { SeadekColorsContext } from "../seadek/SeadekColorsDataProvider"


export const ProjectForm = (props) => {
    /* 
        get contexts and providers
        filter parts for select menus
        build form
        upon submit, addProject, then take newProjectObject that is returned
        and use the id to create the projectParts records(x3) 
        then change view to project detail
    */

    return (
        <div>Hi! I'm the project form!</div>
    )
}

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

    const { register, handleSubmit, errors, formState } = useForm()

    const createNewUser = (data) => {
        addUser(data)
            .then(() => props.history.push("/people"))
    }

    return (
        <>
        <h3>Create New User</h3>
        <Form onSubmit={handleSubmit(createNewUser)}>
            <Form.Group controlId="form__firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control ref={register({required: true})} name="firstName" type="firstName" style={{borderColor: errors.firstName && "red"}} />
            </Form.Group>
            <Form.Group controlId="form__lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control ref={register({required: true})} name="lastName" type="lastName" style={{borderColor: errors.lastName && "red"}} />
            </Form.Group>
            <Form.Group controlId="form__email">
                <Form.Label>Email</Form.Label>
                <Form.Control ref={register({required: true})} name="email" type="email" style={{borderColor: errors.email && "red"}} placeholder="name@example.com" />
            </Form.Group>
            <Form.Group controlId="form__phone">
                <Form.Label>Phone</Form.Label>
                <Form.Control ref={register} name="phone" type="phone" placeholder="xxx-xxx-xxxx" />
            </Form.Group>
            <Form.Group controlId="form__password">
                <Form.Label>Password</Form.Label>
                <Form.Control ref={register({required: true})} name="password" type="password" style={{borderColor: errors.password && "red"}} />
            </Form.Group>
            <Form.Group controlId="form__userType">
                <Form.Label>User type</Form.Label>
                <Form.Control ref={register({required: true})} name="userTypeId" as="select" style={{borderColor: errors.userTypeId && "red"}}>
                <option value="0">Select user type</option>
                {
                    userTypes.map(t => (
                        <option key={t.id} value={t.id}>{t.type}</option>
                    ))
                }
                </Form.Control>
            </Form.Group>
            <Button variant="primary" type="submit" disabled={formState.isSubmitting}>Submit</Button>
        </Form>
        </>
    )
}