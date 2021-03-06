import React from 'react';
import { Header } from './components/Header';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { TransactionList } from './components/TransactionList';
import { AddTranscation } from './components/AddTranscation';
import { SchoolOptionList } from './components/SchoolOptionList';
import { SchoolDefaultList } from './components/SchoolDefaultList'
import { TopButton } from './components/TopButton';
import { GlobalProvider } from './context/GlobalState';

import './App.css';


function Secondary({ match }) {
    const schoolId = match.params.schoolId ? match.params.schoolId : "";
    if (!schoolId || !schoolId.length) {
        return (
            <>
                <Header />
                <GlobalProvider constrain="" type={"Secondary"}>

                    <div className="container">
                        <h2>
                            Textbook calculator (NC37)
                    </h2>
                        <div className="container-header">
                            <Balance />
                            <IncomeExpenses />
                        </div>
                        <div className="list-body">
                            <div className="list-choice">
                                <SchoolOptionList />
                                <TransactionList />

                            </div>
                            <div className="add-list">
                                <AddTranscation />
                            </div>
                        </div>
                        <TopButton />
                    </div>
                </GlobalProvider>
            </>
        )
    }
    else {
        return (
            <>
                <GlobalProvider constrain={schoolId} type={"Secondary"}>

                    <div className="container">
                        <h2>
                            Textbook calculator (NC37)
                    </h2>
                        <div className="container-header">
                            <Balance />
                            <IncomeExpenses />
                        </div>
                        <div className="list-body">
                            <div className="list-choice">
                                <SchoolDefaultList />
                                <TransactionList />

                            </div>
                            <div className="add-list">
                                <AddTranscation />
                            </div>
                        </div>
                        <TopButton />
                    </div>
                </GlobalProvider>
            </>
        )
    }

}

export default Secondary;