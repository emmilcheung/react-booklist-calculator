import React, { useState } from 'react'
import { Header } from './components/Header'
import jwt from 'jsonwebtoken'

import './App.css';

export default function Home() {

    const [state, setState] = useState({
        username: "",
        password: ""
    })
    const url = "https://nc37test.pythonanywhere.com/"
    // const url = "http://localhost:5000/"
    const cookieInJson = () => {
        var obj = {};
        document.cookie.split(';').forEach(cookie => {
            obj[cookie.split('=')[0].replace(/\s+/g, '')] = cookie.split('=')[1]
        });
        return obj
    }
    const loginBtn = () => {

        // console.log(Buffer.from(`${state.username}:${state.password}`).toString('base64'))
        fetch(`${url}auth`, {
            headers: {
                // 'Access-Control-Allow-Origin': "http://localhost:5000",
                'Authorization': "Basic "+Buffer.from(`${state.username}:${state.password}`).toString('base64'),
            }
        })

            .then(res => res.json())
            .then(data => {
                // console.log(data)
                // var decode = jwt.decode(data.token)
                // console.log(new Date(jwt.decode(data.token).exp * 1000))
                document.cookie = `jwt-token=${data.token}; expires= ${new Date(jwt.decode(data.token).exp * 1000)}`
                window.location.reload()
            })
    }
    const logoutBtn = () => {
        console.log("logout?")
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
                <div style={{ maxWidth: "30rem", textAlign: "center" }}>
                    {
                        !cookieInJson()['jwt-token']
                            ? (
                                <>
                                <div className="form-group">
                                    <label htmlFor="username">username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="username"
                                        placeholder="username"
                                        value={state.username}
                                        onChange={e => setState({
                                            ...state,
                                            username: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="password"
                                        placeholder="password"
                                        value={state.password}
                                        onChange={e => setState({
                                            ...state,
                                            password: e.target.value
                                        })}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary" onClick={loginBtn}>Submit</button>
                            </>)
                            : <button className="btn btn-outline-danger" onClick={logoutBtn}>Logout</button>
                    }
                </div>
            </div>
        </>
    )

}
