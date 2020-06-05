import React from 'react'

export const TopButton = () => {
    return (
        <button
            onClick={() => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="topBtn"
        >
           <i className="fas fa-angle-up" /> 
        </button>
    )
}
