import React from 'react'

export const Header = () => {

    function componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log(json))
    }
    componentDidMount()

    const myFunction = () => {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
          x.className += " responsive";
        } else {
          x.className = "topnav";
        }
    }

    return (
        <>
        <div className="topnav" id="myTopnav">
            <a onClick={() =>{
                window.location.reload();
            }}>Home</a>
            <a href="#news">News</a>
            <a  onClick = {()=> {
                window.location.href = "http://www.facebook.com";
            }}>Contact</a>
            <a href="#about">About</a>
            <a href="#about">About</a>
            <a href="#about">About</a>
            <a href="#about">About</a>
            <a href="#about">About</a>
            <a href="#about">About</a>
            <a href="#!" className="icon" onClick={myFunction}>
            <i className="fa fa-bars"></i>
            </a>
        </div>
        <h2>
            Expense Tracker
        </h2>
        </>

    )
}
