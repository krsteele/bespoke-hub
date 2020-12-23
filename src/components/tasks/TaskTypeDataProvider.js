import React, { useState } from "react"


export const TaskTypeContext = React.createContext()

export const TaskTypesProvider = (props) => {
    const [taskTypes, setTaskTypes] = useState([])

    const getTaskTypes = () => {
        return fetch("http://localhost:8088/taskType")
            .then(res => res.json())
            .then(setTaskTypes)
    }
    return (
        <TaskTypeContext.Provider value={{
            taskTypes, getTaskTypes
        }}>
            {props.children}
        </TaskTypeContext.Provider>
    )
}