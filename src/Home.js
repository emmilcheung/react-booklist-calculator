import React from 'react'
import { Header } from './components/Header'
import jwt from 'jsonwebtoken'

import './App.css';

export default function Home() {
    const cookieInJson = () => {
        var obj = {};
        document.cookie.split(';').forEach(cookie => {
            obj[cookie.split('=')[0].replace(/\s+/g, '')] = cookie.split('=')[1]
        });
        return obj
    }
    const loginBtn = () => {
        fetch('http://nc37test.pythonanywhere.com/auth', {
            headers: {
                // 'Access-Control-Allow-Origin': "http://localhost:5000",
                'Authorization': 'Basic ZW1taWw6MTIzNDU=',
            }
        })

        .then(res => res.json())
        .then(data => {
            console.log(data)
            // var decode = jwt.decode(data.token)
            // console.log(new Date(jwt.decode(data.token).exp * 1000))
            document.cookie = `jwt-token=${data.token}; expires= ${new Date(jwt.decode(data.token).exp * 1000)}`
            window.location.reload()
        })
    }
    const logoutBtn = () => {
        // fetch('http://localhost:5000/logout', {
        //     headers: {
        //         'x-access-token': cookieInJson()['jwt-token']
        //     }
        // })
        //     .then(res => res.json)
        //     .then(data => console.log(data))
        document.cookie = `jwt-token=;Max-age=0`
        window.location.reload()
    }
    return (
        <>
            <Header />
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />
            <div className="container">

                <h2>Welcome</h2>
                <div style={{ width: "50vh", textAlign: "center" }}>
                    {
                        !cookieInJson()['jwt-token']
                            ? <button className="btn btn-outline-primary" onClick={loginBtn}>login</button>
                            : <button className="btn btn-outline-danger" onClick={logoutBtn}>Logout</button>
                    }
                </div>
            </div>
        </>
    )

}
