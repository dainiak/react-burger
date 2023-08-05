import React from 'react';
import {Button, ConstructorElement, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";
import {useDrop} from "react-dnd";
import {ADD_INGREDIENT, REMOVE_INGREDIENT} from "../../services/actions/burger-constructor";
import {useDispatch, useSelector} from "react-redux";
import BurgerConstructorDraggableElement
    from "../burger-constructor-draggable-element/burger-constructor-druggable-element";
import {selectBurgerConstructorBun, selectBurgerConstructorItems} from "../../services/selectors/burger-constructor";
import {selectOrderNumber} from "../../services/selectors/order";
import {postOrder} from "../../services/actions/order";
import {selectUser} from "../../services/selectors/user";
import {useNavigate} from "react-router-dom";

function BurgerConstructor() {
    const [orderDetailsVisible, setOrderDetailsVisible] = React.useState(false);
    const dispatch = useDispatch();
    const ingredients = useSelector(selectBurgerConstructorItems);
    const orderNumber = useSelector(selectOrderNumber);
    const bun = useSelector(selectBurgerConstructorBun);
    const user = useSelector(selectUser);
    const navigate = useNavigate();

    // @ts-ignore
    const totalPrice = ingredients.reduce((partialSum, ingredient) => partialSum + ingredient.price, 0)
        + (bun ? bun.price * 2 : 0);

    const submitOrder = () => {
        if(!user.profile)
            navigate('/login');
        else {
            setOrderDetailsVisible(true);
            // @ts-ignore
            dispatch(postOrder([bun, ...ingredients.map(item => item._id), bun]));
        }
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
                                        key={item.uuid}
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