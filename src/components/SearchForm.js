import React, { useState, useEffect } from 'react'

export const SearchForm = () => {
    const [isbn, setISBN] = useState("")
    const [title, setTitle] = useState("")
    const [publisher, setPublisher] = useState("")
    const [result, setResult] = useState({})

    const onSubmit = e => {
        e.preventDefault();
        var postObj = {
            "ISBN": isbn,
            "Title": title,
            "Publisher": publisher
        }
        console.log(postObj)
    }
    useEffect(() => {
        fetch("https://script.google.com/macros/s/AKfycbwaAgK6-zvzPXMRT6WzlCQUpmQg_dF74gWADlpEW00wO3sJU4HS/exec ",
            {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json; charset=utf-8",
                    'cache-control': 'no-cache',      
                    'Access-Control-Allow-Origin': "*"
                },
                body: JSON.stringify({
                    "ISBN": isbn,
                    "Title": title,
                    "Publisher": publisher
                })
            }
        ).then(res => console.log(res))
         .catch(err => console.log("Err : " + err));
        
        return () => {

        }
    }, [publisher])
    return (
        <div>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous" />
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
        </div>
    )
}

