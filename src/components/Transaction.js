import React, {useContext }from 'react';
import {GlobalContext} from '../context/GlobalState';

export const Transaction = ({book}) => {
    const {discount, changeState} = useContext(GlobalContext);
    const sign = book.amount < 0 ? '-' : '+';
    const str = (book.amount > 0)? 'plus': 'minus';
    const isChosen = book.isChosen ? '': " unchosen";  

    return (
        <li onClick={() => changeState({id : book.id, cState : !book.isChosen})} className={str+ isChosen } >
            {book.text}<span>{sign}${Math.abs(book.amount * (1 - discount)).toFixed(1)}</span>
        </li>
        // <li onClick={console.log("hi world")} className={(transaction.amount > 0)? 'plus': 'minus'}>
        //         {transaction.text} <span>{sign}${Math.abs(transaction.amount * (1 - discount))}</span>
        //         <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
        // </li> 
    )
}
