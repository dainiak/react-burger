import React from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import PropTypes from 'prop-types';
import {useDrag} from "react-dnd";
import {ingredientPropTypes} from "../../utils/prop-types";

function IngredientCard(props: any) {
    const text = props.ingredientItem.text;
    const price = props.ingredientItem.price;
    const thumbnail = props.ingredientItem.image;

    const [, dragRef] = useDrag({
        type: 'ingredient',
        item: props.ingredientItem,
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    return (
        <div className={styles.mainWrapper} onClick={props.onClick}>
            <Counter count={props.count} size="default" extraClass={`m-1 ${styles.counter} ${props.count > 0 ? '' : styles.hidden}`} />
            <img src={thumbnail} alt={text}  ref={dragRef} />
            <div className={`pt-1 pb-1 ${styles.pricePart}`}>
                <p className="text text_type_digits-default pr-2">{price}</p>
                <CurrencyIcon type="primary" />
            </div>

            <p className={`text text_type_main-small ${styles.name}`}>{text}</p>
        </div>
    )
}

IngredientCard.propTypes = {
    ingredientItem: ingredientPropTypes,
    count: PropTypes.number.isRequired,
    onClick: PropTypes.func.isRequired
}

export default IngredientCard;