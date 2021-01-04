import React, { useEffect, useState, useContext } from "react"
import { ProjectContext } from "./ProjectsDataProvider"
import Button from "react-bootstrap/Button"

export const DeleteProject = (props) => {
    const { getProjectByUserId, deleteProject } = useContext(ProjectContext)
    const [project, setProject] = useState({})

    useEffect(() => {       
        const userId = parseInt(props.match.params.userId)
       
        getProjectByUserId(userId)
            .then((returnedProject) => {
                setProject(returnedProject[0])
            })
        }, [])


    return (
        <Button className="btn" variant="secondary" onClick={() => deleteProject(project.id).then(()=> props.history.push("/"))}>Delete Project</Button> 
    )
}