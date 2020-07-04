import React from 'react';

import './NavItem.css'

interface NavItemProps {
    display: boolean;
}

const NavItem: React.FC<NavItemProps> = (props) => {
    return(
        <li className="nav-item">
            { props.display && props.children }
        </li>
    );
}

export default NavItem;