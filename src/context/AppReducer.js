import data from '../data/initialState.json';
export default (state, action) => {
    switch(action.type){
        case 'DELETE_TRANSACTION':
            return{
                //spread operator
                ...state,
                bookList: state.bookList.filter(book => book.id !== action.payload)
            }
        case 'ADD_TRANSACTION':
            return{
                ...state,
                bookList: [action.payload, ...state.bookList]
            }
        case 'CHANGE_DISCOUNT':
            return{
                ...state,
                discount: action.payload
            }
        case 'CHANGE_STATE':
            return{
                ...state,
                bookList : state.bookList.map(
                    book => {           
                        if(book.id === action.payload.id){
                            book.isChosen = action.payload.cState;
                            // console.log(transaction.id, transaction.isChosen);
                        }
                        return book
                    }
                )
            }
        case 'LOAD_BOOKLIST':
            return{
                ...state,
                bookList: [...data.bookList[action.payload.schoolId][action.payload.year]],
                schoolId: action.payload.schoolId,
                schoolDiscount : data.bookList[action.payload.schoolId]["discount"],
                schoolIsSet : true
            }
        default:
            return state
    }
}