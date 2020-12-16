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
    const { addProjectTasks } = useContext(ProjectTaskContext)

    // const [filteredTasks, setFiltered] = useState([])

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
        console.log("submitted project data:", data)
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
            // filter the tasks based on form choices
           const filteredTasks = []
           tasks.forEach(task => {
               if (task.taskTypeId ===1 || task.taskTypeId === 5){
                    filteredTasks.push(task)
               }
               if (newProjectObject.swimPlatform && task.taskTypeId === 4) {
                   filteredTasks.push(task)
               }
               if (newProjectObject.paintTypeId === 1 && task.taskTypeId === 2){
                   filteredTasks.push(task)
               }
               if (newProjectObject.paintTypeId === 2 && task.taskTypeId === 3){
                   filteredTasks.push(task)
               }
            })
            console.log(filteredTasks)


            /* 
                I really think this is where the projectTasks need to get created
                but in order to do that, I think I would need to wrap this form 
                module in the TaskProvider and I think the ProjectTaskProvider, 
                then would need to import the contexts here and use the tasks with getTasks
                and addProjectTask. Then would need to need to useState and filter the tasks
                based on the conditions of the form, still unsure how to write that. Actually, would
                I declare a variable and set it to an empty array and filter and .push? Do I also need
                to wrap the form in the taskTypeProvider and import that context and get the taskTypes and 
                getTaskTypes? Would I say "if newProjectObject.swimPlatform === true" 
                Then would need to .map that filtered array and call addProjectTask for each. Or, actually
                could .forEach, I think. 
            */

            return newProjectObject
    })
     .then((newProjectObject) => props.history.push(`/${newProjectObject.id}`))
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