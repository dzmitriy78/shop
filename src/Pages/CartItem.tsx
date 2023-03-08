import React from 'react';
import minus from "../assets/img/minus.svg";
import plus from "../assets/img/plus.svg";
import trash from "../assets/img/trash.svg";
import {addItem, minusItem, removeItem} from "../redux/slices/cartSlice";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";

const CartItem: React.FC = () => {
    const dispatch = useAppDispatch()
    const cartItems = useAppSelector(state => state.cart.items)

    const onRemoveHandler = (id: number, size: number, type: string) => {
        if (window.confirm("Вы действительно хотите удалить этот товар?"))
            dispatch(removeItem({id, size, type}))
    }
    const onMinusItemHandler = (id: number, size: number, type: string) => {
        dispatch(minusItem({id, size, type}))
    }
    const onPlusItemHandler = (id: number, size: number, type: string) => {
        dispatch(addItem({id, size, type}))
    }

    return (
        <div>
            {cartItems.map((item, i) => {
                return <div key={i + item.title} className="cart__item">
                    <div className="cart__item-img">
                        <img
                            className="pizza-block__image"
                            src={item.imageUrl}
                            alt="cartItem"
                        />
                    </div>
                    <div className="cart__item-info">
                        <h3>{item.title}</h3>
                        <p>{item.type}, {item.size} л.</p>
                    </div>
                    <div className="cart__item-count">
                        <div
                            className="button button--outline button--circle cart__item-count-minus"
                            onClick={item.count === 1 ?
                                () => onRemoveHandler(item.id, item.size, item.type)
                                : () => onMinusItemHandler(item.id, item.size, item.type)}>
                            <img src={minus} alt={"minus"}/>
                        </div>
                        <b>{item.count}</b>
                        <div className="button button--outline button--circle cart__item-count-plus"
                             onClick={() => onPlusItemHandler(item.id, item.size, item.type)}>
                            <img src={plus} alt={"plus"}/>
                        </div>
                    </div>
                    <div className="cart__item-price">
                        <b>{item.price * item.count} BYN</b>
                    </div>
                    <div className="cart__item-remove">
                        <div className="button button--outline button--circle"
                             onClick={() => onRemoveHandler(item.id, item.size, item.type)}>
                            <img src={trash} alt={"del"}/>
                        </div>
                    </div>
                </div>
            })
            }
        </div>
    )
}

export default CartItem;