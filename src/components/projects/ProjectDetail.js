import React, { useEffect, useState, useContext } from "react"
// import necessary contexts
import { ProjectContext } from "./ProjectsDataProvider"
import { ProjectPartContext } from "../parts/ProjectPartsDataProvider"
import { PartTypeContext } from "../parts/PartTypesProvider"

export const ProjectDetail = (props) => {
//   needed contexts
    const { getProjectByUserId, deleteProject } = useContext(ProjectContext)
    const { getProjectPartsByProjectId } = useContext(ProjectPartContext)
    const { partTypes, getPartTypes } = useContext(PartTypeContext)
//  state variables
    const [project, setProject] = useState({user:{}, seadekColor: {}, paintType: {}})
    const [relatedProjectParts, setParts] = useState([])

//  get the selected project using the user id from props
    useEffect(() => {       
        const userId = parseInt(props.match.params.userId)
       
        getProjectByUserId(userId)
            .then((returnedProject) => {
                setProject(returnedProject[0])
            })
        }, [])
//  watch for the project state update and get PartTypes and the projectParts related to the chosen project
    useEffect(() => {
        getPartTypes()
        getProjectPartsByProjectId(project.id)
            .then(setParts)
    }, [project])


    return (
        <>
        
            <div>
                <h3>Boat details:</h3>
                <h5>"{project.boatName}" — {project.boatLength}' {project.model} {project.year}</h5>
                {
                   relatedProjectParts.map(obj => {
                       if (obj.hasOwnProperty('part')) {
                        const foundType = partTypes.find(type => type.id === obj.part.partTypeId)
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
                <button onClick={() => deleteProject(project.id).then(()=> props.history.push("/"))}>Delete Project</button> 
                : 
                ""
            }
        </>
    )
}