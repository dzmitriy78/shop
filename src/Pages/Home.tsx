import React from 'react';
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import Skeleton from "../components/ItemBlock/Skeleton";
import ItemBlock, {ItemType} from "../components/ItemBlock/ItemBlock";
import axios from "axios";

const Home: React.FC = () => {

    const [items, setItems] = React.useState<ItemType[]>([])
    const [isFetching, setIsFetching] = React.useState(false)
    const [categoryId, setCategoryId] = React.useState(0)
    const [sortId, setSortId] = React.useState(0)

    React.useEffect(() => {
        setIsFetching(true)
        const sort = sortId < 2 ? "rating" : sortId < 4 ? "price" : "title"
        const category = categoryId !== 0 ? `${categoryId}` : ""
        const order = sortId === 0 || sortId === 2 || sortId === 4 ? "asc" : "desc"

        axios.get<ItemType[]>(`https://63ea74ede0ac9368d6525c20.mockapi.io/shop-items?sortBy=${sort}&category=${category}&order=${order} `)
            .then(res => res.data)
            .then(data => {
                setItems(data)
                setIsFetching(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortId])

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories id={categoryId}
                                    onClickCategory={(id: number) => setCategoryId(id)}/>
                        <Sort id={sortId}
                              onClickSort={(id: number) => setSortId(id)}/>
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
    );
};

export default Home;