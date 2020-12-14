import React, { useState } from "react"


export const PaintTypeContext = React.createContext()

export const PaintTypeProvider = (props) => {
    const [paintTypes, setTypes] = useState([])

    const getPaintTypes = () => {
        return fetch("http://localhost:8088/paintTypes")
            .then(res => res.json())
            .then(setTypes)
    }
    return (
        <PaintTypeContext.Provider value={{
            paintTypes, getPaintTypes
        }}>
            {props.children}
        </PaintTypeContext.Provider>
    )
}