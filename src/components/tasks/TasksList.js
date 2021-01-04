import React, { useContext, useEffect, useState } from "react"
// import needed contexts
import { ProjectContext } from "../projects/ProjectsDataProvider"
import { ProjectTaskContext } from "./ProjectTasksDataProvider"

// React-Bootstrap Component imports
import Form from "react-bootstrap/Form"
import Container from "react-bootstrap/Container"


export const TasksList = (props) => {
//  Contexts
    const { projectTasks, patchProjectTask, getProjectTasksByProjectId } = useContext(ProjectTaskContext)
    const { getProjectByUserId } = useContext(ProjectContext)
//  State variables
    const [project, setProject] = useState({user:{}, seadekColor: {}, paintType: {}})
    const [relatedProjectTasks, setRelated] = useState([{task: {}}])
    
// find the selected project using the user id from params and set in state
useEffect(() => {
        
    const clientId = parseInt(props.match.params.userId) 
    
    getProjectByUserId(clientId)
        .then((returnedProject) => {
            setProject(returnedProject[0])
        })
   
    }, [])
// watch for the project state variable to update and get all projectTasks related to that project
// watch the state of projectTasks and run whenever it changes
useEffect(() => {
    getProjectTasksByProjectId(project.id)
        .then((r) => setRelated(r))
}, [project, projectTasks])

// called from onChange whenever a checkbox is checked or unchecked
const isCompleteToggle = (evt) => {
    if (evt.target.checked === true) {
        patchProjectTask(parseInt(evt.target.id), {isComplete: true})
    } else {
        patchProjectTask(parseInt(evt.target.id), {isComplete: false})
    }
}

    return (
        <>
        <h3>Task List:</h3>
        <Form>
        <Form.Group controlId="form__checklist">
                {
                    relatedProjectTasks.map(obj => (
                    <Form.Check name="checkbox" key={`task--${obj.id}`} id={obj.id} type="checkbox" label={obj.task.text} checked={obj.isComplete} onChange={evt => {
                        isCompleteToggle(evt)
                    }} />)
                    )
                }
        </Form.Group>
        </Form>
        </>
    )
}