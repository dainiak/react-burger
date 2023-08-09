import React, {FunctionComponent} from 'react';
import { CurrencyIcon, Counter } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './ingredient-card.module.css';
import {useDrag} from "react-dnd";


type TIngredientCardProps = {
    ingredientItem: any;
    count: number;
    onClick: () => void;
}

const IngredientCard:FunctionComponent<TIngredientCardProps> = (props) => {
    const text = props.ingredientItem.name;
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


export default IngredientCard;