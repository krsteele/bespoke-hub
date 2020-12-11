import React from "react"
import { Route } from "react-router-dom"
import { ClientViewList } from "./client-views/ClientViewList"
import { ProjectsList } from "./projects/ProjectsList"
import { UserProvider } from "./users/UsersDataProvider"
import { UsersList } from "./users/UsersList"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <ProjectsList />
            </Route>
            <UserProvider>
                <Route exact path="/people" render={
                    props => {
                        console.log("props from react router dom:", props)
                        return <UsersList {...props} />}
                    } />
            </UserProvider>
            <Route exact path="/dashboards">
                <ClientViewList />
            </Route>
        </>
    )
}