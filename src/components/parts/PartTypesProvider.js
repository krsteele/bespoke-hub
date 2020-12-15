import React, { useState } from "react"


export const PartTypeContext = React.createContext()

export const PartTypesProvider = (props) => {
    const [partTypes, setPartTypes] = useState([])

    const getPartTypes = () => {
        return fetch("http://localhost:8088/partTypes")
            .then(res => res.json())
            .then(setPartTypes)
    }
    return (
        <PartTypeContext.Provider value={{
            partTypes, getPartTypes
        }}>
            {props.children}
        </PartTypeContext.Provider>
    )
}