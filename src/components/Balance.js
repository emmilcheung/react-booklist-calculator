import React, {useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';

export const Balance = () => {
    const {bookList, discount}  = useContext(GlobalContext);
    const amounts = bookList.filter(book => book.isChosen === true)
                                .map(book => book.amount);
    const balance = amounts.reduce((acc,item) => acc += Math.round(item*(1-discount) * 10) / 10 , 0)


    return (
        <>
            <h4>Total Price</h4>
            <h1 >${balance.toFixed(1)}</h1>
        </>
    )
}
