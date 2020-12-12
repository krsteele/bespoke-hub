import React, { useContext, useEffect } from "react"
import { ProjectContext } from "./ProjectsDataProvider"
import { Link } from "react-router-dom"

export const ProjectsList = (props) => {
    const { projects, getProjects } = useContext(ProjectContext)

    useEffect(() => {
        console.log("I'm ProjectsList initial render!")
        getProjects()
    }, [])

    useEffect(() => {
        console.log("I'm ProjectsList second render with data:", projects)
    }, [projects])

    return (
        <div className="projects">
            <h1>Projects</h1>
            <button onClick={() => props.history.push("/projects/create")}>
                Add New
            </button>
            <article className="projectsList">
                {
                    projects.map(project => {
                        return <Link key={project.id} to={`/projects/${project.id}`}>
                            <p>"{project.boatName}" — {project.boatLength}' {project.model} {project.year}</p>
                        </Link>
                    })
                }
            </article>
        </div>
    )
}