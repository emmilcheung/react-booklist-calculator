import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';
// import data from '../data/initialState.json';

//Initial state
const initialState = {
    bookList: [],
    discount : 0,
    schoolId : 0,
    schoolDiscount: 0,
    schoolIsSet: false
}; 

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
    function changeState(id){
        dispatch({
            type: 'CHANGE_STATE',
            payload: id
        })
    }
    function loadBooklist(no){
        dispatch({
            type: 'LOAD_BOOKLIST',
            payload: no
        })
    }
    return (<GlobalContext.Provider value={
        {
            //set state to global content
            bookList: state.bookList,
            discount: state.discount,
            schoolId: state.schoolId,
            schoolDiscount: state.schoolDiscount,
            schoolIsSet: state.schoolIsSet,
            deleteTransaction,
            addTransaction,
            changeDiscount,
            changeState,
            loadBooklist
        }
    }>
        {children}
    </GlobalContext.Provider>);
}