import React from 'react';

import './HamburguerMenuItem.css';

interface HamburguerMenuItemProps {
    display: boolean;
}

const HamburguerMenuItem: React.FC<HamburguerMenuItemProps> = (props) => {
    return(
        <li className={props.display ? "hamburguer-menu-item" : "hamburguer-menu-tem off"}>
            { props.children }
        </li>
    );
}

export default HamburguerMenuItem;