import styles from "../burger-constructor/burger-constructor.module.css";
import {ConstructorElement, DragIcon} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import {useDrag, useDrop} from "react-dnd";
import PropTypes from "prop-types";
import {REORDER_INGREDIENTS} from "../../services/actions";
import {useDispatch} from "react-redux";


function BurgerConstructorDraggableElement(props: any) {
    const dispatch = useDispatch();
    // @ts-ignore
    const [{isDrag}, dragRef] = useDrag({
        type: 'ingredientInConstructor',
        // @ts-ignore
        item: {index: props.index},
        collect: monitor => ({
            isDrag: monitor.isDragging()
        })
    });

    const [{isHover}, dropTarget] = useDrop({
        accept: 'ingredientInConstructor',
        drop(item) {
            // @ts-ignore
            dispatch({type: REORDER_INGREDIENTS, payload: {first_index: item.index, second_index: props.index}});
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });


    // @ts-ignore
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


BurgerConstructorDraggableElement.propTypes = {
    index: PropTypes.number,
    text: PropTypes.string,
    price: PropTypes.number,
    thumbnail: PropTypes.string,
    handleClose: PropTypes.func.isRequired
}

export default BurgerConstructorDraggableElement;