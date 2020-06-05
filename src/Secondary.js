import React from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTranscation } from './components/AddTranscation';
import { SchoolOptionList } from './components/SchoolOptionList';
import { GlobalProvider } from './context/GlobalState';




function Secondary() {
    return (
        <>
            <Header />
            <GlobalProvider >
                <div className="container">
                <h2>
                    Textbook calculator (NC37)
                </h2>
                    <Balance />
                    <IncomeExpenses />
                    <SchoolOptionList />
                    <TransactionList />
                    <AddTranscation />
                    <button
                        onClick={() => {
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                        }}
                        className="topBtn"
                    >
                        Top
                    </button>
                </div>
            </GlobalProvider>
        </>
    )
}

export default Secondary;