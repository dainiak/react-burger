import styles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React, {FunctionComponent} from "react";
import {useDrag, useDrop} from "react-dnd";
import {REORDER_INGREDIENTS} from "../../services/actions/burger-constructor";
import {useDispatch} from "react-redux";

type TBurgerConstructorDraggableElementProps = {
    index: number;
    text: string;
    price: number;
    thumbnail: string;
    handleClose: () => void;
};

const BurgerConstructorDraggableElement: FunctionComponent<TBurgerConstructorDraggableElementProps> = (props) =>      {
    const dispatch = useDispatch();

    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredientInConstructor',
        item: {index: props.index},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [{isHover}, dropTarget] = useDrop({
        accept: 'ingredientInConstructor',
        drop(item: TBurgerConstructorDraggableElementProps) {
            dispatch({type: REORDER_INGREDIENTS, payload: {first_index: item.index, second_index: props.index}});
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });

    return (
        <div ref={dropTarget} style={{opacity: isHover ? 0.7 : 1}}>
            <div className={styles.constructorElementWrapper} style={{opacity: isDrag ? 0.3 : 1}} ref={dragRef}>

            <ConstructorElement
                text={props.text}
                price={props.price}
                thumbnail={props.thumbnail}
                handleClose={props.handleClose}
            />
            <DragIcon type="primary"/>
            </div>
        </div>
    )
}

export default BurgerConstructorDraggableElement;