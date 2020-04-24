import React, {useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';

export const Header = () => {
    const {loadBooklist}  = useContext(GlobalContext);

    function componentDidMount() {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(json => console.log(json))
    }
    // componentDidMount()

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
                <a >News</a>
                <a onClick={()=> {
                    window.location.href = "http://www.facebook.com";
                }}>Contact</a>

                <div className="dropdown">
                    <button className="dropbtn">
                        <i className="fa fa-school" ></i>
                               小學 
                        <i className="fas fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a >X</a>
                    </div>
                </div>
                <div className="dropdown">
                    <button className="dropbtn">
                        <i className="fas fa-university"></i>
                        中學 
                        <i className="fas fa-caret-down"></i>
                    </button>
                    <div className="dropdown-content">
                        <a href="#!" onClick={() => loadBooklist({schoolId : '11', year : 'form1'})}>鄭榮之</a>
                        <a href="#!" onClick={() => loadBooklist({schoolId : '12', year : 'form1'})}>培僑(中學)</a>
                        <a href="#!">Link 3</a>
                    </div>
                </div>
                <a href="#!" className="icon" onClick={myFunction}>
                    <i className="fas fa-bars"></i>
                </a>
            </div>
            <h2>
               Textbook calculator (NC37) 
            </h2>
        </>

    )
}
