import React from 'react';

import Logo from '../Logo';
import Menu from '../Menu';
import './Header.css'

const Header = () => {
    return (
        <header>
            <Logo/>
            
            <Menu />
        </header>
    );
}

export default Header;