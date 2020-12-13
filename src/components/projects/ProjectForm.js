import React, { useContext } from "react"
// import needed contexts
import { ProjectContext } from "./ProjectsDataProvider"
import { UserContext } from "../users/UsersDataProvider"
import { PartContext } from "../parts/PartsDataProvider"
import { ProjectPartContext } from "../parts/ProjectPartsDataProvider"
import { SeadekColorsContext } from "../seadek/SeadekColorsDataProvider"

// React-Hook-Form
import { useForm } from "react-hook-form"

// React-Bootstrap Component imports
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export const ProjectForm = (props) => {
    /* 
        get contexts and providers
        filter parts for select menus
        build form
        upon submit, addProject, then take newProjectObject that is returned
        and use the id to create the projectParts records(x3) 
        then change view to project detail
    */

//    Needed contexts
    const { addProject } = useContext(ProjectContext)
    const { users, getUsers } = useContext(UserContext)
    const { parts, getParts } = useContext(PartContext)
    const { seadekColors, getSeadekColors } = useContext(SeadekColorContext)
    const { addProjectParts } = useContext(ProjectPartContext)

    
    return (
        <div>Hi! I'm the project form!</div>
    )
}


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