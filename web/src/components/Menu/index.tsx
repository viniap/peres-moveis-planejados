import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

const Menu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggle = () => setIsOpen(!isOpen);

    return (
            <div className={isOpen ? "menu-section on" : "menu-section"}>
                <div onClick={toggle} className="menu-toggle">
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
                </div>

                <nav>
                    <ul>
                        <li>
                        <Link to="/sobre"><span>Sobre</span></Link>
                        </li>

                        <li>
                        <Link to="/portfolio"><span>Portfólio</span></Link>
                        </li>

                        <li>
                        <Link to="/contato"><span>Contato</span></Link>
                        </li>

                        <li>
                        <Link className="login" to="/entrar">Entrar</Link>
                        </li>
                    </ul>
                </nav>
            </div>
    );
}

export default Menu;