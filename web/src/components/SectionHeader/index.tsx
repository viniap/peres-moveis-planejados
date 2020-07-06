import React from 'react';

import './SectionHeader.css';

const SectionHeader: React.FC = (props) => {
    return(
        <div className="section-header">
            <h1 className="section-title">{ props.children }</h1>

            <div className="horizontal-bar" ></div>
        </div>
    );
}

export default SectionHeader;