import React from 'react';
import './scss/app.scss';
import Header from "./components/Header/Header";
import Categories from "./components/Categories/Categories";
import Sort from "./components/Sort/Sort";
import ItemBlock, {ItemType} from "./components/ItemBlock/ItemBlock";
import axios from "axios";
import Skeleton from "./components/ItemBlock/Skeleton";

const App: React.FC = () => {

    const [items, setItems] = React.useState<ItemType[]>([])
    const [isFetching, setIsFetching] = React.useState(false)

    React.useEffect(() => {
        setIsFetching(true)
        axios.get<ItemType[]>("https://63ea74ede0ac9368d6525c20.mockapi.io/shop-items")
            .then(res => res.data)
            .then(data => {
                setItems(data)
                setIsFetching(false)
            })
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
                        {isFetching
                            ? <div className="content__items">
                                {[...new Array(9)].map((_, i) => <Skeleton key={i}/>)}
                            </div>
                            : <div className="content__items">
                                {items.map((item, i) => <ItemBlock key={i} {...item}/>)}
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;
