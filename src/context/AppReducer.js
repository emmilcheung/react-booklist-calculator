export default (state, action) => {
    switch(action.type){
        case 'DELETE_TRANSACTION':
            return{
                //spread operator
                ...state,
                transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
            }
        case 'ADD_TRANSACTION':
            return{
                ...state,
                transactions: [action.payload, ...state.transactions]
            }
        case 'CHANGE_DISCOUNT':
            return{
                ...state,
                discount: action.payload
            }
        default:
            return state
    }
}