import React from 'react'
import { Header } from './components/Header'
import { SearchForm } from './components/SearchForm'
import { TopButton } from './components/TopButton'

export default function Home() {
    return (
        <>
            <Header />
            <div className="searchContainer">
                <SearchForm />
                <TopButton />
                {/* Hallo world */}
            </div>
        </>
    )

}