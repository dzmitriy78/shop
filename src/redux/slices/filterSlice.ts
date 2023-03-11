import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        categoryId: 0,
        sortId: 1,
        searchValue: "",
        page: 1,
        totalItem: 20,
    } as initialStateType,
    reducers: {
        changeCategory: (state, action: PayloadAction<number>) => {
            state.categoryId = action.payload
        },
        changeSort: (state, action: PayloadAction<number>) => {
            state.sortId = action.payload
        },
        changeSearch: (state, action: PayloadAction<string>) => {
            state.searchValue = action.payload
        },
        changePage: (state, action: PayloadAction<number>) => {
            state.page = action.payload
        },
        changeTotalItem: (state, action: PayloadAction<number>) => {
            state.totalItem = action.payload
        },
        setFilters: (state, action: PayloadAction<{ sortId: number,categoryId: number, page: number}>) => {
            state.sortId = action.payload.sortId
            state.categoryId = action.payload.categoryId
            state.page = action.payload.page
        }
    }
})

export const {changeCategory, changeSort, changeSearch, changePage, changeTotalItem, setFilters} = filterSlice.actions


export default filterSlice.reducer

type initialStateType = {
    categoryId: number
    sortId: number
    searchValue: string
    page: number
    totalItem: number
}