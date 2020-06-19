import React, { useState, useEffect } from 'react'
import { Header } from './components/Header'
import { RepurchaseTable } from './components/RepurchaseTable'
import { TopButton } from './components/TopButton'
import { Redirect } from 'react-router-dom'

import './repurchase.css'
import './navbar.css'

export default function Home() {
    const cookieInJson = () => {
        var obj = {};
        document.cookie.split(';').forEach(cookie => {
            obj[cookie.split('=')[0].replace(/\s+/g, '')] = cookie.split('=')[1]
        });
        return obj
    }
    const initialState = {
        repurchaseOrderArray: [],
        logged_in: cookieInJson()['jwt-token'] ? true : false
    }
    const [state, setState] = useState(initialState)
    const [toggle, setToggle] = useState(true)

    const fetchOrder = () => {
        // var data;
        return fetch('http://nc37test.pythonanywhere.com/repurchase', {
            headers: {
                'x-access-token': cookieInJson()['jwt-token']
            }
        })
            .then(res => res.json())
            .then(data => {
                setState({
                    ...state,
                    //object apiContent is original data from fetch, edit is used to define is it a change item
                    repurchaseOrderArray: data.dataArray.map(order => {
                        return {
                            apiContent: order,
                            edit: false
                        }
                    })
                })
            })
        // console.log(data)
        // return data
    }

    useEffect(() => {
        fetchOrder()
    }, [toggle])

    
    if (!state.logged_in){
        window.location.replace('/')
    }

    return (
        <>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />
            <Header />
            <div className="container">

                

                <RepurchaseTable
                    orderArray={state.repurchaseOrderArray}
                />

                {/* <button onClick={fetchOrder}>fetch text</button> */}
                <TopButton />
            </div>
        </>
    )

}