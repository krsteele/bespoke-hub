import React, { useContext, useEffect, useRef, useState } from "react"
// import needed contexts
import { ProjectContext } from "./ProjectsDataProvider"
import { UserContext } from "../users/UsersDataProvider"
import { PartContext } from "../parts/PartsDataProvider"
import { ProjectPartContext } from "../parts/ProjectPartsDataProvider"
import { SeadekColorsContext } from "../seadek/SeadekColorsDataProvider"
import { PaintTypeContext } from "../paint/PaintTypesDataProvider"
import { TaskContext }  from "../tasks/TasksDataProvider"
import { ProjectTaskContext } from "../tasks/ProjectTasksDataProvider"

// React-Hook-Form
import { useForm } from "react-hook-form"

// React-Bootstrap Component imports
import Form from "react-bootstrap/Form"
import Button from "react-bootstrap/Button"

export const ProjectForm = (props) => {

//  Needed contexts
    const { addProject } = useContext(ProjectContext)
    const { users, getUsers } = useContext(UserContext)
    const { parts, getParts } = useContext(PartContext)
    const { seadekColors, getSeadekColors } = useContext(SeadekColorsContext)
    const { addProjectPart } = useContext(ProjectPartContext)
    const { paintTypes, getPaintTypes } = useContext(PaintTypeContext)
    const { tasks, getTasks } = useContext(TaskContext)
    const { addProjectTask } = useContext(ProjectTaskContext)

//  Grab needed functions from React-Form-Hook
    const { register, handleSubmit, errors, formState } = useForm()

//  Get data needed to render dropdowns
    useEffect(()=> {
        getUsers().then(getParts).then(getSeadekColors).then(getPaintTypes).then(getTasks)
    }, [])

/* 
    Function called in onSubmit to call the addProject function, 
    then call the add ProjectParts function for the engine, trailer and GPS parts 

*/
    const createNewProject = (data) => {
        // post the project object
       addProject({
            boatName: data.boatName,
            year: data.year,
            model: data.model,
            boatLength: data.boatLength,
            userId: data.userId,
            paintTypeId: data.paintTypeId,
            seadekColorId: data.seadekColorId,
            swimPlatform: data.swimPlatform,
            projectStartDate: Date.now(),
            isComplete: false,
            projectEndDate: null
            })
            .then(newProjectObject => {
            // capture the return and then post the parts related to the project
                addProjectPart({
                    projectId: newProjectObject.id,
                    partId: data.motor
                })
                addProjectPart({
                    projectId: newProjectObject.id,
                    partId: data.navSystem
                })
                addProjectPart({
                projectId: newProjectObject.id,
                partId: data.trailer
            })
            // filter the tasks based on form choices and post the projectTask relationships
           tasks.forEach(task => {
               if (task.taskTypeId ===1 || task.taskTypeId === 5){
                    addProjectTask({
                        projectId: newProjectObject.id,
                        taskId: task.id,
                        isComplete: false
                    })
               }
               if (newProjectObject.swimPlatform && task.taskTypeId === 4) {
                addProjectTask({
                    projectId: newProjectObject.id,
                    taskId: task.id,
                    isComplete: false
                })
               }
               if (newProjectObject.paintTypeId === 1 && task.taskTypeId === 2){
                addProjectTask({
                    projectId: newProjectObject.id,
                    taskId: task.id,
                    isComplete: false
                })
               }
               if (newProjectObject.paintTypeId === 2 && task.taskTypeId === 3){
                addProjectTask({
                    projectId: newProjectObject.id,
                    taskId: task.id,
                    isComplete: false
                })
               }
            })

            return newProjectObject /* return the new project object again */
    })
     .then((newProjectObject) => props.history.push(`/${newProjectObject.id}`)) /* once everything is saved, route the user to the maker project dashboard for the newly created project */
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
                <Form.Control ref={register({valueAsNumber: true})} name="boatLength" type="boatLength" placeholder="xx" />
            </Form.Group>
            <Form.Group controlId="form__model">
                <Form.Label>Model</Form.Label>
                <Form.Control ref={register} name="model" type="model" />
            </Form.Group>
            <Form.Group controlId="form__year">
                <Form.Label>Year</Form.Label>
                <Form.Control ref={register({valueAsNumber: true})} name="year" type="year" placeholder="xxxx" />
            </Form.Group>
            <Form.Group controlId="form__client">
                <Form.Label>Client</Form.Label>
                <Form.Control ref={register({valueAsNumber: true})} name="userId" as="select">
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
                <Form.Control ref={register({valueAsNumber: true})} name="motor" as="select">
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
                <Form.Control ref={register({valueAsNumber: true})} name="navSystem" as="select">
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
                <Form.Control ref={register({valueAsNumber: true})} name="trailer" as="select">
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
                <Form.Control ref={register({valueAsNumber: true})} name="seadekColorId" as="select">
                <option value="0">Select a color</option>
                {
                    seadekColors.map(color => {
                       return <option key={color.id} value={color.id}>{color.color}</option>
                    })
                }
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="form__paintType">
                <Form.Label>Paint Finish Type</Form.Label>
                <Form.Control ref={register({valueAsNumber: true})} name="paintTypeId" as="select">
                <option value="0">Select a type</option>
                {
                    paintTypes.map(type => {
                       return <option key={type.id} value={type.id}>{type.type}</option>
                    })
                }
                </Form.Control>
            </Form.Group>
            <Form.Group controlId="form__swimPlatform">
                <Form.Check inline name="swimPlatform" type="checkbox" label="Add swim platform" ref={register} />
            </Form.Group>
            <Button variant="primary" type="submit" disabled={formState.isSubmitting}>Submit</Button>
        </Form>
        </>
    )
}