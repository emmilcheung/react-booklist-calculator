import React, {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState';

export const IncomeExpenses = () => {
  const {bookList, discount} = useContext(GlobalContext);
  const amounts = bookList.filter(book => book.isChosen === true)
                              // .map(book => book.amount);
  const cost = amounts.reduce((acc,item) => (acc += Math.round(item.amount * 10) / 10), 0)
  const balance = amounts.reduce((acc,item) => acc += item.special_price ? (item.amount) : Math.round(item.amount*(1-discount) * 10) / 10, 0)

    return (
        <div className="inc-exp-container">
        <div>
          <h4>Original Price</h4>
          <p className="money plus">${cost.toFixed(1)}</p>
        </div>
        <div>
          <h4>Save</h4>
          <p className="money minus">${(cost - balance).toFixed(1)}</p>
        </div>
      </div>
    )
}
