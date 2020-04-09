import React, {useContext }from 'react';
import {GlobalContext} from '../context/GlobalState';

export const Transaction = ({transaction}) => {
    const {discount, changeState} = useContext(GlobalContext);
    const sign = transaction.amount < 0 ? '-' : '+';

    return (
        <li onClick={() => changeState({id : transaction.id, cState : !transaction.isChosen})}className={(transaction.amount > 0)? 'plus': 'minus'} >
            {transaction.text}<span>{sign}${Math.abs(transaction.amount * (1 - discount))}</span>
        </li>
        // <li onClick={console.log("hi world")} className={(transaction.amount > 0)? 'plus': 'minus'}>
        //         {transaction.text} <span>{sign}${Math.abs(transaction.amount * (1 - discount))}</span>
        //         <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
        // </li> 
    )
}
