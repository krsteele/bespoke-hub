import React, { useContext, useEffect } from "react"
import { ProjectContext } from "../projects/ProjectsDataProvider"
import { Link } from "react-router-dom"

export const ClientDashboardList = (props) => {
    const { projects, getProjects } = useContext(ProjectContext)

    useEffect(() => {
        getProjects()
    }, [])

    useEffect(() => {
        console.log("client dashboard list:", projects)
    }, [projects])

    return (
        <div className="dashboards">
            <h1>Client Dashboards</h1>
    
            <article className="clientDashboardList">
                <ul>
                    {
                    projects.map(project => {
                        return <Link key={project.id} to={`/dashboards/${project.user.id}`}>
                            <li>{project.user.firstName} {project.user.lastName} — "{project.boatName}" — {project.boatLength}' {project.model} {project.year}</li>
                        </Link>
                    })
                }
                </ul>
            </article>
        </div>
    )
}