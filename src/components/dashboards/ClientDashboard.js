import React, { useEffect } from "react"

// necessary contexts: project, projectparts


// need project data and doughnut chart 
// do i need to put the doughnut here and import projectTask data to use in doughnut?

export const ClientDashboard = (props) => {
    // do the magic here to get client dashboard using the props.match.params
    useEffect(() => {
        console.log("props for client dashboard", props)
    }, [])

    return (
    <div>I'm a general client dashboard.</div>
    )
}

