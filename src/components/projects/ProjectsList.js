import React, { useContext, useEffect } from "react"
import { ProjectContext } from "./ProjectsDataProvider"
import { Link } from "react-router-dom"

export const ProjectsList = (props) => {
    const { projects, getProjects } = useContext(ProjectContext)

    useEffect(() => {
        getProjects()
    }, [])

    return (
        <div className="projects">
            <h1>Projects</h1>
            <button onClick={() => props.history.push("/create")}>
                Add New Project
            </button>
            <article className="projectsList">
                <ul>
                    {
                    projects.map(project => {
                        return <Link key={project.id} to={`/${project.userId}`}>
                            <li>"{project.boatName}" — {project.boatLength}' {project.model} {project.year}</li>
                        </Link>
                    })
                }
                </ul>
            </article>
        </div>
    )
}