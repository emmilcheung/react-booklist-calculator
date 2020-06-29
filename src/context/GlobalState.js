import React, { createContext, useState, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
// import data from '../data/initialState.json';

//Initial state
const initialState = {
    bookList: [],
    discount: 0,
    currentForm: "",
    schoolDetails: {
        schoolId: 0,
        schoolDiscount: 0,
        schoolIsSet: false
    }
};

//Create context
export const GlobalContext = createContext(initialState);

//Provider component
//parameter children = every thing inside <GlobalProvider></GlobalProvider>
export const GlobalProvider = ({ constrain, type, children }) => {
    //state is return object
    //dispatch is function to trigger the state object
    //when triggered, state and parameter in dispatch will send to AppReducer
    //initialState no description 
    const [state, dispatch] = useReducer(AppReducer, initialState)
    const [schoolList, setSchoolList] = useState({})
    useEffect(() => {
        var queryParams = (constrain == "") ? "" : `?schoolId=${constrain}`
        var primaryURL = `https://script.google.com/macros/s/AKfycbz8cIoZjXOn5tKdaAUZAAxOuXEYt1KVXzzmHL3Drncb4rp7PyE/exec${queryParams}`
        var secondaryURL = `https://script.google.com/macros/s/AKfycbxW8KBDw1uChb1e9uhwbHLPQvf76cowyEo7QKsl71caziD1HVkP/exec${queryParams}`
        var url;
        if (type == 'Primary'){
            url = primaryURL
        }
        else if(type == 'Secondary'){
            url = secondaryURL
        }
        fetch(url)
            .then(res => res.json())
            .then(json => setSchoolList(json))
    }, [])

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

    function changeDiscount(discount) {
        dispatch({
            type: 'CHANGE_DISCOUNT',
            payload: discount
        })
    }

    function changeState(id) {
        dispatch({
            type: 'CHANGE_STATE',
            payload: id
        })
    }

    function loadBooklist(payload) {
        payload.data = schoolList
        dispatch({
            type: 'LOAD_BOOKLIST',
            payload: payload
        })
    }

    return (<GlobalContext.Provider value={
        {
            schoolList: schoolList,
            //set state to global content
            bookList: state.bookList,
            currentForm: state.currentForm,
            discount: state.discount,
            schoolDetails: state.schoolDetails,
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