import React from 'react';

import './NavItem.css'

interface NavItemProps {
    display: boolean;
    icon?: any;
}

const NavItem: React.FC<NavItemProps> = (props) => {
    const [open, setOpen] = React.useState(false);

    if((props.icon !== undefined) && (props.display === true)) {
        return (
            <li className="nav-item">
                <button className="icon-button" onClick={() => setOpen(!open)}>
                    { props.icon }
                </button>
        
                {open && props.children}
            </li>
        );
    }
    else {
        return(
            <li className="nav-item">
                { props.display && props.children }
            </li>
        );
    }
}

export default NavItem;