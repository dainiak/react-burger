import React from 'react';
import {Button, ConstructorElement, DragIcon, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './burger-constructor.module.css';
import OrderDetails from "../order-details/order-details";
import ModalOverlay from "../modal-overlay/modal-overlay";
import Modal from "../modal/modal";

function BurgerConstructor(props: any) {
    const [orderDetailsVisible, setOrderDetailsVisible] = React.useState(false);

    return (
        <React.Fragment>
            {orderDetailsVisible &&
                <ModalOverlay onClick={() => setOrderDetailsVisible(false)}>
                    <Modal onClose={() => setOrderDetailsVisible(false)}>
                        <OrderDetails />
                    </Modal>
                </ModalOverlay>
            }
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', width:"580px" }} className="pt-25">
                <div style={{display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
                    <ConstructorElement
                    type="top"
                    isLocked={true}
                    text="Краторная булка N-200i (верх)"
                    price={200}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                /></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px'}} className="custom-scroll">
                    <div style={{display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                        />
                        <DragIcon type="primary" />
                    </div>
                    <div style={{display: "flex", flexDirection: "row-reverse", alignItems: "center"}}>
                        <ConstructorElement
                            text="Краторная булка N-200i (верх)"
                            price={50}
                            thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                        />
                        <DragIcon type="primary" />
                    </div>
                </div>
                <div style={{display: "flex", flexDirection: "row-reverse", alignItems: "center"}}><ConstructorElement
                    type="bottom"
                    isLocked={true}
                    text="Краторная булка N-200i (низ)"
                    price={200}
                    thumbnail={"https://code.s3.yandex.net/react/code/bun-02.png"}
                /></div>

                <div style={{width:"100%", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "right", gap: "10px"}} className="pt-10">
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