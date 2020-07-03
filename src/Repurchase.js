import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { RepurchaseTable } from './components/RepurchaseTable'
import { AddRepurchase } from './components/AddRepurchase'
import { TopButton } from './components/TopButton'
import jwt from 'jsonwebtoken'

import './repurchase.css'

export default function Repurchase() {
    const url = "https://nc37test.pythonanywhere.com/"
    // const url = "http://localhost:5000/"
    const cookieInJson = () => {
        var obj = {};
        document.cookie.split(';').forEach(cookie => {
            obj[cookie.split('=')[0].replace(/\s+/g, '')] = cookie.split('=')[1]
        });
        return obj
    }
    const initialState = {
        repurchaseOrderArray: [],
        logged_in: cookieInJson()['jwt-token'] ? true : false,
        loading: false,
        admin: false,
        currentEdit: -1,
    }
    const [state, setState] = useState(initialState)
    const [backup, setBackup] = useState('')
    const [toggle, setToggle] = useState(true)

    const fetchOrder = async () => {
        // var data;

        return await fetch(`${url}repurchase`, {
            headers: {
                'x-access-token': cookieInJson()['jwt-token']
            }
        })
            .then(res => {
                if (res.status !== 200) {
                    throw new Error(res.status)
                }
                return res.json()
            })
            .then(data => {
                if (Object.keys(data).includes('message')){
                    setState({
                        ...state,
                        loading: false
                    })
                    return {}
                }
                data.dataArray.sort((a, b) => {
                    if (a.list_id < b.list_id) return -1
                    if (a.list_id > b.list_id) return 1
                    return 0
                })
                setBackup([...data.dataArray])
                setState({
                    ...state,
                    loading: false,
                    admin: jwt.decode(cookieInJson()['jwt-token']).admin,
                    //object apiContent is original data from fetch, edit is used to define is it a change item
                    repurchaseOrderArray: data.dataArray
                })
            })
            .catch(err => {
                console.log(err)
                document.cookie = `jwt-token=;Max-age=0`
                // window.location.replace('/')
            })
        // console.log(data)
        // return data
    }

    const changeOrderState = (index, orderContent) => {
        var orderArray = state.repurchaseOrderArray
        orderArray[index] = orderContent
        setState({
            ...state,
            repurchaseOrderArray: [...orderArray]
        })
    }

    const saveChange = (id) => {
        setBackup([...state.repurchaseOrderArray])
        console.log(state.repurchaseOrderArray[id])
        onSubmit(id)
        setState({
            ...state,
            currentEdit: -1
        })
    }

    const removeChange = () => {
        setState({
            ...state,
            repurchaseOrderArray: [...backup],
            currentEdit: -1
        })
    }
    const changeEdit = (id) => {
        setState({
            ...state,
            repurchaseOrderArray: [...backup],
            currentEdit: id
        })
    }

    const onSubmit = (id) => {
        // e.preventDefault()
        if (!state.repurchaseOrderArray[id].student_name || !state.repurchaseOrderArray[id].phone_no || !state.repurchaseOrderArray[id].school || !state.repurchaseOrderArray[id].grade) {
            return
        }
        console.log(state.repurchaseOrderArray[id])
        var payload = JSON.stringify(state.repurchaseOrderArray[id]);
        fetch(`${url}repurchase/${state.repurchaseOrderArray[id].public_id}`, {
            method: 'PUT',
            body: payload,
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': cookieInJson()['jwt-token']
            }
        })
            .then(res => res.json())
            .then(message => {
                console.log(message)
                setToggle(!toggle)
            })
    }

    const removeOrder = async (id) => {
        if (window.confirm(`確認刪除 [${state.repurchaseOrderArray[id].student_name}] 的訂購?`)) {
            await fetch(`${url}repurchase/${state.repurchaseOrderArray[id].public_id}`, {
                method: 'DELETE',
                headers: {
                    'x-access-token': cookieInJson()['jwt-token']
                }
            })
                .then(res => res.json())
                .then(message => {
                    console.log(message)
                    setToggle(!toggle)
                })
        }
    }

    const getSelectedOrder = () => {
        var checked= Array.from(document.querySelectorAll(".selected-order"))
        return checked.filter(order => order.checked)
                      .map(order => parseInt(order.value))
    }

    const constructExportCSV = (idArray) => {
        var data = idArray.map(id => state.repurchaseOrderArray[id])
        var dataStrings = data.map(order => `${order.student_name},${order.phone_no},${order.school},${order.grade}`)
                              .join("\n")
        return dataStrings
    }

    const exportCSV = () => {
        var selectedOrder = getSelectedOrder()
        if(!selectedOrder.length) return
        console.log(constructExportCSV(selectedOrder))
        const blob = new Blob([constructExportCSV(selectedOrder)], {type: 'text/csv'})
        const a = document.createElement('a')
        a.setAttribute('hidden', '')
        a.setAttribute('href', window.URL.createObjectURL(blob))
        a.setAttribute('download', 'download.csv')
        document.body.appendChild(a)
        a.click()
        document.body.removeChild(a)
        setToggle(!toggle)
    }

    useEffect(() => {
        setState({
            ...state,
            loading: true
        })
        fetchOrder()
    }, [toggle])


    if (!state.logged_in) {
        window.location.replace('/')
    }

    return (
        <>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />
            <Header />
            <div className="container">
                {
                    state.loading
                        ? null

                        : (
                            <>
                                <RepurchaseTable
                                    orderArray={state.repurchaseOrderArray}
                                    admin={state.admin}
                                    currentEdit={state.currentEdit}
                                    changeEdit={changeEdit}
                                    changeState={changeOrderState}
                                    saveChange={saveChange}
                                    removeChange={removeChange}
                                    removeOrder={removeOrder}
                                />
                                <div className="d-flex justify-content-end">
                                    <div>
                                        <button className="btn btn-success" onClick={exportCSV}>Export CSV</button>
                                    </div>
                                    <div className="">
                                        <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
                                            <i className="fas fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                                <AddRepurchase
                                    url={url}
                                    token={cookieInJson()['jwt-token']}
                                    toggle={toggle}
                                    setToggle={setToggle}
                                />
                            </>)
                }
                <TopButton />
            </div>
        </>
    )

}