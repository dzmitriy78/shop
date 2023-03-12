import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        totalPrice: 0,
        items: []
    } as InitialStateType,
    reducers: {
        addItem: (state, action: PayloadAction<CartItemType>) => {
            const findItem = state.items.find(obj => {
                return ((obj.id === action.payload.id) &&
                    (obj.size === action.payload.size) &&
                    (obj.type === action.payload.type))
            });
            findItem ? findItem.count++ : state.items.push({...action.payload, count: 1})
            state.totalPrice = state.items.reduce((sum, obj) => {
                return obj.price * obj.count + sum;
            }, 0);
        },
        minusItem: (state, action: PayloadAction<{ id: string, size: number, type: string }>) => {
            const findItem = state.items.find(obj => {
                return ((obj.id === action.payload.id) &&
                    (obj.size === action.payload.size) &&
                    (obj.type === action.payload.type))
            });
            findItem && findItem.count--;
            if (findItem)
                state.totalPrice -= findItem.price;
        },
        removeItem: (state, action: PayloadAction<{ id: string, size: number, type: string }>) => {
            const findItem = state.items.find(obj => {
                return ((obj.id === action.payload.id) &&
                    (obj.size === action.payload.size) &&
                    (obj.type === action.payload.type))
            })
            if (findItem)
                state.totalPrice -= findItem.price * findItem.count
            state.items = state.items.filter(obj => {
                return ((obj.id !== action.payload.id) ||
                    (obj.size !== action.payload.size) ||
                    (obj.type !== action.payload.type))
            })
        },
        clearCart: (state) => {
            state.items = []
            state.totalPrice = 0
        }
    }
})

export const {addItem, removeItem, clearCart, minusItem} = cartSlice.actions

export const selectCartItems = (state: RootState) => state.cart.items
export const selectTotalPrice = (state: RootState) => state.cart.totalPrice

export default cartSlice.reducer

type InitialStateType = {
    totalPrice: number,
    items: CartItemType[]
}
export type CartItemType = {
    id: string
    title: string
    price: number
    imageUrl: string
    type: string
    size: number
    count: number
}