import React from "react";
import styles from './modal-overlay.module.css';
import PropTypes from 'prop-types';

function ModalOverlay(props: any) {
  return (
      <div className={styles.overlay} onClick={props.onClick}>
          {props.children}
      </div>
  )
}

ModalOverlay.propTypes = {
    onClick: PropTypes.func
}

export default ModalOverlay;