import React from 'react';
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import Skeleton from "../components/ItemBlock/Skeleton";
import ItemBlock from "../components/ItemBlock/ItemBlock";
import Pagination from "../components/Pagination/Pagination";
import {changeCategory, changePage, changeSort, setFilters} from "../redux/slices/filterSlice";
import {getItems, selectItems} from "../redux/slices/appSlice";
import {useAppDispatch, useAppSelector} from "../hooks/reduxHooks";
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import qs from 'qs';

const Home: React.FC = () => {
    const location = useLocation()
    const dispatch = useAppDispatch()
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const isMounted = React.useRef(false)
    const isSearch = React.useRef(false)

    const categoryId = useAppSelector(state => state.filter.categoryId)
    const sortId = useAppSelector(state => state.filter.sortId)
    const searchValue = useAppSelector(state => state.filter.searchValue)
    const isFetching = useAppSelector(state => state.app.isFetching)
    const items = useAppSelector(selectItems)
    const page = useAppSelector(state => state.filter.page)

    const sort = sortId < 2 ? "rating" : sortId < 4 ? "price" : "title"
    const category = categoryId !== 0 ? `${categoryId}` : ""
    const order = sortId === 0 || sortId === 2 || sortId === 4 ? "asc" : "desc"

    React.useEffect(() => {
        if (!isSearch.current) {
            dispatch(getItems({sort, category, order, page}))
            //dispatch(setItems(items))
        }
        window.scrollTo(0, 0)
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
                    {isFetching === "loading"
                        ? <div className="content__items">
                            {[...new Array(9)].map((_, i) => <Skeleton key={i}/>)}
                        </div>
                        : isFetching === "success"
                            ? <div className="content__items">
                                {items.filter((i) => i.title.toLowerCase().includes(searchValue.toLowerCase()))
                                    .map((item, i) => <ItemBlock key={i} {...item}/>)}
                            </div>
                            : <div className={"content__error-info"}>
                                <h2>Возникла непредвиденная ошибка!</h2>
                                <p>Попробуйте повторить попытку позже.</p>
                            </div>
                    }
                    {<Pagination/>}
                </div>
            </div>
        </div>
    )
}
export default Home;