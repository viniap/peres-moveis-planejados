import React from 'react';
import { Link } from 'react-router-dom';

import './DropDownMenuItem.css'

import useAuth from '../../contexts/auth'

interface DropDownMenuItemProps {
    path?: string;
}

const DropDownMenuItem: React.FC<DropDownMenuItemProps> = (props) => {
    const { signOut } = useAuth();

    if(props.path !== undefined) {
        return(
            <Link to={"/" + props.path} className="menu-item">
                { props.children }
            </Link>
        );
    }
    else {
        return(
            <button onClick={signOut} className="menu-button">
                { props.children }
            </button>
        );
    }
}

export default DropDownMenuItem;