import React, { useState } from "react"


export const TaskContext = React.createContext()

export const TasksProvider = (props) => {
    const [tasks, setTasks] = useState([])

    const getTasks = () => {
        return fetch("http://localhost:8088/tasks?_expand=taskType")
            .then(res => res.json())
            .then(setTasks)
    }
    return (
        <TaskContext.Provider value={{
            tasks, getTasks
        }}>
            {props.children}
        </TaskContext.Provider>
    )
}