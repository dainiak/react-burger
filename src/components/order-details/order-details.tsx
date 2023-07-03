import React from "react";
import styles from './order-details.module.css';
import doneImage from './img/done.png';

function OrderDetails(props: any) {
    return (
        <div className={styles.wrapper}>
            <p className="text text_type_digits-large pt-30 pb-8">034536</p>
            <p className="text text_type_main-medium pb-15">идентификатор заказа</p>
            <img src={doneImage} alt="" className={styles.checkMark}/>
            <p className="text text_type_main-small pt-15">Ваш заказ начали готовить</p>
            <p className="text text_type_main-small text_color_inactive pt-2 pb-30">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;