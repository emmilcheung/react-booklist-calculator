import React, { useState, useEffect } from 'react'
import loadingGif from '../data/loading-2.gif'

export const SearchForm = () => {
    const [state, setState] = useState({
        isbn: "",
        title: "",
        publisher: "",
        loading: false,
        warn: false
    });
    const [result, setResult] = useState({});
    const onSubmit = e => {
        e.preventDefault();
        if (state.isbn.replace(/\n/g, "") === "" && state.title === "" && state.publisher === "") {
            setState({ ...state, warn: true })
            return state
        }
        setState({
            ...state,
            loading: true
        })
        // console.log(state.isbn, state.title, state.publisher)
        var data = JSON.stringify({
            "ISBN": state.isbn.toString().replace(/\n/g, ","),
            "Title": state.title.toString(),
            "Publisher": state.publisher.toString()
        })
        fetch("https://script.google.com/macros/s/AKfycbwaAgK6-zvzPXMRT6WzlCQUpmQg_dF74gWADlpEW00wO3sJU4HS/exec",
            {
                method: 'POST',
                header: {
                    "content-type": "text/plain"
                },
                body: data
            }
        ).then(res => res.json())
            .then(json => {
                // console.log(json)
                setResult(json)
            })
            .then(() => {
                setState({
                    ...state,
                    isbn: "",
                    title: "",
                    publisher: "",
                    loading: false,
                    warn: false
                })
                var element = document.getElementsByClassName("resultTable");
                element[0].scrollIntoView({ block: "start", behavior: "smooth" })
            })
            .catch(err => console.log("Err : " + err));
        // console.log(data)
    }
    useEffect(() => {
        return () => console.log("rerender")
    }, [state])

    return (
        <div className="flex-container">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />
            <div className="flex-children"></div>
            <div className={(state.warn) ? "searchForm warn" : "searchForm"}>
                <h2>Search Here</h2>
                <form onSubmit={onSubmit}>
                    <div className={(state.warn) ? "form-group warn" : "form-group"}>
                        <label htmlFor="ISBN-input" className="form-label">ISBN</label>
                        <div className="form-content">
                            <textarea className="form-control" id="ISBN-input" value={state.isbn}
                                onChange={
                                    e => setState({
                                        ...state,
                                        isbn: e.target.value
                                    })
                                }
                                placeholder="isbn"
                                rows="4"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Title-input" className="form-label">Title</label>
                        <div className="form-content">
                            <input type="text" className="form-control" id="Title-input" value={state.title}
                                onChange={
                                    e => setState({
                                        ...state,
                                        title: e.target.value
                                    })
                                }
                                placeholder="書名"
                            />
                        </div>
                    </div>
                    <div className="form-group">
                        <label htmlFor="Publisher-input" className="form-label">Publisher</label>
                        <div className="form-content">
                            <input type="text" className="form-control" id="Publisher-input" value={state.publisher}
                                onChange={
                                    e => setState({
                                        ...state,
                                        publisher: e.target.value
                                    })
                                }
                                placeholder="出版社"
                            />
                        </div>
                    </div>
                    <small>Please at least input one field (or more).</small>
                    <div className="form-button">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </form>
            </div>
            <div className="resultTable">
                <table className="table ">
                    <thead className="thead-light">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">ISBN</th>
                            <th scope="col">Title</th>
                            <th scope="col">Price</th>
                        </tr>
                    </thead>
                    {
                        (!Object.keys(result).length) ? "" : result.bookList.map((book, i) => {
                            return (
                                <tbody key={i}>
                                    <tr>
                                        <th scope="row">{i + 1}</th>
                                        <td>{book.ISBN}</td>
                                        <td>
                                            {book.Title}
                                        </td>
                                        <td>${parseFloat(book.Price).toFixed(1)}</td>
                                    </tr>
                                </tbody>
                            )

                        })
                    }

                </table>
            </div>
            <div className={state.loading ? "end" : null}></div>
        </div>
    )
}

