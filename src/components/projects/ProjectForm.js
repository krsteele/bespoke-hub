import React, { useContext, useEffect, useRef, useState } from "react"
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
    const { seadekColors, getSeadekColors } = useContext(SeadekColorsContext)
    const { addProjectParts } = useContext(ProjectPartContext)

//  Grab needed functions form React-Form-Hook
    const { register, handleSubmit, errors, formState } = useForm()

//  Get data needed to render dropdowns
    useEffect(()=> {
        getUsers().then(getParts).then(getSeadekColors)
    }, [])

//  create references for the projectParts that will be added separately
    const motor = useRef(null)
    const navSystem = useRef(null)
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
                <Form.Control ref={register({required: true})} name="boatName" type="boatName" style={{borderColor: errors.boatName && "red"}} />
            </Form.Group>
            <Form.Group controlId="form__boatLength">
                <Form.Label>Boat Length (ft.)</Form.Label>
                <Form.Control ref={register} name="boatLength" type="boatLength" placeholder="xx" />
            </Form.Group>
            <Form.Group controlId="form__model">
                <Form.Label>Model</Form.Label>
                <Form.Control ref={register} name="model" type="model" />
            </Form.Group>
            <Form.Group controlId="form__year">
                <Form.Label>Year</Form.Label>
                <Form.Control ref={register} name="year" type="year" placeholder="xxxx" />
            </Form.Group>
            <Form.Group controlId="form__client">
                <Form.Label>Client</Form.Label>
                <Form.Control ref={register} name="userId" as="select">
                <option value="null">Select client</option>
                {
                    users.filter(user => {
                       return user.userTypeId === 2
                    }).map(user => (
                        <option key={user.id} value={user.id}>{user.firstName} {user.lastName}</option>
                    ))
                }
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="form__motor">
                <Form.Label>Motor</Form.Label>
                <Form.Control ref={motor} name="motor" as="select">
                <option value="0">Select a motor</option>
                {
                    parts.filter(part => {
                       return part.partTypeId === 1
                    }).map(part => (
                        <option key={part.id} value={part.id}>{part.name}</option>
                    ))
                }
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="form__navSystem">
                <Form.Label>GPS</Form.Label>
                <Form.Control ref={navSystem} name="navSystem" as="select">
                <option value="0">Select a GPS</option>
                {
                    parts.filter(part => {
                       return part.partTypeId === 2
                    }).map(part => (
                        <option key={part.id} value={part.id}>{part.name}</option>
                    ))
                }
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="form__trailer">
                <Form.Label>Trailer</Form.Label>
                <Form.Control ref={trailer} name="trailer" as="select">
                <option value="0">Select a trailer</option>
                {
                    parts.filter(part => {
                       return part.partTypeId === 3
                    }).map(part => (
                        <option key={part.id} value={part.id}>{part.name}</option>
                    ))
                }
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="form__seadekColor">
                <Form.Label>Seadek color</Form.Label>
                <Form.Control ref={register} name="seadekColorId" as="select">
                <option value="0">Select a color</option>
                {
                    seadekColors.map(color => {
                       return <option key={color.id} value={color.id}>{color.color}</option>
                    })
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