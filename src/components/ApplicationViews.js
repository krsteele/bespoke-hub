import React from "react"
import { Route } from "react-router-dom"
import { ProjectsList } from "./projects/ProjectsList"
import { UserProvider } from "./users/UsersDataProvider"
import { UsersList } from "./users/UsersList"
import { UserDetail } from "./users/UserDetail"
import { ProjectProvider } from "./projects/ProjectsDataProvider"
import { UserTypeProvider } from "./users/UserTypeDataProvider"
import { UserForm } from "./users/UserForm"
import { ProjectForm } from "./projects/ProjectForm"
import { PartsProvider } from "./parts/PartsDataProvider"
import { ProjectPartsProvider } from "./parts/ProjectPartsDataProvider"
import { SeadekColorProvider } from "./seadek/SeadekColorsDataProvider"
import { PaintTypeProvider } from "./paint/PaintTypesDataProvider"
import { ClientDashboard } from "./dashboards/ClientDashboard"
import { ClientDashboardList } from "./dashboards/ClientDashboardList"
import { PartTypesProvider } from "./parts/PartTypesProvider"
import { MakerProjectDashboard } from "./dashboards/MakerDashboard"
import { TasksProvider } from "./tasks/TasksDataProvider"
import { ProjectTasksProvider } from "./tasks/ProjectTasksDataProvider"


export const ApplicationViews = () => {
    return (
        <>
            <ProjectProvider>
                <UserProvider>
                    <PartsProvider>
                        <ProjectPartsProvider>
                            <SeadekColorProvider>
                                <PaintTypeProvider>
                                    <PartTypesProvider>
                                        <TasksProvider>
                                            <ProjectTasksProvider>
                                                <Route exact path="/" render={
                                                    props => <ProjectsList {...props} />
                                                } />
                                                <Route path="/:userId(\d+)" render={
                                                    props => <MakerProjectDashboard {...props} />
                                                } />
                                                <Route exact path="/create" render={
                                                    props => <ProjectForm {...props} />
                                                } />
                                                <Route exact path="/dashboards" render={
                                                    props => <ClientDashboardList {...props} />
                                                } />
                                                <Route path="/dashboards/:userId(\d+)" render={
                                                    props => <ClientDashboard {...props} />
                                                } />
                                            </ProjectTasksProvider>
                                        </TasksProvider>
                                    </PartTypesProvider>
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
        </>
    )
}