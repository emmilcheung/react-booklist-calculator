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
            case 'CHANGE_STATE':
                return{
                    ...state,
                    transaction : state.transactions.map(
                        transaction => {           
                            if(transaction.id === action.payload.id){
                                transaction.isChosen = action.payload.cState;
                                // console.log(transaction.id, transaction.isChosen);
                            }
                            return transaction
                        }
                    )
                }
        default:
            return state
    }
}