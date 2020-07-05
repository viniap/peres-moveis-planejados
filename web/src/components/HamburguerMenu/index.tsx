import React from 'react';

import './HamburguerMenu.css';

const HamburguerMenu: React.FC = (props) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return(
        <>
            <div onClick={toggle} className={isOpen ? "menu-toggle close" : "menu-toggle"}>
                <div className="one"></div>
                <div className="two"></div>
                <div className="three"></div>
            </div>

            <div className={isOpen ? "menu-toggle-content on" : "menu-toggle-content"}>
                <ul>
                    { props.children }
                </ul>
            </div>
        </>
    );
}

export default HamburguerMenu;