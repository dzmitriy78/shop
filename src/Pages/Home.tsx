import React from 'react';
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import Skeleton from "../components/ItemBlock/Skeleton";
import ItemBlock, {ItemType} from "../components/ItemBlock/ItemBlock";
import axios from "axios";
import Pagination from "../components/Pagination/Pagination";
import {changeCategory, changePage, changeSort, setFilters} from "../redux/slices/filterSlice";
import {changeItems, fetching} from "../redux/slices/appSlice";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import qs from 'qs';

const Home: React.FC = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const isMounted = React.useRef(false)
    const isSearch = React.useRef(false)
    const categoryId = useAppSelector(state => state.filter.categoryId)
    const sortId = useAppSelector(state => state.filter.sortId)
    const searchValue = useAppSelector(state => state.filter.searchValue)
    const isFetching = useAppSelector(state => state.app.isFetching)
    const items = useAppSelector(state => state.app.items)
    const page = useAppSelector(state => state.filter.page)

    const sort = sortId < 2 ? "rating" : sortId < 4 ? "price" : "title"
    const category = categoryId !== 0 ? `${categoryId}` : ""
    const order = sortId === 0 || sortId === 2 || sortId === 4 ? "asc" : "desc"


    const fetchItems = () => {
        dispatch(fetching(true))

        //const search = searchValue? `search=${searchValue}` : ""

        axios.get<ItemType[]>(`https://63ea74ede0ac9368d6525c20.mockapi.io/shop-items?sortBy=${sort}&category=${category}&order=${order}&page=${page}&limit=8 `)
            .then(res => res.data)
            .then(data => {
                dispatch(changeItems(data))
                //dispatch(changeTotalItem(items.length))
                dispatch(fetching(false))
            })
    }

    React.useEffect(() => {
        window.scrollTo(0, 0)
        if (!isSearch.current) {
            fetchItems()
        }
        isSearch.current = false
    }, [category, sort, page, order])

    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortBy: sort,
                category,
                order,
                page
            }, {addQueryPrefix: true})
            navigate(`${queryString}`)
        }
        isMounted.current = true
    }, [category, sort, page, order, navigate])

    React.useEffect(() => {
        let sortValue = null as unknown as number;
        if (location.search) {
            const sort = searchParams.get("sortBy")
            const category = Number(searchParams.get("category"))
            const page = Number(searchParams.get("page"))
            const order = searchParams.get("order")


            if (sort === "title") {
                if (order === "asc") {
                    sortValue = 4
                }
                sortValue = 5
            } else if (sort === "price") {
                if (order === "asc") {
                    sortValue = 2
                }
                sortValue = 3
            } else if (sort === "rating") {
                if (order === "asc") {
                    sortValue = 0
                }
                sortValue = 1
            }
            //? 4 : sort === "price" ? 2 : 0
            dispatch(setFilters({sortId: sortValue, categoryId: category, page}))
            console.log(sort, sortValue, sortId, category, page, order)
            isSearch.current = true

        }
    }, [])


    const onChangeCategory = (id: number) => {
        dispatch(changeCategory(id))
        dispatch(changePage(1))
    }
    const onChangeSort = (id: number) => {
        dispatch(changeSort(id))
        dispatch(changePage(1))
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
                    {<Pagination/>}
                </div>
            </div>
        </div>
    )
}

export default Home;