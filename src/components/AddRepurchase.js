import React, { useState} from 'react'

export const AddRepurchase = ({toggle, setToggle, token, url}) => {
    const [state, setState] = useState({
        student_name: "",
        phone_no: "",
        school: "",
        grade: "",
        remarks: "",
        record_date: null,
        arrived_date: null, 
        finish_date: null 
    })

    const onSubmit = e =>{
        e.preventDefault()
        if( !state.student_name || ! state.phone_no || !state.school || !state.grade){
            return
        }
        var payload = JSON.stringify(state);
        fetch(`${url}repurchase`, {
            method : 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token' : token
            }
        })
         .then(res => res.json())
         .then(message => {
             console.log(message)
             console.log(document.querySelector('.markForChange'))
            //  setToggle(!toggle)
            window.location.reload()
         })
    
        
    }
    return (
        <>


            <div className="markForChange modal fade" id="exampleModalCenter" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalCenterTitle">Modal title</h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="form-group row">
                                    <label htmlFor="student_name" className="col-sm-2 col-form-label col-form-label-sm">Student Name</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control form-control-sm" id="student_name" value={state.student_name}
                                            onChange={e => setState({
                                                ...state,
                                                student_name: e.target.value
                                            })
                                            } />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="phone_no" className="col-sm-2 col-form-label col-form-label-sm">Phone Number</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control form-control-sm" id="phone_no" value={state.phone_no}
                                            onChange={e => setState({
                                                ...state,
                                                phone_no: e.target.value
                                            })
                                            } />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="school" className="col-sm-2 col-form-label col-form-label-sm">School</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control form-control-sm" id="school" value={state.school}
                                            onChange={e => setState({
                                                ...state,
                                                school: e.target.value
                                            })
                                            } />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="grade" className="col-sm-2 col-form-label col-form-label-sm">Grade</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control form-control-sm" id="grade" value={state.grade}
                                            onChange={e => setState({
                                                ...state,
                                                grade: e.target.value
                                            })
                                            } />
                                    </div>
                                </div>
                                <div className="form-group row">
                                    <label htmlFor="remarks" className="col-sm-2 col-form-label col-form-label-sm">Remarks</label>
                                    <div className="col-sm-10">
                                        <input type="text" className="form-control form-control-sm" id="student_name" value={state.remarks}
                                            onChange={e => setState({
                                                ...state,
                                                remarks: e.target.value
                                            })
                                            } />
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary" onClick={onSubmit}>Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
