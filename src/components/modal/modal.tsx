import React, {FunctionComponent, ReactNode} from "react";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../modal-overlay/modal-overlay";

const Modal: FunctionComponent<{onClose: ()=>void, children?:ReactNode}> = (props) => {
    React.useEffect(() => {
        function keyDownHandler(event: KeyboardEvent) {
            event.key === 'Escape' && props.onClose();
        }

        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        }
    }, [props])


    return (
        <React.Fragment>
        <ModalOverlay onClick={props.onClose}></ModalOverlay>
            <div className={styles.wrapper} onClick={(event) => event.stopPropagation()}>
                <div className={styles.closeIcon}><CloseIcon type="primary" onClick={props.onClose} /></div>
                {props.children}
            </div>
        </React.Fragment>
    )
}

export default Modal;