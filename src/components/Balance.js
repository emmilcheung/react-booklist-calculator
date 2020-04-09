import React, {useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';

export const Balance = () => {
    const {transactions, discount}  = useContext(GlobalContext);
    const amounts = transactions.filter(transaction => transaction.isChosen === true)
                                .map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0)
                        .toFixed(1);

    return (
        <>
            <h4>Your Balance</h4>
            <h1 >${total * (1 - discount)}</h1>
        </>
    )
}
