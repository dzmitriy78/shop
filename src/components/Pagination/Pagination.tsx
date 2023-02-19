import React from 'react';
import {Paginator, PaginatorPageChangeEvent} from "primereact/paginator";

const Pagination: React.FC<PaginationPropsType> = ({totalItem, setPage}) => {

    const [first, setFirst] = React.useState<number>(1)
    const [rows, setRows] = React.useState<number>(8)

    const onPageChange = (event: PaginatorPageChangeEvent) => {
        setFirst(event.first)
        setRows(event.rows)
        setPage(event.page + 1)
    }

    return (
        <div className="card">
            <Paginator first={first} alwaysShow={false} rows={rows} totalRecords={totalItem}
                       onPageChange={onPageChange}/>
        </div>
    )
}

export default Pagination

type PaginationPropsType = {
    setPage: (p: number) => void
    totalItem: number
}