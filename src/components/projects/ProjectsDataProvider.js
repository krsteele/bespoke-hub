import React, { useState } from "react"

export const ProjectContext = React.createContext()

export const ProjectProvider = (props) => {
    const [projects, setProjects] = useState([])
    const [ searchTerms, setTerms ] = useState("")

    const getProjects = () => {
        return fetch("http://localhost:8088/projects?_expand=user")
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
            .then(res => res.json())
            .then((newProjectObject)=> {
                getProjects()
                return newProjectObject
            })
    }

    const getProjectById = (id) => {
        return fetch(`http://localhost:8088/projects/${id}?_expand=user&_expand=seadekColor&_expand=paintType`)
            .then(res => res.json())
    }
    const getProjectByUserId = (id) => {
        return fetch(`http://localhost:8088/projects?userId=${id}&_expand=user&_expand=seadekColor&_expand=paintType`)
            .then(res => res.json())
    }

    const deleteProject = id => {
        return fetch(`http://localhost:8088/projects/${id}`, {
            method: "DELETE"
        })
            .then(getProjects)
    }

    return (
        <ProjectContext.Provider value={{
            projects, addProject, getProjects, getProjectById, deleteProject, searchTerms, setTerms, getProjectByUserId
        }}>
            {props.children}
        </ProjectContext.Provider>
    )
}