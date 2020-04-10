import React, {useContext} from 'react'
import {GlobalContext} from '../context/GlobalState';

export const IncomeExpenses = () => {
  const {transactions, discount} = useContext(GlobalContext)
  const amounts = transactions.filter(transaction => transaction.isChosen === true)
                              .map(transaction => transaction.amount);
  const cost = amounts.reduce((acc,item) => (acc += item), 0)
                        .toFixed(1)
  
  const balance = amounts.reduce((acc,item) => (acc += item* (1-discount)), 0)
                        .toFixed(1)

    return (
        <div className="inc-exp-container">
        <div>
          <h4>Original Price</h4>
          <p className="money plus">+${cost}</p>
        </div>
        <div>
          <h4>Save</h4>
          <p className="money minus">-${balance - cost}</p>
        </div>
      </div>
    )
}
