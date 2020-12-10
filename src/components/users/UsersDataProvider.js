import React, { useState, useEffect } from "react"

export const UserContext = React.createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [ searchTerms, setTerms ] = useState("")

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }

    const getUserById = (id) => {
        return fetch(`http://localhost:8088/users/${ id }?_expand=userType`)
            .then(res => res.json())
    }

    const addUser = user => {
        return fetch("http://localhost:8088/users?_expand=userType", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
            .then(getUsers)
    }

    const deleteUser = userId => {
        return fetch(`http://localhost:8088/users/${userId}`, {
            method: "DELETE"
        })
            .then(getUsers)
    }

    const updateUser = user => {
        return fetch(`http://localhost:8088/user/${user.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
        .then(getUsers)
    }

    return (
        <UserContext.Provider value={{
            users, addUser, getUsers, getUserById, searchTerms, setTerms, deleteUser, updateUser
        }}>
            {props.children}
        </UserContext.Provider>
    )
}