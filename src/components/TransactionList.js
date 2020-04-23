import React ,{ useContext }from 'react';
import { Transaction } from './Transaction'
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
    const {bookList, schoolDetails, changeDiscount, loadBooklist} = useContext(GlobalContext);
    const setForm = e => loadBooklist({schoolId: schoolDetails.schoolId, year: e.target.value});
    const yearButton = schoolDetails.schoolIsSet? '': 'none';
    // const setForm = e => console.log(e.target.value, schoolId);

    return (
        <>  <div>                
                <h3>{schoolDetails.schoolName}</h3>
                <div style={ {display : yearButton}} className="radioBtn" onChange={setForm.bind(this)}>
                    <input type="radio" id="form1" name="form" value="form1"></input><label htmlFor="form1">Form1</label>
                    <input type="radio" id="form2" name="form" value="form2"></input><label htmlFor="form2">Form2</label>
                    <input type="radio" id="form3" name="form" value="form3"></input><label htmlFor="form3">Form3</label>
                    <input type="radio" id="form4" name="form" value="form4"></input><label htmlFor="form4">Form4</label>
                    <input type="radio" id="form5" name="form" value="form5"></input><label htmlFor="form5">Form5</label>
                    <input type="radio" id="form6" name="form" value="form6"></input><label htmlFor="form6">Form6</label>
                </div>
                <br />
                <button onClick={() => changeDiscount(0)} className="discont-btn">原價</button>
                <button onClick={() => changeDiscount(0.05)} className="discont-btn">95折</button>
                <button onClick={() => changeDiscount(schoolDetails.schoolDiscount)} className="discont-btn">學校折</button>
            </div>
            <ul className="list">
                {
                    bookList.map(book => (<Transaction key={book.id} book=
                    {book}/>))
                }
            </ul>
        </>
    )
}
