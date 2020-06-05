import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
import loadingGIF from '../data/loading.gif';

export const SchoolOptionList = () => {

    const { schoolList, loadBooklist } = useContext(GlobalContext);
    //if fetching in global context not yet finished
    if (schoolList == null || Object.keys(schoolList).length === 0) {
        return (
            <div className="loading">
                <img src={loadingGIF} alt="" />
            Loading...
            </div>)
    }
    //
    else {
        // const [option, setOption] = useState('');
        const onChange = e => {
            // e.preventDefault();
            if (e.target.value !== 'default') {
                var form = Object.keys(schoolList.bookList[e.target.value])
                                        .filter(form => form !== "discount")
                                        .filter(form => form !== "schoolName")
                loadBooklist({ 
                    schoolId: e.target.value, 
                    year: form[0] 
                });
            }
        }

        const searchDropdown = Object.keys(schoolList.bookList).map(id => schoolList.bookList[id].schoolName)
                                                               .filter(schoolName => schoolName.includes("鄭榮之"))
        return (
            <>
                <select name="school" id="school" className="select-css" onChange={onChange}>
                    <option value="default">------Please choose a school------</option>
                    {
                        Object.keys(schoolList.bookList).map(id => (
                            <option key={id} value={id}>{schoolList.bookList[id].schoolName}</option>
                        ))
                    }
                </select>
                {/* {
                    searchDropdown.map(school => {
                        return (
                            <></>
                        )
                    })
                } */}
            </>
        )
    }
}
