import React ,{ useState, useContext }from 'react';
import { GlobalContext } from '../context/GlobalState';

export const SchoolOptionList = () => {

    const { schoolList, loadBooklist} = useContext(GlobalContext);
    //if fetching in global context not yet finished
    if (schoolList == null || Object.keys(schoolList).length == 0){
        return (<></>)
    }
    //
    else{
        // const [option, setOption] = useState('');
        const onChange = e =>{
            e.preventDefault();
            loadBooklist({schoolId : e.target.value, year : 'form1'});
        }
        return(
            <>
                <select name="school" id="school" onChange={onChange}>
                {/* <option value="volvo">Volvo</option>
                <option value="saab">Saab</option>
                <option value="opel">Opel</option>
                <option value="audi">Audi</option> */}
                {
                    Object.keys(schoolList.bookList).map(id => (
                        <option value={id}>{schoolList.bookList[id].schoolName}</option>
                    ))
                }
                </select>
            </>
        )
    }
}
