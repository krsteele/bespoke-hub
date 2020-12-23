import React, { useContext, useEffect, useState } from "react"
// import needed contexts
import { TaskContext } from "./TasksDataProvider"
import { ProjectContext } from "../projects/ProjectsDataProvider"
import { ProjectTaskContext } from "./ProjectTasksDataProvider"

// React-Hook-Form
import { useForm } from "react-hook-form"

// React-Bootstrap Component imports
import Form from "react-bootstrap/Form"


export const TasksList = (props) => {
    
    const { tasks, getTasks } = useContext(TaskContext)
    const { projectTasks, getProjectTasks, patchProjectTask, getProjectTasksByProjectId } = useContext(ProjectTaskContext)
    const { projects, getProjects, getProjectByUserId } = useContext(ProjectContext)
    
    const [project, setProject] = useState({user:{}, seadekColor: {}, paintType: {}})
    const [relatedProjectTasks, setRelated] = useState([{task: {}}])
    

// This is what I'm working on next. I need to get project by user id, then use the project id to get project tasks by project id. 
// Once those are set in state, I just need to make sure everything else is working accordingly. 

useEffect(() => {
        
    const clientId = parseInt(props.match.params.userId) 
    
    getProjectByUserId(clientId)
        .then((returnedProject) => {
            setProject(returnedProject[0])
        })
   
    }, [])

useEffect(() => {
    getProjectTasksByProjectId(project.id)
        .then((r) => setRelated(r))
}, [project, projectTasks])

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