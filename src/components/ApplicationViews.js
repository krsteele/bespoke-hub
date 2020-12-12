import React from "react"
import { Route } from "react-router-dom"
import { ClientViewList } from "./client-views/ClientViewList"
import { ProjectsList } from "./projects/ProjectsList"
import { UserProvider } from "./users/UsersDataProvider"
import { UsersList } from "./users/UsersList"
import { UserDetail } from "./users/UserDetail"
import { ProjectProvider } from "./projects/ProjectsDataProvider"
import { UserTypeProvider } from "./users/UserTypeDataProvider"
import { UserForm } from "./users/UserForm"


export const ApplicationViews = () => {
    return (
        <>
            <ProjectProvider>
                <Route exact path="/">
                    <ProjectsList />
                </Route>
            </ProjectProvider>

            <UserProvider>
                <UserTypeProvider>
                    <ProjectProvider>
                        <Route exact path="/people" render={
                            props => <UsersList {...props} />
                        } />
                        <Route path="/people/:userId(\d+)" render={
                            props => <UserDetail {...props} />
                        } />
                        <Route exact path="/people/create" render={
                            props => <UserForm {...props} />
                        } />
                    </ProjectProvider>
                </UserTypeProvider>
            </UserProvider>
            <Route exact path="/dashboards">
                <ClientViewList />
            </Route>
        </>
    )
}