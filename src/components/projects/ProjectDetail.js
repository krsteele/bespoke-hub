import React, { useEffect, useState, useContext } from "react"
// import necessary contexts
import { ProjectContext } from "./ProjectsDataProvider"
import { ProjectPartContext } from "../parts/ProjectPartsDataProvider"
import { PartTypeContext } from "../parts/PartTypesProvider"
// react-bootstrap components
import Card from "react-bootstrap/Card"
import ListGroup from 'react-bootstrap/ListGroup'

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
        
            <Card>
                <Card.Header><h3>Boat details</h3></Card.Header>
                <Card.Body>
                    <Card.Title>"{project.boatName}" — {project.boatLength}' {project.model} {project.year}</Card.Title>
                    <ListGroup className="list-group-flush">
                        {
                        relatedProjectParts.map(obj => {
                            if (obj.hasOwnProperty('part')) {
                                const foundType = partTypes.find(type => type.id === obj.part.partTypeId)
                                return   <ListGroup.Item key={obj.id}>
                                                <b>{foundType.type}</b>: {obj.part.name}
                                            </ListGroup.Item>
                            }
                        }) 
                        }
                        <ListGroup.Item><b>Seadek Color</b>: {project.seadekColor.color}</ListGroup.Item>
                        <ListGroup.Item><b>Paint Finish</b>: {project.paintType.type}</ListGroup.Item>
                        <ListGroup.Item><b>Swim Platform</b>: {project.swimPlatform === true ? "yes" : "no"}</ListGroup.Item>
                    </ListGroup>
                </Card.Body>
            </Card>
            {/* {
                localStorage.getItem("app_userType_id") === "1" 
                ? 
                <Button className="btn" variant="secondary" onClick={() => deleteProject(project.id).then(()=> props.history.push("/"))}>Delete Project</Button> 
                : 
                ""
            } */}
        </>
    )
}