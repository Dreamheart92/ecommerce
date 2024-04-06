import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

import { Link } from "react-router-dom";

import SearchResultCard from "./SearchResultCard.jsx";

export default function Search({ isSearchShowed, setIsSearchShowed }) {
    const [search, setSearch] = useState('');
    const [results, setResults] = useState([]);

    const toggleSearch = () => {
        setIsSearchShowed(search => !search);
    }

    const handleSearchChange = (event) => {
        setSearch(event.target.value);
    }

    useEffect(() => {
        const getResults = async () => {
            const results = await fetch('http://localhost:3000/products?search=' + search);
            const data = await results.json();

            setResults(data);
        }

        getResults();
    }, [search])

    useEffect(() => {
        const closeSearch = (event) => {
            const searchElement = document.querySelector('.search');
            const searchResults = document.getElementById('search-results');

            if (!searchElement.contains(event.target) && isSearchShowed && !searchResults.contains(event.target)) {
                setIsSearchShowed(false);
            }
        }

        if (!isSearchShowed) {
            setSearch('');
            setResults([]);
            document.removeEventListener('click', closeSearch);
        } else {
            document.addEventListener('click', closeSearch);
        }
        return () => {
            document.removeEventListener('click', closeSearch);
        }
    }, [isSearchShowed])

    return (
        <>
            <svg
                onClick={toggleSearch}
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-5 h-6 z-50 ${isSearchShowed ? 'text-stone-900' : null}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>

            <section className="absolute right-0">
                <input
                    className={`${isSearchShowed ? 'w-[20em] px-2 border-b-[.05em] border-stone-900 border-solid' : 'w-[0em]'} transition-all duration-100 ease-in outline-none focus:outline-none text-stone-900`}
                    type="text"
                    placeholder="Search"
                    value={search}
                    onChange={handleSearchChange}
                />
            </section>

            {results.length > 0 && isSearchShowed &&
                createPortal(
                    <section className="border">
                        <section className="flex flex-wrap gap-4 justify-between p-8">
                            {results.slice(0, 6).map(result => <SearchResultCard result={result} />)}
                        </section>

                        <section className="px-8 py-4 flex gap-4">
                            <Link to={{ pathname: '/products/search', search: `?query=${search}` }}>
                                <button
                                    className="px-4 py-0.5 rounded-md bg-black text-stone-200"
                                >View all {results.length} results</button>
                            </Link>

                            <button
                                onClick={() => setIsSearchShowed(false)}
                                className="text-stone-900 underline">Close</button>
                        </section>
                    </section>
                    , document.getElementById('search-results'))
            }
        </>
    )
}