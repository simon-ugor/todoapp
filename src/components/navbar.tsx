import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { FiFilter } from "react-icons/fi"

interface Props {
    searchClick?: () => void
    filterClick?: () => void
    searchFilterHidden: boolean
}

const Navbar = ({ searchClick, filterClick, searchFilterHidden }: Props) => {

    useEffect(() => {
        if (searchFilterHidden) {
            setHidden("hidden")
        } else {
            setHidden("")
        }
    }, [])

    const [hidden, setHidden] = useState("");

  return (
    <div className="navbar bg-base-100 w-full">
    <div className="navbar-start z-40">
        <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost btn-circle z-40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 z-40" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
            <li><Link href="/">Domov</Link></li>
            <li><Link href="/oaplikacii">O aplikácii</Link></li>
            <li><a href="/zdrojovykod" target="_blank">Zdrojový kód</a></li>
        </ul>
        </div>
    </div>
    <div className="navbar-center">
        <a className="btn btn-ghost normal-case text-xl">ToDo App</a>
    </div>
    <div className="navbar-end">
        <button className={"btn btn-ghost btn-circle " + hidden} onClick={filterClick}>
            <FiFilter className='h-4 w-4' />
        </button>
        <button className={"btn btn-ghost btn-circle " + hidden} onClick={searchClick}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
        </button>
    </div>
</div>
  )
}

export default Navbar