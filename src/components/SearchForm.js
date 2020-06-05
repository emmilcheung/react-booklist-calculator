import React, { useState, useEffect} from 'react'

export const SearchForm = () => {
    const [state, setState] = useState({
        isbn: "",
        title: "",
        publisher: "",
        loading : false
    });
    const [result, setResult] = useState({});

    const onSubmit = e => {
        setState({
            ...state,
            loading : true
        })
        e.preventDefault();
        // console.log(state.isbn, state.title, state.publisher)
        var data = JSON.stringify({
            "ISBN": state.isbn.toString(),
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
            .then(() =>{
                setState({
                    ...state,
                    isbn : "",
                    title : "",
                    publisher : "",
                    loading : false
                })
            })
            .catch(err => console.log("Err : " + err));
    }
    useEffect(() => {
        return () => console.log("rerender")
    }, [state])

    if (state.loading){
        return (<h2>Loading ...</h2>)
    }
    return (
        <div className="flex-container ">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
                    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossOrigin="anonymous" />
            <div className="flex-children"></div>
            <div className="searchForm">
                <h2>Search Here</h2>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="ISBN-input">ISBN</label>
                        <input type="text" className="form-control" id="ISBN-input" value={state.isbn} 
                            onChange={
                                e => setState({
                                    ...state,
                                    isbn : e.target.value
                                })
                            } 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Title-input">Title</label>
                        <input type="text" className="form-control" id="Title-input" value={state.title} 
                            onChange={
                                e => setState({
                                    ...state,
                                    title : e.target.value
                                })
                            }  
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="Publisher-input">Publisher</label>
                        <input type="text" className="form-control" id="Publisher-input" value={state.publisher} 
                            onChange={
                                e => setState({
                                    ...state,
                                    publisher : e.target.value
                                })
                            }  
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
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
                            return( 
                                <tbody key={i} onClick={() => alert("pass")}>
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
        </div>
    )
}

