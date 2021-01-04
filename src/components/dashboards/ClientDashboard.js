import React, { useEffect, useContext, useState } from "react"

// necessary contexts: projects, projectTasks, users
import { ProjectContext } from "../projects/ProjectsDataProvider"
import { ProjectTaskContext } from "../tasks/ProjectTasksDataProvider"
// necessary component
import { ProjectDetail } from "../projects/ProjectDetail"
// import doughnut graph component from chartjs
// import {Doughnut} from 'react-chartjs-2';
// import react-bootstrap components
import Container from 'react-bootstrap/Container'
// import doughnut from grommet
import { Grommet, Box, Meter, Stack, Text } from 'grommet';
// import grommet theme object
import { grommetTheme } from "../../grommetTheme"



export const ClientDashboard = (props) => {
    // pulling in the contexts needed
    const { getProjectByUserId } = useContext(ProjectContext)
    const { projectTasks, getProjectTasksByProjectId } = useContext(ProjectTaskContext)
    // state variables
    const [project, setProject] = useState({user:{}, seadekColor: {}, paintType: {}})
    const [relatedProjectTasks, setRelated] = useState([])
    // projectTasks filtered by isComplete status
    const [complete, setComplete] = useState(0)
    const [incomplete, setIncomplete] = useState(0)
    const [percentageComplete, setPercentage] = useState(0)
    let percentage = percentageComplete || 0

    // useEffects
    // find the project that matches the user's id in the params
    useEffect(() => {
        
        const clientId = parseInt(props.match.params.userId) 
        
        getProjectByUserId(clientId)
            .then((returnedProject) => {
                setProject(returnedProject[0])
            })
        }, [])
    // find the project-task relationships related to the found project
    useEffect(() => {
        getProjectTasksByProjectId(project.id)
            .then((r)=> setRelated(r))
    }, [project, projectTasks])
    // filter the related project-task relationships by the status of the isComplete property
    useEffect(() => {
        const done = relatedProjectTasks.filter(task => task.isComplete === true)
        setComplete(done.length)
        const notDone = relatedProjectTasks.filter(task => task.isComplete === false)
        setIncomplete(notDone.length)
    }, [relatedProjectTasks])
    // watches the state of complete and incomplete and calculates the percentage of project completion
    useEffect(() => {
        const percentage = Math.round((complete / (complete + incomplete)) * 100)
        setPercentage(percentage)
    }, [complete, incomplete])
    
    // doughnut data
    // const data = {
    //     labels: [
    //         'complete',
    //       'incomplete'
    //     ],
    //     datasets: [{
    //       data: [complete, incomplete],
    //       backgroundColor: [
    //       '#FF6384', /* complete pink */
    //       '#FFCE56' /* incomplete yellow */
    //       ],
    //       hoverBackgroundColor: [
    //       '#FF6384',
    //       '#FFCE56'
    //       ]
    //     }]
    //   };

    return (
        <>
        <Container>
            <section className="clientDash">
                <div className="clientDash__welcome">
                    <h1>Welcome, {project.user.firstName}!</h1>
                    {/* <h3>"{project.boatName}" is {percentageComplete}% complete</h3> */}
                </div>

                <div className="clientDash__doughnut">
                    {/* <Doughnut data={data} /> */}
                    <Grommet theme={grommetTheme}>
                        <Box align="center" pad="large">
                            <Stack anchor="center">
                                <Meter
                                    type="circle"
                                    background="light-5"
                                    values={[{ value: percentage }]}
                                    size="medium"
                                    thickness="medium"
                                />
                                <Box direction="column" align="center" pad={{ bottom: 'xsmall' }}>
                                    <Text size="xxlarge" alignSelf="center" weight="normal">"{project.boatName}" is</Text>
                                    <Text size="xxlarge" alignSelf="center" weight="bold">
                                     {percentage}%
                                    </Text>
                                    <Text size="xxlarge" alignSelf="center" weight="normal">complete</Text>
                                </Box>
                            </Stack>
                        </Box>
                    </Grommet>
                </div>
            </section>
            <div>
                <ProjectDetail {...props} />
            </div>
        </Container>
                    </>
    )
}

