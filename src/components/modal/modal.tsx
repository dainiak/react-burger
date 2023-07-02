import React from "react";
import styles from './modal.module.css';
import {CloseIcon} from "@ya.praktikum/react-developer-burger-ui-components";

function Modal(props: any) {
    return (
        <div className={styles.wrapper} onClick={(event) => event.stopPropagation()}>
            <div className={styles.closeIcon}><CloseIcon type="primary" onClick={props.onClose} /></div>
            {props.children}
        </div>
    )
}

export default Modal;