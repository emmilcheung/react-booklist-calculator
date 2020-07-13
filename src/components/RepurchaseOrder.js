import React from 'react'

export const RepurchaseOrder = ({
    id,
    orderInfo,
    admin,
    edit,
    changeEdit,
    changeState,
    saveChange,
    removeChange,
    removeOrder,

}) => {
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
        if (e.keyCode === 27) {
            removeChange()
        }
        if (e.key === 'Enter') {
            saveChange(id)
        }
    }

    return (
        <>
            {
                edit
                    ? (
                        <tr onKeyPress={handleKeyPress} >
                            <th scope="row">
                            </th>
                            <td>
                                <div className="inside">
                                    <input type="text" id="student_name" value={orderInfo.student_name}
                                        onChange={e => changeState(id, {
                                            ...orderInfo,
                                            student_name: e.target.value
                                        })
                                        }
                                    />
                                </div>
                            </td>
                            <td>
                                <div className="inside">
                                    <input type="text" id="phone_no" value={orderInfo.phone_no}
                                        onChange={e => changeState(id, {
                                            ...orderInfo,
                                            phone_no: e.target.value
                                        })
                                        }
                                    />
                                </div>
                            </td>
                            <td>
                                <div className="inside">
                                    <input type="text" id="school" value={orderInfo.school}
                                        onChange={e => changeState(id, {
                                            ...orderInfo,
                                            school: e.target.value
                                        })
                                        }
                                    />
                                </div>
                            </td>
                            <td>
                                <div className="inside">
                                    <input type="text" id="grade" value={orderInfo.grade}
                                        onChange={e => changeState(id, {
                                            ...orderInfo,
                                            grade: e.target.value
                                        })
                                        }
                                    />
                                </div>
                            </td>
                            <td>
                                <div>
                                    <textarea id="remarks" value={orderInfo.remarks ? orderInfo.remarks : ""}
                                        cols="30"
                                        onChange={e => changeState(id, {
                                            ...orderInfo,
                                            remarks: e.target.value.replace(/\n/g, " ")
                                        })
                                        }
                                    />
                                </div>
                            </td>
                            <td>
                                {orderInfo.record_date ? getDate(orderInfo.record_date) : null}
                            </td>
                            <td>
                                <select onChange={e => changeState(id, {
                                    ...orderInfo,
                                    arrived_date: e.target.value
                                })

                                }>
                                    <option value={orderInfo.arrived_date}>
                                        {
                                            orderInfo.arrived_date ? getDate(orderInfo.arrived_date) : null
                                        }
                                    </option>
                                    <option value={formattedNow()}>
                                        {
                                            getDate(Date.now())
                                        }
                                    </option>
                                    <option value={""}>取消</option>
                                </select>
                            </td>
                            <td>
                                <select onChange={e => changeState(id, {
                                    ...orderInfo,
                                    finish_date: e.target.value
                                })

                                }>
                                    <option value={orderInfo.finish_date}>
                                        {
                                            orderInfo.finish_date ? getDate(orderInfo.finish_date) : null
                                        }
                                    </option>
                                    <option value={formattedNow()}>
                                        {
                                            getDate(Date.now())
                                        }
                                    </option>
                                    <option value={""}>取消</option>
                                </select>
                            </td>
                            <td>
                                <i className="fas fa-check" onClick={() => saveChange(id)} style={{ color: "green" }}></i>
                                &nbsp;&nbsp;
                                <i className="fas fa-times fa-lg" onClick={() => removeChange()} style={{ color: "red" }}></i>
                            </td>
                        </tr>
                    )
                    : (<tr onDoubleClick={() => changeEdit(id)} style={orderInfo.finish_date ? { backgroundColor: "grey" } : null}>
                        <th scope="row">
                            {/* {id + 1} */}
                            <input type="checkbox" className="selected-order" id={id} value={id}/>
                        </th>
                        <td>
                            <div>
                                {orderInfo.student_name}
                            </div>
                        </td>
                        <td>
                            <div>
                                {orderInfo.phone_no}
                            </div>
                        </td>
                        <td>
                            <div>
                                {orderInfo.school}
                            </div>
                        </td>
                        <td>{orderInfo.grade}</td>
                        <td>{(orderInfo.remarks && orderInfo.remarks.length > 10)? `${orderInfo.remarks.slice(0, 15)}...` : orderInfo.remarks }</td>
                        <td className="date">
                            <div >
                                {orderInfo.record_date ? getDate(orderInfo.record_date) : null}
                            </div>
                        </td>
                        <td className="date">
                            <div>
                                {orderInfo.arrived_date ? getDate(orderInfo.arrived_date) : null}
                            </div>
                        </td>
                        <td className="date">
                            <div>
                                {orderInfo.finish_date ? getDate(orderInfo.finish_date) : null}
                            </div>
                        </td>
                        <td>
                            <i className="fas fa-edit" onClick={() => changeEdit(id)}></i>
                            {
                                admin
                                    ? (<> &nbsp;&nbsp;
                                        <i className="fas fa-trash" aria-hidden="true" onClick={() => removeOrder(id)}></i> </>)
                                    : null
                            }

                        </td>


                    </tr>
                    )
            }
        </>
    )
}
