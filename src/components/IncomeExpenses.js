import React, {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState';

export const IncomeExpenses = () => {
  const {bookList, discount} = useContext(GlobalContext);
  const amounts = bookList.filter(book => book.isChosen === true)
                              .map(book => book.amount);
  const cost = amounts.reduce((acc,item) => (acc += item), 0)
                        .toFixed(1)
  
  const balance = amounts.reduce((acc,item) => acc += parseFloat((item*(1-discount)).toFixed(1)), 0)

    return (
        <div className="inc-exp-container">
        <div>
          <h4>Original Price</h4>
          <p className="money plus">${cost}</p>
        </div>
        <div>
          <h4>Save</h4>
          <p className="money minus">-${(balance - cost).toFixed(1)}</p>
        </div>
      </div>
    )
}
