import React from 'react'

export const RepurchaseOrder = ({id, orderInfo, edit }) => {
    // console.log(orderInfo.record_date.split(' '))
    return (
        <>
            {
                edit
                ? (
                    <tr>
                        <th scope="row">{id+1}</th>
                            <td>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="student_name" value={`${orderInfo.student_name}`} />
                                </div>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="phone_no" value={`${orderInfo.phone_no}`} />
                                </div>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="school" value={`${orderInfo.school}`} />
                                </div>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="grade" value={`${orderInfo.grade}`} />
                                </div>
                            </td>
                            <td>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="remarks" value={`${orderInfo.remarks}`} />
                                </div>
                            </td>
                            {/* <th>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="student_name" value={`any ${orderInfo.student_name}`} />
                                </div>
                            </th>
                            <th>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="student_name" value={`any ${orderInfo.student_name}`} />
                                </div>
                            </th>
                            <th>
                                <div className="form-group">
                                    <input type="text" className="form-control" id="student_name" value={`any ${orderInfo.student_name}`} />
                                </div>
                            </th> */}
                    </tr>
                ) 
                : (<tr>
                    <th scope="row">{id+1}</th>
                    <td>{orderInfo.student_name}</td>
                    <td>{orderInfo.phone_no}</td>
                    <td>{orderInfo.school}</td>
                    <td>{orderInfo.grade}</td>
                    <td>{orderInfo.remarks}</td>
                    <td>{orderInfo.record_date ? orderInfo.record_date.split(' ')[0] : null }</td>
                    <td>{orderInfo.arrived_date ? orderInfo.arrived_date.split(' ')[0]: null }</td>
                    <td>{orderInfo.finish_date ? orderInfo.finish_date.split(' ')[0] : null }</td>
                    <td><i className="fas fa-edit"></i></td>
                    

                  </tr>
                )
            }
        </>
    )
}
