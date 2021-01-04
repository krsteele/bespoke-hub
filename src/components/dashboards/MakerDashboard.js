import React, {useContext, useState, useEffect} from "react"
import { ProjectDetail } from "../projects/ProjectDetail"
import { TasksList } from "../tasks/TasksList"
import { DeleteProject } from "../projects/DeleteProjectButton"

import { UserContext } from "../users/UsersDataProvider"
import { Link } from "react-router-dom"
// import react-bootstrap components
import Container from 'react-bootstrap/Container'
import Card from 'react-bootstrap/Card'



export const MakerProjectDashboard = (props) => {

    const { getUserById} = useContext(UserContext)
    const [user, setUser] = useState({})

    useEffect(() => {
        
        const clientId = parseInt(props.match.params.userId) 
        
        getUserById(clientId)
        .then(setUser)

        }, [])

   return (
        <Container>   
            <section className="project">
                <ProjectDetail {...props} />
            </section>
            <Card>
                <Card.Header><h3>Client</h3></Card.Header>
                <Card.Body>
                    <Link key={user.id} to={`/people/${user.id}`}>{user.firstName} {user.lastName}</Link>
                    <Link to={`/dashboards/${user.id}`}>
                        <p>View client dashboard</p>
                    </Link>
                </Card.Body>
            </Card>
            <section className="tasks">
                <TasksList {...props} />
            </section>
            <section>
                <DeleteProject {...props} />
            </section>
        </Container>
   ) 

}
