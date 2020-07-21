import React, { useContext } from 'react';
import { Transaction } from './Transaction'
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
    const { schoolList, bookList, schoolDetails, changeDiscount, loadBooklist, changeState } = useContext(GlobalContext);
    const setForm = e => {
        loadBooklist({ schoolId: schoolDetails.schoolId, year: e.target.value });
    }
    const setDiscount = e => {
        // console.log(e.target.value);
        changeDiscount(e.target.value);
    }
    const yearButton = schoolDetails.schoolIsSet ? '' : 'none';

    const chooseAll = () => {
        bookList.forEach(book => {
            changeState({ id: book.id, cState: true })
        })
    }
    const unchooseAll = () => {
        bookList.forEach(book => {
            changeState({ id: book.id, cState: false })
        })
    }


    //year form list button
    var formlist = []
    if (schoolList != null && schoolDetails.schoolIsSet) {
        formlist = Object.keys(schoolList.bookList[schoolDetails.schoolId])
            .filter(form => form !== "discount")
            .filter(form => form !== "schoolName")
            .map((form, i) => {
                return (<><input type="radio" key={i} id={form} name="form" value={form}></input><label htmlFor={form}>{form}</label></>)
            })
    }


    if (schoolList == null || Object.keys(schoolList).length === 0) {
        return (<></>)
    }
    return (
        <>
            <div>
                <h3>{schoolDetails.schoolName}</h3>
                <div className="radio-toolbar" onChange={setDiscount}>
                    <input type="radio" id="original" name="discount" value={0} />
                    <label htmlFor="original"> 原價 </label>

                    <input type="radio" id="shopDiscount" name="discount" value={0.05} />
                    <label htmlFor="shopDiscount">(門市)95折</label>

                    <input type="radio" id="schoolDiscount" name="discount" value={schoolDetails.schoolDiscount} />
                    <label htmlFor="schoolDiscount" style={{ display: yearButton }}>學校折</label>
                </div>
                {/* <button onClick={() => changeDiscount(0)} className="discont-btn">原價</button>
                <button onClick={() => changeDiscount(0.05)} className="discont-btn">95折</button>
                <button onClick={() => changeDiscount(schoolDetails.schoolDiscount)} className="discont-btn" style={{ display: yearButton }}>學校折</button> */}
            </div>
            <div style={{ display: yearButton }} className="radioBtn scrollbar" onChange={setForm.bind(this)}>
                {formlist}

            </div>
            <div className="unchoose-btn">
                <button id="choose-btn" onClick={chooseAll} />
                <label htmlFor="choose-btn">全部選擇</label>
                <button id="unchoose-btn" onClick={unchooseAll} />
                <label htmlFor="unchoose-btn">全部取消</label>
            </div>
            <br />
            <ul className="list">
                {
                    bookList.map(book => (<Transaction key={book.id} book=
                        {book} />))
                }
            </ul>
        </>
    )
}
