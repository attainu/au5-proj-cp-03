import React from 'react'

export default function Logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('data')
    return (
        <div>
            <nav className="navbar navbar-light bg-light" style={{ boxShadow: "0 4px 6px -7px black" }}>
                <a className="navbar-brand mr-auto" href="/">Classroom</a>
                <div className="mx-5">
                    <Link to="/login">
                        <button className="btn btn-primary mx-4">Login</button>
                    </Link>
                    <Link to="/register">

                        <button className="btn btn-primary">Signup</button>
                    </Link>
                </div>
            </nav>
            Thanks for your visit hope you learnt something
        </div>
    )
}
