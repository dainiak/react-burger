import React from 'react';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';

function IngredientCard(props: any) {
    const text = props.text;
    const price = props.price;
    const thumbnail = props.thumbnail;

    return (
        <div className={styles.mainWrapper} onClick={props.onClick}>
            {/*<Counter count={1} size="default" extraClass="m-1" />*/}
            <img src={thumbnail} alt={text} />
            <div className={`pt-1 pb-1 ${styles.pricePart}`}>
                <p className="text text_type_digits-default pr-2">{price}</p>
                <CurrencyIcon type="primary" />
            </div>

            <p className="text text_type_main-small" style={{textAlign: "center"}}>{text}</p>
        </div>
    )
}

export default IngredientCard;