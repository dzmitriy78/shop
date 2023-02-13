import React from 'react';
import './scss/app.scss';
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Sort from "./components/Sort/Sort";
import ItemBlock, {ItemType} from "./components/ItemBlock/ItemBlock";

const App: React.FC = () => {

    const [items, setItems] = React.useState<ItemType[]>([])

    React.useEffect(() => {
        fetch("https://63ea74ede0ac9368d6525c20.mockapi.io/shop-items")
            .then(value => value.json())
            .then(res => setItems(res))
    }, [])
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
                            {items.map((item, i) => {
                                return <ItemBlock key={i} {...item}/>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
