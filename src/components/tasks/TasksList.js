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
    const { projectTasks, getProjectTasks, patchProjectTask } = useContext(ProjectTaskContext)
    const { projects, getProjects } = useContext(ProjectContext)
    
    const [filteredProjectTasks, setFiltered] = useState([])
    
    //  Grab needed functions from React-Form-Hook
    // const { register, formState } = useForm()

    useEffect(() => {
        getProjectTasks().then(getTasks).then(getProjects)
    }, [])
    
    useEffect(() => {
        const projId = parseInt(props.match.params.projectId)
        // console.log("project id from params", projId)
        const filteredProjectTasks = projectTasks.filter(obj => obj.projectId === projId)
        // console.log("filtered pt before set:", filteredProjectTasks)
        setFiltered(filteredProjectTasks)
    }, [projectTasks])

    const isCompleteToggle = (evt) => {
        if (evt.target.checked === true) {
            patchProjectTask(parseInt(evt.target.id), {isComplete: true})
        } else {
            patchProjectTask(parseInt(evt.target.id), {isComplete: false})
        }
    }
// check out denise's repo gig denzelb5 on gh
    return (
        <>
        <h5>Task List</h5>
        <Form>
        <Form.Group controlId="form__checklist">
                {
                    filteredProjectTasks.map(obj => {
                    return (<Form.Check name="checkbox" key={obj.id} id={obj.id} type="checkbox" label={obj.task.text} checked={obj.isComplete} onChange={evt => {
                        isCompleteToggle(evt)
                    }} />)
                    })
                }
        </Form.Group>
        </Form>
        </>
    )
}