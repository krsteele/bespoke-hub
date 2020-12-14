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
import { ProjectDetail } from "./projects/ProjectDetail"
import { ProjectForm } from "./projects/ProjectForm"
import { PartsProvider } from "./parts/PartsDataProvider"
import { ProjectPartsProvider } from "./parts/ProjectPartsDataProvider"
import { SeadekColorProvider } from "./seadek/SeadekColorsDataProvider"
import { PaintTypeProvider } from "./paint/PaintTypesDataProvider"


export const ApplicationViews = () => {
    return (
        <>
            <ProjectProvider>
                <UserProvider>
                    <PartsProvider>
                        <ProjectPartsProvider>
                            <SeadekColorProvider>
                                <PaintTypeProvider>
                                    <Route exact path="/" render={
                                        props => <ProjectsList {...props} />
                                    } />
                                    <Route path="/:projectId(\d+)" render={
                                        props => <ProjectDetail {...props} />
                                    } />
                                    <Route exact path="/create" render={
                                        props => <ProjectForm {...props} />
                                    } />
                                </PaintTypeProvider>
                            </SeadekColorProvider>
                        </ProjectPartsProvider>
                    </PartsProvider>
                </UserProvider>
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
                        <Route path="/people/edit/:userId(\d+)" render={
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