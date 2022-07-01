import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-dark bg-dark pt-3 pb-3">
                <div className="conatiner-fluid">
                    <Link exact to="/" className="navbar-brand ms-4">
                        React Redux Contact App
                    </Link>
                </div>
            </nav>
        </>
    )
}

export default Navbar
