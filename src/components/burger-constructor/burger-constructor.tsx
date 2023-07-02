import React from 'react';
import {Button, ConstructorElement, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import Modal from "../modal/modal";

function BurgerConstructor() {
    const [orderDetailsVisible, setOrderDetailsVisible] = React.useState(false);

    return (
        <React.Fragment>
            {orderDetailsVisible &&
                <Modal onClose={() => setOrderDetailsVisible(false)}>
                    <OrderDetails />
                </Modal>
            }
            <div className={`pt-25 ${styles.mainWrapper}`}>
                <div className={styles.constructorElementWrapper}>
                    <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                /></div>

                <div className={`custom-scroll ${styles.scrollablePart}`}>
                    <div  className={styles.constructorElementWrapper}>
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                        />
                        <DragIcon type="primary" />
                    </div>
                    <div  className={styles.constructorElementWrapper}>
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                        />
                        <DragIcon type="primary" />
                    </div>
                </div>
                <div  className={styles.constructorElementWrapper}><ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                /></div>

                <div className={`pt-10 ${styles.footerWrapper}`}>
                    <p className="text text_type_digits-medium">610</p>
                    <CurrencyIcon type="primary" />
                    <div className="pr-5"></div>
                    <Button htmlType="submit" type="primary" size="large" onClick={() => setOrderDetailsVisible(true)}>
                        Оформить заказ
                    </Button>
                </div>
            </div>
        </React.Fragment>
    )
}


export default BurgerConstructor;