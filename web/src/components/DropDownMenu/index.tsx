import React from 'react';

import './DropDownMenu.css'

import DropDownMenuItem from '../DropDownMenuItem';

const DropDownMenu: React.FC = (props) => {
    return (
        <div className="dropdown">
            <DropDownMenuItem path="painel">Meu painel</DropDownMenuItem>
            <DropDownMenuItem path="perfil">Meu perfil</DropDownMenuItem>
            <DropDownMenuItem path="agendar">Agendar visita</DropDownMenuItem>
            <DropDownMenuItem>Sair</DropDownMenuItem>
        </div>
    );
}

export default DropDownMenu;