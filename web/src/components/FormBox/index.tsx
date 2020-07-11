import React from 'react';

import './FormBox.css';

const FormBox: React.FC = (props) => {
    return(
        <div className="formbox">
            { props.children }
        </div>
    );
}

export default FormBox;