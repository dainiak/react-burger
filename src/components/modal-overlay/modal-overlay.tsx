import React, {FunctionComponent, MouseEventHandler, ReactNode} from "react";
import styles from './modal-overlay.module.css';

const ModalOverlay:FunctionComponent<{onClick: MouseEventHandler<HTMLElement>}> = (props: {onClick: MouseEventHandler<HTMLElement>, children?: ReactNode}) => {
  return (
      <div className={styles.overlay} onClick={props.onClick}>
          {props.children}
      </div>
  )
}

export default ModalOverlay;