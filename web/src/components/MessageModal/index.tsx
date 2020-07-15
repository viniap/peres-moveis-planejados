import React from 'react';
import Modal from '@material-ui/core/Modal';

import './MessageModal.css';

import { ReactComponent as Close } from '../../assets/close.svg'

interface MessageModalProps {
    message: string;
    icon: any;
    open: boolean;
}

const MessageModal: React.FC<MessageModalProps> = (props) => {
    const [open, setOpen] = React.useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    React.useEffect(() => {
        setOpen(props.open);
    }, [props.open]);

    return(
        <div>
            <Modal
                open={open ? props.open : false}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className="message-modal">
                    <div className="header">
                        <span className="close" onClick={handleClose}>
                            <Close width="20px"/>
                        </span>
                    </div>

                    <span className="message">
                        { props.icon }
                        <h3>{ props.message }</h3>
                    </span>
                </div>
            </Modal>
        </div>
    );
}

export default MessageModal;