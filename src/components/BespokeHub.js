import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
// import { Register } from "./auth/Register"
import "./BespokeHub.css"
import { NavBar } from "./nav/NavBar"
import { Logout } from "./auth/Logout"

export const BespokeHub = () => (
    <>
<Route render={() => {
    // The user id is saved under the key app_user_id in local Storage. Change below if needed!
    // The userTypeId is saved under the key app_userType_id in local Storage.
      if (localStorage.getItem("app_user_id")) {
          return (
              <>
                {
                    // if id is 1, then render navbar, if id is 2, only render the logout button
                    localStorage.getItem("app_userType_id") === "1" ? <Route render={props => <NavBar {...props} />} /> : ""
                }
                
                <Route render={props => <ApplicationViews {...props} />} />
              </>
          )
      } else {
          return <Redirect to="/login" />
      }
  }} />

  <Route path="/login" render={props => <Login {...props} />} />
  {/* <Route path="/register" render={props => <Register {...props} />} /> */}
</>
)
