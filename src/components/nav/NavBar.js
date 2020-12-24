import React from "react"
import { Link, Route } from "react-router-dom"
import { Logout } from "../auth/Logout"
// React-Bootstrap Component imports
import Navbar from "react-bootstrap/Navbar"

export const NavBar = (props) => {
    return (
       <>


        {/* <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">Projects</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/people">People</Link>
                </li>
                <li className="navbar__item">
                    <Link className="navbar__link" to="/dashboards">Client Views</Link>
                </li>
            </ul>
            <Route render={props => <Logout {...props} />} /> */}
        </>
    )
}