import React from "react";
import styles from './order-details.module.css';
import doneImage from './img/done.png';
import {useSelector} from "react-redux";
import {selectOrder} from "../../services/selectors/order";

function OrderDetails() {
    const {number, name, isPosting, hasError} = useSelector(selectOrder);

    return (
        <div className={styles.wrapper}>
            {number && (<p className="text text_type_digits-large pt-30 pb-8">{number}</p>)}
            {number && (<p className="text text_type_main-medium pb-15">идентификатор заказа</p>)}
            {number && <img src={doneImage} alt="" className={styles.checkMark}/>}
            <p className="text text_type_main-small pt-15">{
                number ? `Ваш заказ «${name}» начали готовить` :
                isPosting ? 'Отправляем заказ...' :
                hasError ? 'Ошибка при отправке заказа. Попробуйте еще раз.' : ''
            }</p>
            <p className="text text_type_main-small text_color_inactive pt-2 pb-30">Дождитесь готовности на орбитальной станции</p>
        </div>
    )
}

export default OrderDetails;