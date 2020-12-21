import React, { useEffect, useContext, useState, useRef } from "react"

// necessary contexts: projects, projectTasks, users
import { ProjectContext } from "../projects/ProjectsDataProvider"
import { UserContext } from "../users/UsersDataProvider"
import { ProjectTaskContext } from "../tasks/ProjectTasksDataProvider"
// necessary component
import { ProjectDetail } from "../projects/ProjectDetail"
// import doughnut graph component from chartjs
import {Doughnut} from 'react-chartjs-2';


export const ClientDashboard = (props) => {
    // pulling in the contexts needed
    const { getProjectByUserId } = useContext(ProjectContext)
    const { getUserById } = useContext(UserContext)
    const { projectTasks, getProjectTasks, getProjectTasksByProjectId } = useContext(ProjectTaskContext)

    const [project, setProject] = useState({})
    const [user, setUser] = useState({})
    const [filteredProjectTasks, setFiltered] = useState([])
    const [relatedProjectTasks, setRelated] = useState([])
    // projectTasks filtered by isComplete status
    const [complete, setComplete] = useState(0)
    const [incomplete, setIncomplete] = useState(0)

    
    useEffect(() => {
        
        const clientId = parseInt(props.match.params.userId) 
        
        getProjectByUserId(clientId)
            .then((returnedProject) => {
                setProject(returnedProject)
                return returnedProject})
            .then((returnedReturnedProject) => {
                console.log("returnedReturnedProject", returnedReturnedProject)
                getProjectTasksByProjectId(returnedReturnedProject[0].id)
                    .then((r)=> setRelated(r))
            })
            // .then((result) => setRelated(result))
        
        getUserById(clientId)
        .then(setUser)

        }, [])

    useEffect(() => {
        console.log("related project Tasks", relatedProjectTasks)
    }, [relatedProjectTasks])
    
    useEffect(() => {
        const done = relatedProjectTasks.filter(task => task.isComplete === true)
        setComplete(done.length)
        const notDone = relatedProjectTasks.filter(task => task.isComplete === false)
        setIncomplete(notDone.length)
    }, [relatedProjectTasks])
    
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
            <h3>Welcome, {user.firstName}!</h3>
            <div>
                <Doughnut data={data} />
            </div>
            <div>
                {/* <ProjectDetail {...props} projectId={project.id}/> */}
            </div>
            
        </>
    )
}

