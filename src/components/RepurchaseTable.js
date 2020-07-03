import React, { useState } from 'react'
import { RepurchaseOrder } from './RepurchaseOrder'

export const RepurchaseTable = ({
    url,
    orderArray,
    admin,
    currentEdit,
    changeEdit,
    changeState,
    saveChange,
    removeChange,
    removeOrder,

}) => {

    return (
        <div className="table-responsive-xl bg-light rounded mt-5 mx-1">
            {/* { JSON.stringify(orderArray)} */}
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">
                            #
                        </th>
                        <th scope="col">
                            Student name
                        </th>
                        <th scope="col">
                            Phone no.
                        </th>
                        <th scope="col">
                            School
                        </th>
                        <th scope="col">
                            Grade
                        </th>
                        <th scope="col">
                            Remarks
                        </th>
                        <th scope="col" className="date" style={{ width: "8.33%" }}>
                            Record date
                        </th>
                        <th scope="col" className="date" style={{ width: "8.33%" }}>
                            Contact date
                        </th>
                        <th scope="col" className="date" style={{ width: "8.33%" }}>
                            Finish date
                        </th>
                        <th scope="col" className="button">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orderArray.map((order, index) => {
                            return (
                                <RepurchaseOrder
                                    key={index}
                                    id={index}
                                    orderInfo={order}
                                    admin={admin}
                                    edit={currentEdit === index ? true : false}
                                    changeEdit={changeEdit}
                                    changeState={changeState}
                                    saveChange={saveChange}
                                    removeChange={removeChange}
                                    removeOrder={removeOrder}
                                    url={url}
                                />
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
