import React, {useContext }from 'react';
import {GlobalContext} from '../context/GlobalState';

export const Transaction = ({transaction}) => {
    const {discount, deleteTransaction} = useContext(GlobalContext);
    const sign = transaction.amount < 0 ? '-' : '+';
    return (
        <li className={(transaction.amount > 0)? 'plus': 'minus'}>
                {transaction.text} <span>{sign}${Math.abs(transaction.amount * (1 - discount))}</span>
                <button onClick={() => deleteTransaction(transaction.id)} className="delete-btn">x</button>
        </li> 
    )
}
