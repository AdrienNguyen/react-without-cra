import React from 'react'
import { Link } from 'wouter'

const ClientHeader: React.FC = () => {
    return (
        <header className="client-header">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul>
        </header>
    )
}

export default ClientHeader
