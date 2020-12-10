import React from "react"


export const Logout = (props) => {
    const handleLogout = (e) => {
        e.preventDefault()
        localStorage.clear()
    } 
    
    return (
        <form onSubmit={handleLogout}>
            <fieldset>
                <button type="logout">
                    Sign out
                </button>
             </fieldset>
        </form>
    )
}