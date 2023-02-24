import React from 'react';
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import Skeleton from "../components/ItemBlock/Skeleton";
import ItemBlock, {ItemType} from "../components/ItemBlock/ItemBlock";
import axios from "axios";
import Pagination from "../components/Pagination/Pagination";
import {changeCategory, changeSort} from "../redux/slices/filterSlice";
import {changeItems, fetching} from "../redux/slices/appSlice";
import {useAppDispatch, useAppSelector} from "../hooks/hooks";

const Home: React.FC = () => {

    const dispatch = useAppDispatch()
    const categoryId = useAppSelector(state => state.filter.categoryId)
    const sortId = useAppSelector(state => state.filter.sortId)
    const searchValue = useAppSelector(state => state.filter.searchValue)
    const isFetching = useAppSelector(state => state.app.isFetching)
    const items = useAppSelector(state => state.app.items)


    const [page, setPage] = React.useState<number>(1)
    const [totalItem, setTotalItem] = React.useState<number>(20)


    React.useEffect(() => {
        dispatch(fetching(true))
        const sort = sortId < 2 ? "rating" : sortId < 4 ? "price" : "title"
        const category = categoryId !== 0 ? `${categoryId}` : ""
        const order = sortId === 0 || sortId === 2 || sortId === 4 ? "asc" : "desc"
        //const search = searchValue? `search=${searchValue}` : ""

        axios.get<ItemType[]>(`https://63ea74ede0ac9368d6525c20.mockapi.io/shop-items?&sortBy=${sort}&category=${category}&order=${order}&page=${page}&limit=8 `)
            .then(res => res.data)
            .then(data => {
                dispatch(changeItems(data))
                dispatch(fetching(false))
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortId, searchValue, page, dispatch])

    const onChangeCategory = (id: number) => {
        dispatch(changeCategory(id))
        setPage(1)
    }
    const onChangeSort = (id: number) => {
        dispatch(changeSort(id))
        setPage(1)
    }

    return (
        <div className="wrapper">
            <Header/>
            <div className="content">
                <div className="container">
                    <div className="content__top">
                        <Categories id={categoryId}
                                    onClickCategory={onChangeCategory}/>
                        <Sort id={sortId}
                              onClickSort={onChangeSort}/>
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
                    {items.length >= 8 && <Pagination totalItem={totalItem} setPage={setPage}/>}
                </div>
            </div>
        </div>
    )
}

export default Home;