import React, { useEffect, useContext, useState, useRef } from "react"

// necessary contexts: projects, projectTasks, users
import { ProjectContext } from "../projects/ProjectsDataProvider"
import { ProjectTaskContext } from "../tasks/ProjectTasksDataProvider"
// necessary component
import { ProjectDetail } from "../projects/ProjectDetail"
// import doughnut graph component from chartjs
import {Doughnut} from 'react-chartjs-2';


export const ClientDashboard = (props) => {
    // pulling in the contexts needed
    const { projects, getProjects } = useContext(ProjectContext)
    const { projectTasks, getProjectTasks } = useContext(ProjectTaskContext)

    const [project, setProject] = useState({user: {}})
    const [filteredProjectTasks, setFiltered] = useState([])
    // projectTasks filtered by isComplete status
    const [complete, setComplete] = useState(0)
    const [incomplete, setIncomplete] = useState(0)

    useEffect(()=> {
        getProjectTasks().then(getProjects)
    }, [])

    useEffect(() => {
        console.log("dashboard params", props.match.params)
        const clientId = parseInt(props.match.params.userId) 
        console.log(projects)
        const foundProject = projects.find(p => p.userId === clientId) || {}
        console.log(foundProject)
        // project = foundProject
        setProject(foundProject)
    }, [projects])

    useEffect(() => {
        console.log("found proj", project)

        const filteredProjectTasks = projectTasks.filter(obj => obj.projectId === project.id)
        setFiltered(filteredProjectTasks)
    }, [project])
    
    useEffect(() => {
        console.log("FPTs", filteredProjectTasks)
        const done = filteredProjectTasks.filter(task => task.isComplete === true)
        setComplete(done.length)
        const notDone = filteredProjectTasks.filter(task => task.isComplete === false)
        setIncomplete(notDone.length)
    }, [filteredProjectTasks])
    
    // doughnut data
    const data = {
        labels: [
            'complete',
          'incomplete'
        ],
        datasets: [{
          data: [complete, incomplete],
          backgroundColor: [
          '#FF6384',
          '#FFCE56'
          ],
          hoverBackgroundColor: [
          '#FF6384',
          '#FFCE56'
          ]
        }]
      };

    return (
        <>
            {/* <h3>Welcome, {project.user.firstName}!</h3> */}
            <div>
                <Doughnut data={data} />
            </div>
            <div>
                {/* <ProjectDetail {...props} projectId={project.id}/> */}
            </div>
            
        </>
    )
}

