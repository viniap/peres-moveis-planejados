import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import './Menu.css';

import Navbar from '../Navbar';
import NavItem from '../NavItem';
import HamburguerMenu from '../HamburguerMenu'
import HamburguerMenuItem from '../HamburguerMenuItem'
import DropDownMenu from '../DropDownMenu';
import { ReactComponent as ArrowIcon } from '../../assets/arrow.svg'
import useAuth from '../../contexts/auth'

const Menu = () => {
    const { signed, user, signOut } = useAuth();

    const history = useHistory();

    function handleSignOut() {
        console.log('eae');
        signOut();
        history.push('/');
        window.location.reload();
    }

    return (
            <div className="menu-section">
                <HamburguerMenu>
                    <HamburguerMenuItem display={signed ? true : false}>
                        <p className="hello-hamburguer">Olá, { user?.name }</p>
                    </HamburguerMenuItem>

                    <HamburguerMenuItem display={true}>
                        <Link className="hamburguer-menu-link" to="/sobre"><span>Sobre</span></Link>
                    </HamburguerMenuItem>

                    <HamburguerMenuItem display={true}>
                        <Link className="hamburguer-menu-link" to="/portfolio"><span>Portfólio</span></Link>
                    </HamburguerMenuItem>

                    <HamburguerMenuItem display={true}>
                        <Link className="hamburguer-menu-link" to="/contato"><span>Contato</span></Link>
                    </HamburguerMenuItem>

                    <HamburguerMenuItem display={signed ? false : true}>
                        <Link className="hamburguer-menu-link" to="/entrar">Entrar</Link>
                    </HamburguerMenuItem>

                    <HamburguerMenuItem display={signed ? true : false}>
                        <Link className="hamburguer-menu-link" to="/painel"><span>Meu painel</span></Link>
                    </HamburguerMenuItem>

                    <HamburguerMenuItem display={signed ? true : false}>
                        <Link className="hamburguer-menu-link" to="/perfil"><span>Meu perfil</span></Link>
                    </HamburguerMenuItem>

                    <HamburguerMenuItem display={signed ? true : false}>
                        <Link className="hamburguer-menu-link" to="/agendar"><span>Agendamento de visita</span></Link>
                    </HamburguerMenuItem>

                    <HamburguerMenuItem display={signed ? true : false}>
                        <button className="hamburguer-menu-link button" onClick={handleSignOut}>Sair</button>
                    </HamburguerMenuItem>
                </HamburguerMenu>

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
                    </NavItem>

                    <NavItem icon={<ArrowIcon />} display={signed ? true : false}>
                        <DropDownMenu></DropDownMenu>
                    </NavItem>
                </Navbar>
            </div>
    );
}

export default Menu;