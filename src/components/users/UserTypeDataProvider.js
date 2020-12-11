import React, { useState } from "react"


export const UserTypeContext = React.createContext()

export const UserTypeProvider = (props) => {
    const [userTypes, setUserTypes] = useState([])

    const getUserTypes = () => {
        return fetch("http://localhost8088/userTypes")
            .then(res => res.json())
            .then(setUserTypes)
    }
    return (
        <UserTypeContext.Provider value={{
            userTypes, getUserTypes
        }}>
            {props.children}
        </UserTypeContext.Provider>
    )
}