import React from 'react';
import Header from "../components/Header/Header";
/*import emptyCart from "./../../src/assets/img/empty-cart.png"*/
import {Link} from "react-router-dom";
import trash from "./../assets/img/trash.svg";
import cart from "./../assets/img/cart.svg";
import plus from "./../assets/img/plus.svg";
import minus from "./../assets/img/minus.svg";
import './../scss/app.scss';


const Cart = () => {
    return (
        <div>
            <Header/>
            <div className="wrapper">


                <div className="content">
                    <div className="container container--cart">
                        <div className="cart">
                            <div className="cart__top">
                                <h2 className="content__title">
                                    <svg
                                        width="18"
                                        height="18"
                                        viewBox="0 0 18 18"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <path
                                            d="M6.33333 16.3333C7.06971 16.3333 7.66667 15.7364 7.66667 15C7.66667 14.2636 7.06971 13.6667 6.33333 13.6667C5.59695 13.6667 5 14.2636 5 15C5 15.7364 5.59695 16.3333 6.33333 16.3333Z"
                                            stroke="white"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M14.3333 16.3333C15.0697 16.3333 15.6667 15.7364 15.6667 15C15.6667 14.2636 15.0697 13.6667 14.3333 13.6667C13.597 13.6667 13 14.2636 13 15C13 15.7364 13.597 16.3333 14.3333 16.3333Z"
                                            stroke="white"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M4.78002 4.99999H16.3334L15.2134 10.5933C15.1524 10.9003 14.9854 11.176 14.7417 11.3722C14.4979 11.5684 14.1929 11.6727 13.88 11.6667H6.83335C6.50781 11.6694 6.1925 11.553 5.94689 11.3393C5.70128 11.1256 5.54233 10.8295 5.50002 10.5067L4.48669 2.82666C4.44466 2.50615 4.28764 2.21182 4.04482 1.99844C3.80201 1.78505 3.48994 1.66715 3.16669 1.66666H1.66669"
                                            stroke="white"
                                            strokeWidth="1.8"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                    <img src={cart} alt={"cart"}/> Корзина
                                </h2>
                                <div className="cart__clear">
                                    <img src={trash} alt={"trash"}/>
                                    <span>Очистить корзину</span>
                                </div>
                            </div>

                            <div className="cart__item">
                                <div className="cart__item-img">
                                    <img
                                        className="pizza-block__image"
                                        src="https://dodopizza-a.akamaihd.net/static/Img/Products/Pizza/ru-RU/b750f576-4a83-48e6-a283-5a8efb68c35d.jpg"
                                        alt="Pizza"
                                    />
                                </div>
                                <div className="cart__item-info">
                                    <h3>Сырный цыпленок</h3>
                                    <p>тонкое тесто, 26 см.</p>
                                </div>
                                <div className="cart__item-count">
                                    <div className="button button--outline button--circle cart__item-count-minus">
                                        <img src={minus} alt={"minus"}/>
                                    </div>
                                    <b>2</b>
                                    <div className="button button--outline button--circle cart__item-count-plus">
                                        <img src={plus} alt={"plus"}/>
                                    </div>
                                </div>
                                <div className="cart__item-price">
                                    <b>770 ₽</b>
                                </div>
                                <div className="cart__item-remove">
                                    <div className="button button--outline button--circle">
                                        <img src={plus} alt={"del"}/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="cart__bottom">
                            <div className="cart__bottom-details">
                                <span> Всего пицц: <b>3 шт.</b> </span>
                                <span> Сумма заказа: <b>900 ₽</b> </span>
                            </div>
                            <div className="cart__bottom-buttons">
                                <Link to="/" className="button button--outline button--add go-back-btn">
                                    <span>  Вернуться назад</span>
                                </Link>
                                <div className="button pay-btn">
                                    <span>Оплатить сейчас</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* <img src={emptyCart} alt={"emptyCart"}/>*/}
        </div>
    )
}

export default Cart;