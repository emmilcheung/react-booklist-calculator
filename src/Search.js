import React from 'react'
import { Header } from './components/Header'
import { SearchForm } from './components/SearchForm'

export default function Home() {
        return (
            <>
                <Header />
                <div className="searchContainer">
                    <SearchForm />
                </div>
            </>
        )

}