import React from 'react';

import './Page.css'

interface PageProps {
    id: string;
}

const Page: React.FC<PageProps> = (props) => {
    return(
        <div id={props.id}>
            {props.children}
        </div>
    );
}

export default Page;