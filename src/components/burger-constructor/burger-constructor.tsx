import React from 'react';
import {Button, ConstructorElement, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {useDrop} from "react-dnd";
import {ADD_INGREDIENT, postOrder, REMOVE_INGREDIENT} from "../../services/actions";
import {useDispatch, useSelector} from "react-redux";
import BurgerConstructorDraggableElement
    from "../burger-constructor-draggable-element/burger-constructor-druggable-element";

function BurgerConstructor() {
    const [orderDetailsVisible, setOrderDetailsVisible] = React.useState(false);
    const dispatch = useDispatch();
    const ingredients = useSelector((store: any) => store.burgerConstructor.items);
    const orderNumber = useSelector((store: any) => store.order.number);
    const bun = useSelector((store: any) => store.burgerConstructor.bun);
    // @ts-ignore
    const totalPrice = ingredients.reduce((partialSum, ingredient) => partialSum + ingredient.price, 0)
        + (bun ? bun.price * 2 : 0);

    const submitOrder = () => {
        setOrderDetailsVisible(true);
        // @ts-ignore
        dispatch(postOrder([bun, ...ingredients.map(item => item._id), bun]));
    }

    const [{isHover}, dropTarget] = useDrop({
        accept: 'ingredient',
        drop(item) {
            dispatch({type: ADD_INGREDIENT, payload: item});
        },
        collect: monitor => ({
            isHover: monitor.isOver(),
        })
    });


    return (
        <React.Fragment>
            {orderDetailsVisible &&
                <Modal onClose={() => setOrderDetailsVisible(false)}>
                    <OrderDetails />
                </Modal>
            }
            <div className={`pt-25 ${styles.mainWrapper}`}>
                <div ref={dropTarget} className={`${isHover && styles.constructorDropNudge}`}>
                    {bun && <div className={`${styles.constructorElementWrapper} ${styles.constructorUpperBun}`} >
                        <ConstructorElement
                        type="top"
                        isLocked={true}
                        text={bun.name + ' (верх)'}
                        price={bun.price}
                        thumbnail={bun.image}
                    /></div>}

                    <div className={`custom-scroll ${styles.scrollablePart}`}>
                        {!bun && <p className={`${styles.emptyConstructor}`}>Сначала выберите булку. Перетащите её сюда из списка ингредиентов.</p>}
                        {
                            ingredients.map((item: any, index: any) =>
                                (
                                    <BurgerConstructorDraggableElement
                                        key={item._id + index.toString()}
                                        index={index}
                                        text={item.name}
                                        price={item.price}
                                        thumbnail={item.image}
                                        handleClose={() => dispatch({type: REMOVE_INGREDIENT, payload: {id: item._id, index: index}})}
                                    />
                                )
                            )
                        }
                    </div>
                    {bun && <div  className={`${styles.constructorElementWrapper} ${styles.constructorLowerBun}`}><ConstructorElement
                        type="bottom"
                        isLocked={true}
                        text={bun.name + ' (низ)'}
                        price={bun.price}
                        thumbnail={bun.image}
                    /></div>}
                </div>

                <div className={`pt-10 ${styles.footerWrapper}`}>
                    <p className="text text_type_digits-medium">{totalPrice}</p>
                    <CurrencyIcon type="primary" />
                    <div className="pr-5"></div>
                    {orderNumber === null && bun &&
                        <Button htmlType="submit" type="primary" size="large" onClick={() => submitOrder()}>
                        Оформить заказ
                        </Button>
                    }
                </div>
            </div>
        </React.Fragment>
    )
}

export default BurgerConstructor;