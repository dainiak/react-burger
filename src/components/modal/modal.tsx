import React from "react";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";
import PropTypes from 'prop-types';

function Modal(props: any) {
    function keyDownHandler(event: any) {
        event.keyCode === 27 && props.onClose();
    }

    React.useEffect(() => {
        document.addEventListener("keydown", keyDownHandler);
        return () => {
            document.removeEventListener("keydown", keyDownHandler);
        }
    }, [])


    return (
        <ModalOverlay onClick={props.onClose}>
            <div className={styles.wrapper} onClick={(event) => event.stopPropagation()}>
                <div className={styles.closeIcon}><CloseIcon type="primary" onClick={props.onClose} /></div>
                {props.children}
            </div>
        </ModalOverlay>
    )
}

Modal.propTypes = {
    onClose: PropTypes.func,
    children: PropTypes.node.isRequired
}

export default Modal;