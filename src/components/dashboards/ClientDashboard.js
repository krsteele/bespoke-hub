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

    const [project, setProject] = useState({user:{}, seadekColor: {}, paintType: {}})
    const [user, setUser] = useState({})
    const [filteredProjectTasks, setFiltered] = useState([])
    const [relatedProjectTasks, setRelated] = useState([])
    // projectTasks filtered by isComplete status
    const [complete, setComplete] = useState(0)
    const [incomplete, setIncomplete] = useState(0)
    const [percentageComplete, setPercentage] = useState(null)
    
    useEffect(() => {
        
        const clientId = parseInt(props.match.params.userId) 
        
        getProjectByUserId(clientId)
            .then((returnedProject) => {
                setProject(returnedProject)
                return returnedProject})
            .then((returnedReturnedProject) => {
                // console.log("returnedReturnedProject", returnedReturnedProject)
                getProjectTasksByProjectId(returnedReturnedProject[0].id)
                    .then((r)=> setRelated(r))
            })
        
        getUserById(clientId)
        .then(setUser)

        }, [])

    useEffect(() => {
        const done = relatedProjectTasks.filter(task => task.isComplete === true)
        setComplete(done.length)
        const notDone = relatedProjectTasks.filter(task => task.isComplete === false)
        setIncomplete(notDone.length)
    }, [relatedProjectTasks])
    
    useEffect(() => {
        console.log("why?", project.boatName)
        const percentage = (complete / (complete + incomplete)) * 100
        setPercentage(percentage)
    }, [complete, incomplete])
    
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
            <h5>"{project.boatName}" is {percentageComplete}% complete</h5>
            <div>
                <Doughnut data={data} />
            </div>
            <div>
                <ProjectDetail {...props} />
            </div>
            
        </>
    )
}

