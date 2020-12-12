import React, { useEffect, useState, useContext } from "react"
import { ProjectContext } from "./ProjectsDataProvider"

export const ProjectDetail = (props) => {
    const { projects, getProjectById } = useContext(ProjectContext)

    const [project, setProject] = useState({user: {}, seadekColor: {}, paintType: {}})

    useEffect(() => {
        const projectId = parseInt(props.match.params.projectId)
        getProjectById(projectId)
            .then(setProject)
    })

    return (
        <div>Hi! I'm the project detail for {project.boatName}</div>
    )
}