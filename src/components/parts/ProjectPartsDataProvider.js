import React, { useState } from "react"


export const ProjectPartContext = React.createContext()

export const ProjectPartsProvider = (props) => {
    const [projectParts, setProjectParts] = useState([])

    const getProjectParts = () => {
        return fetch("http://localhost:8088/projectParts?_expand=part")
            .then(res => res.json())
            .then(setProjectParts)
    }

    const addProjectPart = projectPart => {
        return fetch("http://localhost:8088/projectParts", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectPart)
        })
            .then(getProjectParts)
    }

    return (
        <ProjectPartContext.Provider value={{
            projectParts, getProjectParts, addProjectPart
        }}>
            {props.children}
        </ProjectPartContext.Provider>
    )
}