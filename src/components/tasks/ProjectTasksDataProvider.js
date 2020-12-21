import React, { useState } from "react"


export const ProjectTaskContext = React.createContext()

export const ProjectTasksProvider = (props) => {
    const [projectTasks, setProjectTasks] = useState([])

    const getProjectTasks = () => {
        return fetch("http://localhost:8088/projectTasks?_expand=task")
            .then(res => res.json())
            .then(setProjectTasks)
    }

    const getProjectTasksByProjectId = (id) => {
        console.log("PT GET id", id)
        return fetch(`http://localhost:8088/projectTasks?projectId=${id}`)
            .then(res => res.json())
    }

    const addProjectTask = projectTask => {
        return fetch("http://localhost:8088/projectTasks", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectTask)
        })
            .then(getProjectTasks)
    }

    const patchProjectTask = (id, update) => {
        return fetch(`http://localhost:8088/projectTasks/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(update)
        })
        .then(getProjectTasks)
    }

    return (
        <ProjectTaskContext.Provider value={{
            projectTasks, getProjectTasks, addProjectTask, patchProjectTask, getProjectTasksByProjectId
        }}>
            {props.children}
        </ProjectTaskContext.Provider>
    )
}