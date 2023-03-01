import React from 'react';
import {Paginator, PaginatorPageChangeEvent} from "primereact/paginator";
import {useAppDispatch, useAppSelector} from "../../hooks/reduxHooks";
import {changePage} from "../../redux/slices/filterSlice";

const Pagination: React.FC = () => {

    const dispatch = useAppDispatch()
    const totalItem = useAppSelector(state => state.filter.totalItem)
    const [first, setFirst] = React.useState<number>(1)
    const [rows, setRows] = React.useState<number>(8)

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first)
        setRows(event.rows)
        dispatch(changePage(event.page + 1))
    }

    return (
        <div className="card">
            <Paginator first={first} alwaysShow={false} rows={rows} totalRecords={totalItem}
                       onPageChange={onPageChange}/>
        </div>
    )
}

export default Pagination