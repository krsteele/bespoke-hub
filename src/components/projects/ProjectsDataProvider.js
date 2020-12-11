import React, { useState } from "react"

export const ProjectContext = React.createContext()

export const ProjectProvider = (props) => {
    const [projects, setProjects] = useState([])
    const [ searchTerms, setTerms ] = useState("")

    const getProjects = () => {
        return fetch("http://localhost:8088/projects")
            .then(res => res.json())
            .then(setProjects)
    }

    const addProject = project => {
        return fetch("http://localhost:8088/projects", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
            .then(getProjects)
    }

    const getProjectById = (id) => {
        return fetch(`http://localhost:8088/projects/${ id }?_expand=user&_expand=seadekColor&_expand=finishType`)
            .then(res => res.json())
    }

    const deleteProject = projectId => {
        return fetch(`http://localhost:8088/animals/${projectId}`, {
            method: "DELETE"
        })
            .then(getProjects)
    }

    const updateProject = project => {
        return fetch(`http://localhost:8088/projects/${project.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(project)
        })
        .then(getProjects)
    }
    return (
        <ProjectContext.Provider value={{
            projects, addProject, getProjects, getProjectById, deleteProject, updateProject, searchTerms, setTerms
        }}>
            {props.children}
        </ProjectContext.Provider>
    )
}