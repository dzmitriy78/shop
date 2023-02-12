import React from 'react';
import './scss/app.scss';
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Sort from "./components/Sort/Sort";
import ItemBlock from "./components/ItemBlock/ItemBlock";
import items from "./assets/items.json"

function App() {
    return (
        <div className="App">
            <div className="wrapper">
                <Header/>
                <div className="content">
                    <div className="container">
                        <div className="content__top">
                            <Categories/>
                            <Sort/>
                        </div>
                        <h2 className="content__title">Все чайники</h2>
                        <div className="content__items">
                            {items.map((p, i) => {
                                return <ItemBlock key={i} {...p}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
