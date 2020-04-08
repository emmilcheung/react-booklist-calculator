import React from 'react'

export const Header = () => {
    function componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log(json))
    }
    return (
        <h2>
            Expense Tracker
        </h2>
    )
}
