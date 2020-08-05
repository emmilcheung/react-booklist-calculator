import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const Balance = () => {
    const { bookList, discount } = useContext(GlobalContext);
    const amounts = bookList.filter(book => book.isChosen === true)
    // .map(book => book.amount);
    const balance = amounts.reduce((acc, item) => acc += item.special_price ? item.amount : Math.round(item.amount * (1 - discount) * 10) / 10, 0)
    const bookCount = bookList.reduce((acc, book) => acc += book.isChosen ? 1 : 0, 0);
    const discountStr = discount === 0 ? '原價' : ((1-discount)*100) % 10 === 0 ? `${(1-discount)*10}折` : `${(1-discount)*100}折`;

    return (
        <>
            <h4>Total Price</h4>
            <h1 >${balance.toFixed(1)}</h1>
            <div className="d-flex justify-content-between">
                <p>{`共 ${bookCount} 本 ${discountStr}`}</p>
            </div>
        </>
    )
}
