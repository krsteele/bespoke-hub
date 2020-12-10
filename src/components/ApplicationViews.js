import React from "react"
import { Route } from "react-router-dom"
import { ClientViewList } from "./client-views/ClientViewList"
import { ProjectsList } from "./projects/ProjectsList"


export const ApplicationViews = () => {
    return (
        <>
            <Route exact path="/">
                <ProjectsList />
            </Route>
            <Route exact path="/dashboards">
                <ClientViewList />
            </Route>
        </>
    )
}