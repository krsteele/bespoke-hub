import React, { useState } from "react"


export const SeadekColorsContext = React.createContext()

export const SeadekColorProvider = (props) => {
    const [seadekColors, setSeadekColors] = useState([])

    const getSeadekColors = () => {
        return fetch("http://localhost:8088/seadekColors")
            .then(res => res.json())
            .then(setSeadekColors)
    }
    return (
        <SeadekColorsContext.Provider value={{
            seadekColors, getSeadekColors
        }}>
            {props.children}
        </SeadekColorsContext.Provider>
    )
}