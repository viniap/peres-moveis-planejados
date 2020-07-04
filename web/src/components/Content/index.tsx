import React from 'react';

import './Content.css'

const Content: React.FC = (props) => {
    return(
        <div className="content">
            {props.children}
        </div>
    );
}

export default Content;