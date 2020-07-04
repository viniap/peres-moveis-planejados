import React from 'react';
import { Link } from 'react-router-dom';

import './Menu.css';

import Navbar from '../Navbar';
import NavItem from '../NavItem';
import { ReactComponent as Arrow } from '../../assets/arrow.svg'
import useAuth from '../../contexts/auth'

const Menu = () => {
    const [isOpen, setIsOpen] = React.useState(false);
    const toggle = () => setIsOpen(!isOpen);

    const [dropDownMenu, setDropDownMenu] = React.useState(false);
    const toggleDropDownMenu = () => setDropDownMenu(!dropDownMenu);

    const { signed, user } = useAuth();

    return (
            <div className={isOpen ? "menu-section on" : "menu-section"}>
                <div onClick={toggle} className="menu-toggle">
                    <div className="one"></div>
                    <div className="two"></div>
                    <div className="three"></div>
                </div>

                <Navbar>
                    <NavItem display={true}>
                        <Link to="/sobre"><span>Sobre</span></Link>
                    </NavItem>

                    <NavItem display={true}>
                        <Link to="/portfolio"><span>Portfólio</span></Link>
                    </NavItem>

                    <NavItem display={true}>
                        <Link to="/contato"><span>Contato</span></Link>
                    </NavItem>

                    <NavItem display={signed ? false : true}>
                        <Link className="login" to="/entrar">Entrar</Link>
                    </NavItem>

                    <NavItem display={signed ? true : false}>
                        <p className="hello">Olá,<br/>{ user?.name }</p>

                        <button className="arrow" onClick={toggleDropDownMenu}>
                            <Arrow/>
                        </button>
                    </NavItem>
                </Navbar>
            </div>
    );
}

export default Menu;