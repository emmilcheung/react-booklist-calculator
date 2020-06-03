import React from 'react';
// import {GlobalContext} from '../context/GlobalState';

export const Header = () => {
    // const { schoolList, loadBooklist}  = useContext(GlobalContext);

    const myFunction = () => {
        var x = document.getElementById("myTopnav");
        if (x.className === "topnav") {
            x.className += " responsive";
        } else {
            x.className = "topnav";
        }
    }

    const unexistPage = () =>{
        alert("Currently under construction");
    }

    return (
        <>
            <div className="topnav" id="myTopnav">
                <a href="/">Home</a>
                <a href="/" onClick={unexistPage}>News</a>
                <a href="/" onClick={unexistPage}>Contact</a>
                <a href="/search">Search</a>
                <a href="/" onClick={unexistPage}>小學</a>
                <a href="/secondary">中學</a>

                {/* <div className="dropdown">
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
                        <a href="#!" onClick={() => loadBooklist({schoolId : 'cwgc', year : 'form1'})}>鄭榮之</a>
                        <a href="#!" onClick={() => loadBooklist({schoolId : 'lmy', year : 'form1'})}>梁文燕</a>
                        <a href="#!">Link 3</a>
                    </div>
                </div> */}
                <a href="#!" className="icon" onClick={myFunction}>
                    <i className="fas fa-bars"></i>
                </a>
            </div>

        </>

    )
}
