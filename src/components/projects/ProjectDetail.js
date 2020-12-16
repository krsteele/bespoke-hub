import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { ProjectContext } from "./ProjectsDataProvider"
import { ProjectPartContext } from "../parts/ProjectPartsDataProvider"
import { PartTypeContext } from "../parts/PartTypesProvider"

export const ProjectDetail = (props) => {
    const { getProjectById } = useContext(ProjectContext)
    const { projectParts, getProjectParts } = useContext(ProjectPartContext)
    const { partTypes, getPartTypes } = useContext(PartTypeContext)

    const [project, setProject] = useState({user: {}, seadekColor: {}, paintType: {}})
    const [filteredProjectParts, setfilteredParts] = useState([])
    // console.log("this is the info you are looking for", filteredProjectParts)
    useEffect(() => {
        const projectId = parseInt(props.match.params.projectId)
        getProjectById(projectId)
            .then(setProject)
        }, [])

    useEffect(() => {
        getProjectParts()
        getPartTypes()
    }, [project])
    
    useEffect(() => {
        const filtered = projectParts.filter(obj => obj.projectId === project.id)
        // console.log("filtered project parts", filtered)
        setfilteredParts(filtered)
    }, [projectParts])
    // console.log(filteredProjectParts)

    // useEffect(()=> {
    //     console.log("pp's after set", filteredProjectParts)
    // }, [filteredProjectParts])

    return (
        <>
        <h3>"{project.boatName}" — {project.boatLength}' {project.model} {project.year}</h3>
        <button onClick={() => {
                console.log("edit project:", project.id)
                // props.history.push(`/edit/${project.id}`)
                }}>
                Edit
            </button>
            <button onClick={() => console.log("delete project:", project.id)}>
                Delete
            </button>
            <div>
                <h5>Client:</h5>
                <Link key={project.user.id} to={`/people/${project.user.id}`}>
                    <p>{project.user.firstName} {project.user.lastName}</p>
                </Link>
                <Link to={`/dashboard/${project.user.id}`}>
                    <p>View client dashboard</p>
                </Link>
            </div>
            <div>
                <h5>Boat details:</h5>
                {
                   filteredProjectParts.map(obj => {
                       if (obj.hasOwnProperty('part')) {
                        const foundType = partTypes.find(type => type.id === obj.part.partTypeId)
                           return <p key={obj.part.id}>
                               {foundType.type}: {obj.part.name}</p>
                       }
                   }) 
                }
                <p>Seadek Color: {project.seadekColor.color}</p>
                <p>Paint Finish: {project.paintType.type}</p>
                <p>Swim Platform: {project.swimPlatform === true ? "yes" : "no"}</p>
            </div>
        </>
    )
}