import React, { useState } from 'react'

export const NewPurchaseOrder = ({
    url,
    token,
    setNewOrder,
}) => {
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

    const onSubmit = () => {
        if (!state.student_name || !state.phone_no || !state.school || !state.grade) {
            return
        }
        var payload = JSON.stringify(state);
        fetch(`${url}repurchase`, {
            method: 'POST',
            body: payload,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
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

    const formattedNow = () => {
        var now = new Date()
        return `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`
    }
    const getDate = (datetime) => {
        if (!datetime) {
            return null
        }
        var dateJS = new Date(datetime)
        return `${(dateJS.getMonth() + 1).toString().padStart(2, "0")}-${(dateJS.getDate()).toString().padStart(2, "0")}`
    }
    const handleKeyPress = e => {
        console.log(e.keyCode)
        // if (e.keyCode === 27) {
        //     removeChange()
        // }
        if (e.key === 'Enter') {
            onSubmit()
        }
    }

    return (
        <>
            {
                (
                    <tr onKeyPress={handleKeyPress} >
                        <th scope="row">
                        </th>
                        <td>
                            <div className="inside">
                                <input type="text" id="student_name" value={state.student_name}
                                    onChange={e => setState({
                                        ...state,
                                        student_name: e.target.value
                                    })
                                    }
                                />
                            </div>
                        </td>
                        <td>
                            <div className="inside">
                                <input type="text" id="phone_no" value={state.phone_no}
                                    onChange={e => setState({
                                        ...state,
                                        phone_no: e.target.value
                                    })
                                    }
                                />
                            </div>
                        </td>
                        <td>
                            <div className="inside">
                                <input type="text" id="school" value={state.school}
                                    onChange={e => setState({
                                        ...state,
                                        school: e.target.value
                                    })
                                    }
                                />
                            </div>
                        </td>
                        <td>
                            <div className="inside">
                                <input type="text" id="grade" value={state.grade}
                                    onChange={e => setState({
                                        ...state,
                                        grade: e.target.value
                                    })
                                    }
                                />
                            </div>
                        </td>
                        <td>
                            <div className="inside">
                                <textarea id="remarks" value={state.remarks ? state.remarks : ""}
                                    onChange={e => setState({
                                        ...state,
                                        remarks: e.target.value.replace(/\n/g, " ")
                                    })
                                    }
                                />
                            </div>
                        </td>
                        <td>
                            {state.record_date ? getDate(state.record_date) : null}
                        </td>
                        <td>
                        </td>
                        <td>
                            
                        </td>
                        <td>
                            <i className="fas fa-check" onClick={onSubmit} style={{ color: "green" }}></i>
                                &nbsp;&nbsp;
                                <i className="fas fa-times fa-lg" onClick={() => setNewOrder(false)} style={{ color: "red" }}></i>
                        </td>
                    </tr>
                )
            }
        </>
    )
}

