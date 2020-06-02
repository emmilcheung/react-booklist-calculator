import React from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTranscation } from './components/AddTranscation';
import { SchoolOptionList } from './components/SchoolOptionList';
import { GlobalProvider } from './context/GlobalState';


import './navbar.css'

function Secondary() {
    return (
        <>
        <Header />
        <GlobalProvider >
            <h2>
            Textbook calculator (NC37) 
            </h2>
            <div className="container">
                <Balance />
                <IncomeExpenses />
                <SchoolOptionList />
                <TransactionList />
                <AddTranscation />
            </div>
        </GlobalProvider>
        </>
    )
}

export default Secondary;