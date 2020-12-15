import React, { useState } from "react"


export const PartContext = React.createContext()

export const PartsProvider = (props) => {
    const [parts, setParts] = useState([])

    const getParts = () => {
        return fetch("http://localhost:8088/parts?_expand=partType")
            .then(res => res.json())
            .then(setParts)
    }
    return (
        <PartContext.Provider value={{
            parts, getParts
        }}>
            {props.children}
        </PartContext.Provider>
    )
}