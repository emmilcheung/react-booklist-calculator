import React, { useState } from 'react'

export const SearchForm = () => {
    const [isbn, setISBN] = useState("")
    const [title, setTitle] = useState("")
    const [publisher, setPublisher] = useState("")
    const [result, setResult] = useState({})

    const onSubmit = e => {
        e.preventDefault();
        console.log(isbn, title, publisher)
        var data = JSON.stringify({
            "ISBN": isbn.toString(),
            "Title": title.toString(),
            "Publisher": publisher.toString()
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
                console.log(json)
                setResult(json)
            })
            .catch(err => console.log("Err : " + err));

    }
    return (
        <div>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="ISBN-input">ISBN</label>
                    <input type="text" className="form-control" id="ISBN-input" value={isbn} onChange={e => setISBN(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="Title-input">Title</label>
                    <input type="text" className="form-control" id="Title-input" value={title} onChange={e => setTitle(e.target.value)} />
                </div>
                <div className="form-group">
                    <label htmlFor="Publisher-input">Publisher</label>
                    <input type="text" className="form-control" id="Publisher-input" value={publisher} onChange={e => setPublisher(e.target.value)} />
                </div>
                {/* <div className="form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div> */}
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>

            <table className="table">
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
                            <tbody>
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
    )
}

