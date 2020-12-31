import React, { useContext, useEffect } from "react"
import { ProjectContext } from "./ProjectsDataProvider"
import { Link } from "react-router-dom"
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import "./Projects.css"
import { ListGroupItem } from "react-bootstrap"


export const ProjectsList = (props) => {
    const { projects, getProjects } = useContext(ProjectContext)

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <Container>
            <div className="projectList__header">
                <h1>Projects</h1>
                <Button variant="secondary" onClick={() => props.history.push("/create")}>
                    + Project
                </Button>
            </div>
            <article className="projectsList">
                <ListGroup>
                    {
                        projects.map(project => {
                            return (
                                <ListGroup.Item action href={`/${project.userId}`} key={project.id}>"{project.boatName}" — {project.boatLength}' {project.model} {project.year}</ListGroup.Item>
                            )
                    })
                }
                </ListGroup>
            </article>
        </Container>
    )
}