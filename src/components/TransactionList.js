import React ,{ useContext }from 'react';
import { Transaction } from './Transaction'
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
    const {bookList, schoolDetails, changeDiscount, loadBooklist} = useContext(GlobalContext);
    const setForm = e => {
        loadBooklist({schoolId: schoolDetails.schoolId, year: e.target.value});
    }
    const yearButton = schoolDetails.schoolIsSet? '': 'none';
    // const setForm = e => console.log(e.target.value, schoolId);

    return (
        <>  <div>                
                <h3>{schoolDetails.schoolName}</h3>
                <button onClick={() => changeDiscount(0)} className="discont-btn">原價</button>
                <button onClick={() => changeDiscount(0.05)} className="discont-btn">95折</button>
                <button onClick={() => changeDiscount(schoolDetails.schoolDiscount)} className="discont-btn" style={ {display : yearButton}}>學校折</button>
            </div>
                <div style={ {display : yearButton}} className="radioBtn" onChange={setForm.bind(this)}>
                    <input type="radio" id="form1" name="form" value="form1" defaultChecked></input><label htmlFor="form1">Form 1</label>
                    <input type="radio" id="form2" name="form" value="form2"></input><label htmlFor="form2">Form 2</label>
                    <input type="radio" id="form3" name="form" value="form3"></input><label htmlFor="form3">Form 3</label>
                    <input type="radio" id="form4" name="form" value="form4"></input><label htmlFor="form4">Form 4</label>
                    <input type="radio" id="form5" name="form" value="form5"></input><label htmlFor="form5">Form 5</label>
                    <input type="radio" id="form6" name="form" value="form6"></input><label htmlFor="form6">Form 6</label>
                </div>
                <br />
            <ul className="list">
                {
                    bookList.map(book => (<Transaction key={book.id} book=
                    {book}/>))
                }
            </ul>
        </>
    )
}
