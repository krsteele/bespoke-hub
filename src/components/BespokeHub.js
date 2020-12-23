import React from "react"
import { Route, Redirect } from "react-router-dom"
import { ApplicationViews } from "./ApplicationViews"
import { Login } from "./auth/Login"
// import { Register } from "./auth/Register"
import "./BespokeHub.css"
import { NavBar } from "./nav/NavBar"

export const BespokeHub = () => (
    <>
<Route render={() => {
    // The user id is saved under the key app_user_id in local Storage. Change below if needed!
      if (localStorage.getItem("app_user_id")) {
          return (
              <>
                {
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
