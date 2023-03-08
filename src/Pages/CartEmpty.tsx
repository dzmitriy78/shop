import React from 'react';
import emptyCart from "./../../src/assets/img/empty-cart.png"
import {Link} from "react-router-dom";

const CartEmpty: React.FC = () => {
    return (
        <div className="wrapper">
            <div className="content">
                <div className="container container--cart">
                    <div className="cart cart--empty">
                        <h2>Корзина пуста <i className='icon'></i></h2>
                        <p>
                            Вероятнее всего, вы еще ничего не выбрали.<br/>
                            Чтобы продолжить покупки, перейдите на главную страницу.
                        </p>
                        <img src={emptyCart} alt="Empty cart"/>
                        <Link to="/" className="button button--black">
                            <span>Вернуться к покупкам</span>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CartEmpty;