import React, { useContext, useEffect, useRef } from "react"
// import needed contexts
import { ProjectContext } from "./ProjectsDataProvider"
import { UserContext } from "../users/UsersDataProvider"
import { PartContext } from "../parts/PartsDataProvider"
import { ProjectPartContext } from "../parts/ProjectPartsDataProvider"
import { SeadekColorContext } from "../seadek/SeadekColorsDataProvider"

// React-Hook-Form
import { useForm } from "react-hook-form"

// React-Bootstrap Component imports
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export const ProjectForm = (props) => {
    /* 
        filter parts for select menus
        build form
        upon submit, addProject, then take newProjectObject that is returned
        and use the id to create the projectParts records(x3) 
        then change view to project detail
    */

//  Needed contexts
    const { addProject } = useContext(ProjectContext)
    const { users, getUsers } = useContext(UserContext)
    const { parts, getParts } = useContext(PartContext)
    const { seadekColors, getSeadekColors } = useContext(SeadekColorContext)
    const { addProjectParts } = useContext(ProjectPartContext)

//  Grab needed functions form React-Form-Hook
    const { register, handleSubmit, errors, formState } = useForm()

//  Get data needed to render dropdowns
    useEffect(()=> {
        getUsers().then(getParts).then(getSeadekColors)
    }, [])

//  create references for the projectParts that will be added separately
    const engine = useRef(null)
    const GPS = useRef(null)
    const trailer = useRef(null)

/* 
    Function called in onSubmit to call the addProject function, 
    then call the add ProjectParts function for the engine, trailer and GPS parts 
*/
    const createNewProject = (data) => {
        console.log("project form submit clicked")
    }
    
    return (
        <>
        <h3>Create New Project</h3>
        <Form onSubmit={handleSubmit(createNewProject)}>
            <Form.Group controlId="form__boatName">
                <Form.Label>Boat Name</Form.Label>
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



    // const createNewUser = (data) => {
    //     addUser(data)
    //         .then(() => props.history.push("/people"))
    // }

    return (
    )
}