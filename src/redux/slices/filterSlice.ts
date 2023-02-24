import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const filterSlice = createSlice({
    name: "filter",
    initialState: {
        categoryId: 0,
        sortId: 0,
        searchValue: ""
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
        }
    }
})

export const {changeCategory, changeSort, changeSearch} = filterSlice.actions


export default filterSlice.reducer

type initialStateType = {
    categoryId: number
    sortId: number
    searchValue: string
}