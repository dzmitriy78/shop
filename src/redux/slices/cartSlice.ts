import {createSlice, PayloadAction} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {

    } as initialStateType,
    reducers: {
        changeCart: (state, action: PayloadAction<any>) => {

        }
    }
})

export const {changeCart} = cartSlice.actions


export default cartSlice.reducer

type initialStateType = {

}