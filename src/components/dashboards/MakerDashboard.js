import React, {useContext, useState, useEffect} from "react"
import { ProjectDetail } from "../projects/ProjectDetail"
import { TasksList } from "../tasks/TasksList"

import { UserContext } from "../users/UsersDataProvider"
import { Link } from "react-router-dom"
// import react-bootstrap components
import Container from 'react-bootstrap/Container'



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
            <section className="user">
                <h3>Client:</h3>
                <Link key={user.id} to={`/people/${user.id}`}><h5 className="user__name">{user.firstName} {user.lastName}</h5></Link>
                <Link to={`/dashboards/${user.id}`}>
                    <p>View client dashboard</p>
                </Link>
                <div className="user__email">Email: {user.email}</div>
                <div className="user__phone">Phone: {user.phone}</div>
                <div className="user__password">Password: {user.password}</div>
            </section>
            <section className="project">
                <ProjectDetail {...props} />
            </section>
            <section className="tasks">
                <TasksList {...props} />
            </section>
        </Container>
   ) 

}
