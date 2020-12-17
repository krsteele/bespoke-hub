import React, { useEffect, useContext, useState } from "react"

// necessary contexts: projects, projectTasks, users
import { ProjectContext } from "../projects/ProjectsDataProvider"
import { ProjectTaskContext } from "../tasks/ProjectTasksDataProvider"
// necessary component
import { ProjectDetail } from "../projects/ProjectDetail"

// need project data and doughnut chart 
// do i need to put the doughnut here and import projectTask data to use in doughnut?

export const ClientDashboard = (props) => {
    // pulling in the contexts needed
    const { projects, getProjects } = useContext(ProjectContext)
    const { projectTasks, getProjectTasks } = useContext(ProjectTaskContext)

    const [project, setProject] = useState({user: {}, seadekColor: {}, paintType: {}})
    const [filteredProjectTasks, setFiltered] = useState([])
    // projectTasks filtered by isComplete status
    const [complete, setComplete] = useState([])
    const [incomplete, setIncomplete] = useState([])

    useEffect(()=> {
        getProjects().then(getProjectTasks)
    }, [])

    useEffect(() => {
        const clientId = parseInt(props.match.params.userId)
        const foundProject = projects.find(p => p.userId === clientId)
        setProject(foundProject)
    }, [projects])

    useEffect(() => {
        console.log("found proj", project)

        const filteredProjectTasks = projectTasks.filter(obj => obj.projectId === project.id)
        setFiltered(filteredProjectTasks)
    }, [project])
    
    useEffect(() => {
        const done = filteredProjectTasks.filter(task => task.isComplete === true)
        setComplete(done)
        const notDone = filteredProjectTasks.filter(task => task.isComplete === false)
        setIncomplete(notDone)
    }, [filteredProjectTasks])
    
    
    // useEffect(() => {
    //     // const numFinished = complete.length
    //     console.log("complete", complete.length)
    //     console.log("incomplete", incomplete.length)
    // }, [complete])

    return (
        <>
            <h3>Welcome, {project.user.firstName}!</h3>
            
        </>
    )
}

