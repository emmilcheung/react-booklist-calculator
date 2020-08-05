import React, { useContext, useEffect } from 'react';
import { GlobalContext } from '../context/GlobalState';
import loadingGIF from '../data/loading.gif';

export const SchoolDefaultList = () => {


    const { schoolList, loadBooklist, schoolDetails, changeDiscount } = useContext(GlobalContext);
    const isSet = !(schoolList == null || Object.keys(schoolList).length === 0)
    useEffect(() => {
        if (isSet) {
            var idList = Object.keys(schoolList.bookList);
            var form = Object.keys(schoolList.bookList[idList[0]])
                .filter(form => form !== "discount")
                .filter(form => form !== "schoolName")
            loadBooklist({
                schoolId: idList[0],
                year: form[0]
            });
            changeDiscount(schoolDetails.discount);
            document.querySelectorAll('.radio-toolbar input')
                .forEach((btn, index) => {
                    if (index === 0)
                        btn.checked = true;
                    else
                        btn.checked = false;
                });
            document.querySelectorAll('.radioBtn input')
                .forEach((btn, index) => {
                    if (index === 0)
                        btn.checked = true;
                    else
                        btn.checked = false
                });
        }

    }, [isSet])
    //if fetching in global context not yet finished
    if (!isSet) {
        return (
            <div className="loading">
                <img src={loadingGIF} alt="" />
            Loading...
            </div>)
    }
    //
    else {
        return null
    }
}
