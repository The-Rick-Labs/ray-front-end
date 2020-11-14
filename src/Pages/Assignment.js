import React from 'react'

import TaskList from "../Components/TaskList"

const data = [{
    name: "Task 1",
    dueDate: "Nov 14, 2020",
    complete: "false"
},
{
    name: "Task 2",
    dueDate: "Nov 15, 2020",
    complete: "false"
},
{
    name: "Task 3",
    dueDate: "Nov 16, 2020",
    complete: "false"
}
]
class Assignment extends React.Component {
    render() {
        return <TaskList data = {data}/>
    }
}

export default Assignment