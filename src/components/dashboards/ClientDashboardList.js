import React, { useContext, useEffect } from "react"
import { ProjectContext } from "../projects/ProjectsDataProvider"
import { Link } from "react-router-dom"
// import react-bootstrap components
import ListGroup from 'react-bootstrap/ListGroup'
import Container from 'react-bootstrap/Container'

export const ClientDashboardList = (props) => {
    const { projects, getProjects } = useContext(ProjectContext)

    useEffect(() => {
        getProjects()
    })

    return (
        <Container className="dashboards">
            <h1>Client Dashboards</h1>
    
            <article className="clientDashboardList">
                <ListGroup>
                    {
                    projects.map(project => {
                        return <ListGroup.Item action key={project.id} href={`/dashboards/${project.user.id}`}>{project.user.firstName} {project.user.lastName} — "{project.boatName}" — {project.boatLength}' {project.model} {project.year}</ListGroup.Item>
                    })
                }
                </ListGroup>
            </article>
        </Container>
    )
}