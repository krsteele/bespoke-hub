import React, { useRef } from "react"
import "./Login.css"
import Button from "react-bootstrap/Button"
import Navbar from 'react-bootstrap/Navbar'



export const Login = props => {
    const email = useRef()
    const password = useRef()
    const existDialog = useRef()
    const passwordDialog = useRef()

    const existingUserCheck = () => {
        // If your json-server URL is different, please change it below!
        return fetch(`http://localhost:8088/users?email=${email.current.value}`)
            .then(_ => _.json())
            .then(user => user.length ? user[0] : false)
    }

    const handleLogin = (e) => {
        e.preventDefault()

        existingUserCheck()
            .then(exists => {
                if (exists && exists.password === password.current.value && exists.userTypeId === 1) {
                    // The user id is saved under the key app_user_id in local Storage. Change below if needed!
                    // Sets userTypeId in local storage for conditional render of certain elements
                    localStorage.setItem("app_user_id", exists.id)
                    localStorage.setItem("app_userType_id", exists.userTypeId)
                    props.history.push("/")
                } else if (exists && exists.password === password.current.value && exists.userTypeId === 2) {
                    // The user id is saved under the key app_user_id in local Storage. Change below if needed!
                    // Sets userTypeId in local storage for conditional render of certain elements
                    // if this set of conditions is true, takes client straight to their own dashboard
                    localStorage.setItem("app_user_id", exists.id)
                    localStorage.setItem("app_userType_id", exists.userTypeId)
                    props.history.push(`/dashboards/${exists.id}`)
                } else if (exists && exists.password !== password.current.value) {
                    passwordDialog.current.showModal()
                } else if (!exists) {
                    existDialog.current.showModal()
                } else {
                    console.log("pit of despair")
                }
            })
    }

    return (
        <main>
        <Navbar bg="light" expand="lg">
            <Navbar.Brand href="#">
                Bespōke Hub
            </Navbar.Brand>
        </Navbar>
        <div className="login__background"></div>
        <div className="login__form">
                <dialog className="dialog dialog--auth" ref={existDialog}>
                    <div>User does not exist</div>
                    <button className="button--close" onClick={e => existDialog.current.close()}>Close</button>
                </dialog>
                <dialog className="dialog dialog--password" ref={passwordDialog}>
                    <div>Password does not match</div>
                    <button className="button--close" onClick={e => passwordDialog.current.close()}>Close</button>
                </dialog>
                <section>
                    <form className="form--login" onSubmit={handleLogin}>
                        <h3>Please sign in</h3>
                        <fieldset>
                            <label htmlFor="inputEmail"> Email address </label>
                            <input ref={email} type="email" autoComplete="email"
                                id="email"
                                className="form-control"
                                placeholder="Email address"
                                required autoFocus />
                        </fieldset>
                        <fieldset>
                            <label htmlFor="inputPassword"> Password </label>
                            <input ref={password} type="password" autoComplete="current-password"
                                id="password"
                                className="form-control"
                                placeholder="Password"
                                required />
                        </fieldset>
                        <fieldset>
                            <Button className="btn" type="submit" variant="secondary" onClick={handleLogin} >
                                Sign in
                            </Button>
                        </fieldset>
                    </form>
                </section>
            </div>
        </main>
    )
}

