import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { RepurchaseTable } from './components/RepurchaseTable'
import { AddRepurchase } from './components/AddRepurchase'
import { TopButton } from './components/TopButton'

import './repurchase.css'
import './navbar.css'

export default function Repurchase() {
    const url = "http://nc37test.pythonanywhere.com/"
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
        add: false
    }
    const [state, setState] = useState(initialState)
    const [toggle, setToggle] = useState(true)

    const fetchOrder = () => {
        // var data;

        return fetch(`${url}repurchase`, {
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
                setState({
                    ...state,
                    loading: false,
                    //object apiContent is original data from fetch, edit is used to define is it a change item
                    repurchaseOrderArray: data.dataArray.map(order => {
                        return {
                            apiContent: order,
                            edit: false
                        }
                    })
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
                                />
                                <AddRepurchase
                                    url={url}
                                    token={cookieInJson()['jwt-token']}
                                    toggle={toggle}
                                    setToggle={setToggle}
                                />
                            </>)
                }
                {/* <button onClick={fetchOrder}>fetch text</button> */}
                <TopButton />
                {/* if is add  */}
            </div>
        </>
    )

}