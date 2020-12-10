import React from "react"


export const Logout = (props) => {
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear()
        props.history.push("/login")
    } 
    
    return (
        <form onSubmit={handleLogout}>
            <fieldset>
                <button type="submit">
                    Sign out
                </button>
             </fieldset>
        </form>
    )
}