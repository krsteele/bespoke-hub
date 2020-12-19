import React from "react"
import { UserDetail } from "../users/UserDetail"
import { ProjectDetail } from "../projects/ProjectDetail"
import { TasksList } from "../tasks/TasksList"



export const MakerProjectDashboard = (props) => {
   return (
        <>   
              
            <ProjectDetail {...props} />
            <TasksList {...props} />
        </>
   ) 

}
