import React from 'react';

import './DropDownMenu.css'

interface DropDownMenuProps {
    open: boolean;
}

const DropDownMenu: React.FC<DropDownMenuProps> = (props) => {
    return (
        <div className={props.open ? "dropdown on" : "dropdown off"}>

        </div>
    );
}

export default DropDownMenu;