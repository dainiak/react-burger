import React from "react";
import styles from './modal-overlay.module.css';

function ModalOverlay(props: any) {
  return (
      <div className={styles.overlay} onClick={props.onClick}>
          {props.children}
      </div>
  )
}

export default ModalOverlay;