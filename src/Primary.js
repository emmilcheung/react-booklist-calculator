import React from 'react';
import { Balance } from './components/Balance';
import { IncomeExpenses } from './components/IncomeExpenses';
import { PrimaryList } from './components/PrimaryList';
import { AddTranscation } from './components/AddTranscation';
import { SchoolDefaultList } from './components/SchoolDefaultList';
import { TopButton } from './components/TopButton';
import { GlobalProvider } from './context/GlobalState';

import './App.css';


function Primary({match}) {
    console.log(match.params);
    const { schoolId } = match.params ;
    return (
        <>
            <GlobalProvider constrain={schoolId}>

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
                            <PrimaryList />

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

export default Primary;
