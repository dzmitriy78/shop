import React from 'react';
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import Skeleton from "../components/ItemBlock/Skeleton";
import ItemBlock, {ItemType} from "../components/ItemBlock/ItemBlock";
import axios from "axios";
import { Paginator, PaginatorPageChangeEvent } from 'primereact/paginator';

const Home: React.FC = () => {

    const [items, setItems] = React.useState<ItemType[]>([])
    const [isFetching, setIsFetching] = React.useState(false)
    const [categoryId, setCategoryId] = React.useState(0)
    const [sortId, setSortId] = React.useState(0)
    const [searchValue, setSearchValue] = React.useState("")

    const [first, setFirst] = React.useState(0);
    const [rows, setRows] = React.useState(1);

    const onPageChange = (event: PaginatorPageChangeEvent ) => {
        setFirst(event.first);
        setRows(event.rows);
    };


    React.useEffect(() => {
        setIsFetching(true)
        const sort = sortId < 2 ? "rating" : sortId < 4 ? "price" : "title"
        const category = categoryId !== 0 ? `${categoryId}` : ""
        const order = sortId === 0 || sortId === 2 || sortId === 4 ? "asc" : "desc"
        //const search = searchValue? `search=${searchValue}` : ""

        axios.get<ItemType[]>(`https://63ea74ede0ac9368d6525c20.mockapi.io/shop-items?&sortBy=${sort}&category=${category}&order=${order}&page=${first}&limit=${6} `)
            .then(res => res.data)
            .then(data => {
                setItems(data)
                setIsFetching(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortId, searchValue, first])

    return (
        <div className="wrapper">
            <Header changeSearch={(value: string) => setSearchValue(value)}/>
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
                            {items.filter((i) => i.title.toLowerCase().includes(searchValue.toLowerCase()))
                                .map((item, i) => <ItemBlock key={i} {...item}/>)}
                        </div>
                    }
                    <div className="card">
                        <Paginator first={first} rows={rows} totalRecords={10} onPageChange={onPageChange}/>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;