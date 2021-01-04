import React from "react"
import { Link, Route } from "react-router-dom"
import { Logout } from "../auth/Logout"
// React-Bootstrap Component imports
import Navbar from "react-bootstrap/Navbar"
import Nav from "react-bootstrap/Nav"


export const NavBar = (props) => {
    return (
       <>
            <Navbar bg="light" expand="lg">
            <Navbar.Brand href="/">
                Bespoke Hub
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/">Projects</Nav.Link>
                    <Nav.Link href="/people">People</Nav.Link>
                    <Nav.Link href="/dashboards">Client Dashboards</Nav.Link>
                    <Route render={props => <Logout {...props} />} />
                </Nav>
            </Navbar.Collapse>
            </Navbar>
        </>
    )
}