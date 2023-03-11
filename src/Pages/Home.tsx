import React from 'react';
import Header from "../components/Header/Header";
import Categories from "../components/Categories/Categories";
import Sort from "../components/Sort/Sort";
import Skeleton from "../components/ItemBlock/Skeleton";
import ItemBlock from "../components/ItemBlock/ItemBlock";
import Pagination from "../components/Pagination/Pagination";
import {changeCategory, changeSort, setFilters} from "../redux/slices/filterSlice";
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

    const categoryId = useAppSelector(state => state.filter.categoryId)
    const sortId = useAppSelector(state => state.filter.sortId)
    const searchValue = useAppSelector(state => state.filter.searchValue)
    const isFetching = useAppSelector(state => state.app.isFetching)
    const items = useAppSelector(selectItems)
    const page = useAppSelector(state => state.filter.page)

    const sort = sortId < 2 ? "rating" : sortId < 4 ? "price" : "title"
    const category = categoryId !== 0 ? `${categoryId}` : ""
    const order = sortId === 0 || sortId === 2 || sortId === 4 ? "asc" : "desc"

    const fetch = () => {
        dispatch(getItems({sort, category, order, page}))
        window.scrollTo(0, 0)
    }

    React.useEffect(() => {
        if (location.search) {
            let sortValue = null as unknown as number;
            const sort = searchParams.get("sortBy")
            const category = Number(searchParams.get("category"))
            const page = Number(searchParams.get("page"))
            const order = searchParams.get("order")

            if (sort === "title") {
                sortValue = order === "asc" ? 4 : 5
            } else if (sort === "price") {
                sortValue = order === "asc" ? 2 : 3
            } else if (sort === "rating") {
                sortValue = order === "asc" ? 0 : 1
            }
            //? 4 : sort === "price" ? 2 : 0
            dispatch(setFilters({sortId: sortValue, categoryId: category, page}))
        }
    }, [])

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
        fetch()
        isMounted.current = true

    }, [categoryId, sortId, page, order, navigate])
    const onChangeCategory = (id: number) => {
        dispatch(changeCategory(id))
        //dispatch(changePage(1))
    }
    const onChangeSort = (id: number) => {
        dispatch(changeSort(id))
        //dispatch(changePage(1))
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