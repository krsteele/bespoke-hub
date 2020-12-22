import React, { useEffect, useState, useContext } from "react"
import { Link } from "react-router-dom"
import { ProjectContext } from "./ProjectsDataProvider"
import { ProjectPartContext } from "../parts/ProjectPartsDataProvider"
import { PartTypeContext } from "../parts/PartTypesProvider"
import { UserContext } from "../users/UsersDataProvider"

export const ProjectDetail = (props) => {
    const { getProjectByUserId, deleteProject } = useContext(ProjectContext)
    const { getUserById } = useContext(UserContext)
    const { projectParts, getProjectParts, getProjectPartsByProjectId } = useContext(ProjectPartContext)
    const { partTypes, getPartTypes } = useContext(PartTypeContext)

    const [project, setProject] = useState({user:{}, seadekColor: {}, paintType: {}})
    const [user, setUser] = useState({})
    const [relatedProjectParts, setParts] = useState([])
    // console.log("this is the info you are looking for", filteredProjectParts)
    useEffect(() => {       
        const userId = parseInt(props.match.params.userId)
       
        getProjectByUserId(userId)
            .then((returnedProject) => {
                // console.log("proj detail returned proj", returnedProject[0])
                setProject(returnedProject[0])
            })
        }, [])

    useEffect(() => {
        getPartTypes()
        getProjectPartsByProjectId(project.id)
            .then(setParts)
    }, [project])
    
    // useEffect(() => {
    //     const filtered = projectParts.filter(obj => obj.projectId === project.id)
    //     // console.log("filtered project parts", filtered)
    //     setfilteredParts(filtered)
    // }, [projectParts])
    // console.log(filteredProjectParts)

    // useEffect(()=> {
    //     console.log("pp's after set", relatedProjectParts)
    // }, [relatedProjectParts])

    return (
        <>
        <h3>"{project.boatName}" — {project.boatLength}' {project.model} {project.year}</h3>
        
            <div>
                <h5>Boat details:</h5>
                {
                   relatedProjectParts.map(obj => {
                       if (obj.hasOwnProperty('part')) {
                        const foundType = partTypes.find(type => type.id === obj.part.partTypeId)
                        // console.log("found type", foundType)
                           return   <div key={obj.id}>
                                        <p>{foundType.type}: {obj.part.name}</p>
                                    </div>
                       }
                   }) 
                }
                <p>Seadek Color: {project.seadekColor.color}</p>
                <p>Paint Finish: {project.paintType.type}</p>
                <p>Swim Platform: {project.swimPlatform === true ? "yes" : "no"}</p>
            </div>
            {
                localStorage.getItem("app_userType_id") === "1" 
                ? 
                <button onClick={() => deleteProject(project.id).then(()=> props.history.push("/"))}>Delete</button> 
                : 
                ""
            }
        </>
    )
}