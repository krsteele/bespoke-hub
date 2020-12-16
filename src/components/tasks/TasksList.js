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
    const { projectTasks, getProjectTasks } = useContext(ProjectTaskContext)
    const { projects, getProjects } = useContext(ProjectContext)
    
    const [filteredProjectTasks, setFiltered] = useState([])
    
    //  Grab needed functions from React-Form-Hook
    const { register, formState } = useForm()

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

    useEffect(() => {
        console.log("filtered and set Project Tasks:", filteredProjectTasks)
    }, [filteredProjectTasks])



    return (
        <>
        <h5>Task List</h5>
        <Form>
        <Form.Group controlId="form__checklist">
                {
                    filteredProjectTasks.map(obj => {
                    return (<Form.Check name={obj.id} key={obj.id} type="checkbox" label={obj.task.text} ref={register} />)
                    })
                }
        </Form.Group>
        </Form>
        </>
    )
}