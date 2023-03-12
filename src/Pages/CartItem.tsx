import React from 'react';
import minus from "../assets/img/minus.svg";
import plus from "../assets/img/plus.svg";
import trash from "../assets/img/trash.svg";
import {addItem, CartItemType, minusItem, removeItem} from "../redux/slices/cartSlice";
import {useAppDispatch} from "../hooks/reduxHooks";
import './../scss/app.scss';

const CartItem: React.FC<{ item: CartItemType }> = ({item}) => {
    const dispatch = useAppDispatch()

    const onRemoveHandler = (id: string, size: number, type: string) => {
        if (window.confirm("Вы действительно хотите удалить этот товар?"))
            dispatch(removeItem({id, size, type}))
    }
    const onMinusItemHandler = (id: string, size: number, type: string) => {
        dispatch(minusItem({id, size, type}))
    }
    const onPlusItemHandler = (id: string, title: string, price: number, imageUrl: string, type: string, size: number, count: number) => {
        dispatch(addItem({id, title, price, imageUrl, type, size, count}))
    }

    return (
        <div className="cart__item">
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
                     onClick={() => onPlusItemHandler(item.id, item.title,  item.price,  item.imageUrl,  item.type, item.size, item.count)}>
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
    )
}

export default CartItem;