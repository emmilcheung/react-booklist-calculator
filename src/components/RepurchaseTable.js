import React, { useState } from 'react'
import { RepurchaseOrder } from './RepurchaseOrder'

export const RepurchaseTable = ({ url,orderArray }) => {

    const [state, setState] = useState('')
    return (
        <div className="table-responsive-sm">
            {/* { JSON.stringify(orderArray)} */}
            <table className="table">
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
                        <th scope="col">
                            Record date
                        </th>
                        <th scope="col">
                            Contact date
                        </th>
                        <th scope="col">
                            Finish date
                        </th>
                        <th scope="col"></th>
                    </tr>
                </thead>
                <tbody >
                    {
                        orderArray.map((order, index) =>{
                            return (<RepurchaseOrder 
                                key={index}
                                id= {index}
                                orderInfo={order.apiContent}
                                edit={order.edit}
                                url={url}
                            />)
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}
