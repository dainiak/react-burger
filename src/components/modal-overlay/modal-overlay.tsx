import React, {FunctionComponent, MouseEventHandler} from "react";
import styles from './modal-overlay.module.css';

const ModalOverlay:FunctionComponent<{onClick: MouseEventHandler<HTMLElement>}> = (props: {onClick: MouseEventHandler<HTMLElement>, children?: any}) => {
  return (
      <div className={styles.overlay} onClick={props.onClick}>
          {props.children}
      </div>
  )
}

export default ModalOverlay;