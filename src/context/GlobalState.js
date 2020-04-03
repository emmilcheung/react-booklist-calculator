import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

//Initial state
const initialState ={
    transactions :[
          { id: 1, text: 'Flower', amount: -20 },
          { id: 2, text: 'Salary', amount: 300 },
          { id: 3, text: 'Book', amount: -10 },
          { id: 4, text: 'Camera', amount: 150 },
          { id: 5, text: 'Camera', amount: 150 },
          { id: 6, text: 'Camera', amount: 150 },
          { id: 7, text: 'Camera', amount: 150 },
          { id: 8, text: 'Camera', amount: 150 },
          { id: 9, text: 'Camera', amount: 150 },
          { id: 10, text: 'Camera', amount: 150 },
          { id: 11, text: 'Camera', amount: 150 }
        ],
    discount: 0
}

//Create context
export const GlobalContext = createContext(initialState);

//Provider component
//parameter children = every thing inside <GlobalProvider></GlobalProvider>
export const GlobalProvider = ({children}) => {
    //state is return object
    //dispatch is function to trigger the state object
    //when triggered, state and parameter in dispatch will send to AppReducer
    //initialState no description 
    const [state, dispatch] = useReducer(AppReducer, initialState)
    //Action
    function deleteTransaction(id) {
        dispatch({
            type: 'DELETE_TRANSACTION',
            payload: id
        })
    }

    function addTransaction(transaction) {
        dispatch({
            type: 'ADD_TRANSACTION',
            payload: transaction
        })
    }
    function changeDiscount(discount){
        dispatch({
            type: 'CHANGE_DISCOUNT',
            payload: discount
        })
    }
    return (<GlobalContext.Provider value={
        {
            //set state to global content
            transactions: state.transactions,
            discount: state.discount,
            deleteTransaction,
            addTransaction,
            changeDiscount
        }
    }>
        {children}
    </GlobalContext.Provider>);
}