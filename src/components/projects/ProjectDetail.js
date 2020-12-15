import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { ProjectContext } from "./ProjectsDataProvider"
import { ProjectPartContext } from "../parts/ProjectPartsDataProvider"

export const ProjectDetail = (props) => {
    const { getProjectById } = useContext(ProjectContext)
    const { projectParts, getProjectParts } = useContext(ProjectPartContext)

    const [project, setProject] = useState({user: {}, seadekColor: {}, paintType: {}})
    const [filteredProjectParts, setfilteredParts] = useState({part: {}})

    useEffect(() => {
        const projectId = parseInt(props.match.params.projectId)
        getProjectById(projectId)
            .then(setProject)
        }, [])

    useEffect(() => {
        getProjectParts()
    }, [project])
    
    useEffect(() => {
        const filtered = projectParts.filter(obj => obj.projectId === project.id)
        console.log("filtered project parts", filtered)
        setfilteredParts(filtered)
    }, [projectParts])

    

    // What if I just filter for the parts for this project and then map those below?????

    useEffect(() => {
        const findMotor = projectParts.filter(pp => pp.projectId === project.id).find(pp => pp.part.partTypeId === 1)
    //    console.log("found motor:", findMotor)
    //    console.log(project)
    //    console.log(projectParts)
        setMotor(findMotor)
    }, [projectParts])

    useEffect(()=> {
        console.log("pp's after set", filteredProjectParts)
    }, [filteredProjectParts])
    
    // useEffect(() => {
    //     const findNav = projectParts.filter(pp => pp.projectId === project.id).find(pp => pp.part.partTypeId === 2)
    //     setNavSystem(findNav)
    // }, [projectParts])
    
    // useEffect(() => {
    //     const findTrailer = projectParts.filter(pp => pp.projectId === project.id).find(pp => pp.part.partTypeId === 3)
    //     setTrailer(findTrailer)
    // }, [projectParts])

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
                       return <p>{obj.part.name}</p>
                   }) 
                }
                {/* <p>Motor: {motor.part.name}</p> */}
                {/* <p>GPS: {navSystem.part.name}</p>
                <p>Trailer: {trailer.part.name}</p> */}
                <p>Seadek Color: {project.seadekColor.color}</p>
                <p>Paint Finish: {project.paintType.type}</p>
                <p>Swim Platform: {project.swimPlatform === true ? "yes" : "no"}</p>
            </div>
        </>
    )
}