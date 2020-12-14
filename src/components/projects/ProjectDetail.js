import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { ProjectContext } from "./ProjectsDataProvider"
import { ProjectPartContext } from "../parts/ProjectPartsDataProvider"

export const ProjectDetail = (props) => {
    const { projects, getProjectById } = useContext(ProjectContext)
    const { projectParts, getProjectParts } = useContext(ProjectPartContext)

    const [project, setProject] = useState({user: {}, seadekColor: {}, paintType: {}})
    const [motor, setMotor] = useState({part: {}})
    const [navSystem, setNavSystem] = useState({part: {}})
    const [trailer, setTrailer] = useState({part: {}})

    useEffect(() => {
        const projectId = parseInt(props.match.params.projectId)
        getProjectById(projectId)
            .then(setProject)
    }, [])

    useEffect(() => {
        const findMotor = projectParts.filter(pp => pp.projectId === project.id).find(pp => pp.partId === 1)
        setMotor(findMotor)
    }, [project, projectParts])
    
    useEffect(() => {
        const findNav = projectParts.filter(pp => pp.projectId === project.id).find(pp => pp.partId === 2)
        setNavSystem(findNav)
    }, [project, projectParts])
    
    useEffect(() => {
        const findTrailer = projectParts.filter(pp => pp.projectId === project.id).find(pp => pp.partId === 3)
        setTrailer(findTrailer)
    }, [project, projectParts])

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
                <p>Client:</p>
                <Link key={project.user.id} to={`/people/${project.user.id}`}>
                    <p>{project.user.firstName} {project.user.lastName}</p>
                </Link>
                <Link to={"#clientdashboard"}>
                    <p>View client dashboard</p>
                </Link>
            </div>
            <div>
                <p>Boat details:</p>
                <p>Motor: </p>
                <p>GPS: </p>
                <p>Trailer: </p>
                <p>Seadek Color: {project.seadekColor.color}</p>
                <p>Paint Finish: {project.paintType.type}</p>
                <p>Swim Platform: {project.swimPlatform === true ? "yes" : "no"}</p>
            </div>
        </>
    )
}