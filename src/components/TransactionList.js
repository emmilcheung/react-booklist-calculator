import React ,{ useContext }from 'react';
import { Transaction } from './Transaction'
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
    const {transactions, changeDiscount} = useContext(GlobalContext);
    return (
        <>  <div>                
                <h3>書本</h3>
                <button onClick={() => changeDiscount(0)} className="discont-btn">-0%</button>
                <button onClick={() => changeDiscount(0.05)} className="discont-btn">-5%</button>
                <button onClick={() => changeDiscount(0.09)} className="discont-btn">-9%</button>
            </div>
            <ul className="list">
                {
                    transactions.map(transaction => (<Transaction key={transaction.id} transaction=
                    {transaction}/>))
                }
            </ul>
        </>
    )
}
