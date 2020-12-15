import React, { useState } from "react"


export const ProjectTaskContext = React.createContext()

export const ProjectTasksProvider = (props) => {
    const [projectTasks, setProjectTasks] = useState([])

    const getProjectTasks = () => {
        return fetch("http://localhost:8088/projectTasks?_expand=task")
            .then(res => res.json())
            .then(setProjectTasks)
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

    return (
        <ProjectTaskContext.Provider value={{
            projectTasks, getProjectTasks, addProjectTask
        }}>
            {props.children}
        </ProjectTaskContext.Provider>
    )
}