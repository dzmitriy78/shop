import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {ItemType} from "../../components/ItemBlock/ItemBlock";

const appSlice = createSlice({
    name: "App",
    initialState: {
        items: [],
        isFetching: false
    } as initialStateType,
    reducers: {
        changeItems: (state, action: PayloadAction<ItemType[]>) => {
            state.items = action.payload
        },
        fetching: (state, action: PayloadAction<boolean>) => {
            state.isFetching = action.payload
        }
    }
})

export const {changeItems, fetching} = appSlice.actions


export default appSlice.reducer

type initialStateType = {
    items: ItemType[],
    isFetching: boolean
}