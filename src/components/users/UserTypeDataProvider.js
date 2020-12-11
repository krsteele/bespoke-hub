import React from "react"
import { propTypes } from "react-bootstrap/esm/Image"

export const UserTypeContext = React.createContext

export const UserTypeProvider = () => {
    const [userTypes, setTypes] = useState([])

    const getUserTypes = () => {
        return fetch("http://localhost8088/userTypes")
            .then(res => res.json())
            .then(setTypes)
    }
    return (
        <UserTypeContext.Provider value={{
            userTypes, getUserTypes
        }}>
            {props.children}
        </UserTypeContext.Provider>
    )
}