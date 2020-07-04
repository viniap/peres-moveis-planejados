import React from 'react';

import './Navbar.css'

const Navbar: React.FC = (props) => {
    return (
        <nav className="navbar">
            <ul className="navbar-nav">
                { props.children }
            </ul>
        </nav>
    );
}

export default Navbar;