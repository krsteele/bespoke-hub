import React from "react"
import { Route } from "react-router-dom"
import { ClientViewList } from "./client-views/ClientViewList"
import { ProjectsList } from "./projects/ProjectsList"
import { UserProvider } from "./users/UsersDataProvider"
import { UsersList } from "./users/UsersList"
import { UserDetail } from "./users/UserDetail"
import { ProjectProvider } from "./projects/ProjectsDataProvider"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <ProjectsList />
            </Route>
            <UserProvider>
                <ProjectProvider>
                    <Route exact path="/people" render={
                        props => <UsersList {...props} />
                    } />
                    <Route path="/people/:userId(\d+)" render={
                        props => <UserDetail {...props} />
                    } />
                </ProjectProvider>
            </UserProvider>
            <Route exact path="/dashboards">
                <ClientViewList />
            </Route>
        </>
    )
}